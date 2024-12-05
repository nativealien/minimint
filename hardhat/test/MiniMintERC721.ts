import { expect } from "chai";
import { ethers } from "hardhat";

describe("MiniMintERC721", function () {
    let miniMint: any;
    let owner: any, addr1: any, addr2: any;

    const CONTRACT_METADATA_URI = "ipfs://example-metadata-uri";

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();
        const MiniMintERC721 = await ethers.getContractFactory("MiniMintERC721");
        miniMint = await MiniMintERC721.deploy(CONTRACT_METADATA_URI);
    });

    describe("Deployment", function () {
        it("Should deploy with correct contract metadata URI", async function () {
            expect(await miniMint.contractURI()).to.equal(CONTRACT_METADATA_URI);
        });

        it("Should set the deployer as the owner", async function () {
            expect(await miniMint.owner()).to.equal(owner.address);
        });
    });

    describe("setContractURI", function () {
        it("Should allow the owner to update the contract URI", async function () {
            const newURI = "ipfs://new-metadata-uri";
            await miniMint.setContractURI(newURI);

            expect(await miniMint.contractURI()).to.equal(newURI);
        });

        it("Should revert if called by non-owner", async function () {
            const newURI = "ipfs://new-metadata-uri";

            await expect(
                miniMint.connect(addr1).setContractURI(newURI)
            ).to.be.reverted;
        });
    });

    describe("Whitelist Management", function () {
        it("Should allow the owner to whitelist an address", async function () {
            await miniMint.whitelistAddress(addr1.address, true);
            expect(await miniMint.isWhitelisted(addr1.address)).to.be.true;
        });

        it("Should allow the owner to remove an address from the whitelist", async function () {
            await miniMint.whitelistAddress(addr1.address, true);
            expect(await miniMint.isWhitelisted(addr1.address)).to.be.true;

            await miniMint.whitelistAddress(addr1.address, false);
            expect(await miniMint.isWhitelisted(addr1.address)).to.be.false;
        });

        it("Should emit an event when an address is whitelisted", async function () {
            await expect(miniMint.whitelistAddress(addr1.address, true))
                .to.emit(miniMint, "AddressWhitelisted")
                .withArgs(addr1.address, true);

            await expect(miniMint.whitelistAddress(addr1.address, false))
                .to.emit(miniMint, "AddressWhitelisted")
                .withArgs(addr1.address, false);
        });

        it("Should revert if a non-owner tries to whitelist an address", async function () {
            await expect(
                miniMint.connect(addr1).whitelistAddress(addr2.address, true)
            ).to.be.reverted;
        });
    });


    describe("Minting with Whitelist", function () {
        const TOKEN_URI = "ipfs://token-metadata";

        it("Should allow the owner to mint", async function () {
            await miniMint.safeMint(addr1.address, TOKEN_URI);
            expect(await miniMint.ownerOf(1)).to.equal(addr1.address);
            expect(await miniMint.tokenURI(1)).to.equal(TOKEN_URI);
        });

        it("Should allow whitelisted addresses to mint", async function () {
            await miniMint.whitelistAddress(addr1.address, true);
            await miniMint.connect(addr1).safeMint(addr2.address, TOKEN_URI);

            expect(await miniMint.ownerOf(1)).to.equal(addr2.address);
            expect(await miniMint.tokenURI(1)).to.equal(TOKEN_URI);
        });

        it("Should revert if a non-whitelisted address tries to mint", async function () {
            await expect(
                miniMint.connect(addr1).safeMint(addr2.address, TOKEN_URI)
            ).to.be.revertedWithCustomError(miniMint, "NotAuthorized").withArgs(addr1.address);
        });

        it("Should allow the owner to mint even if not explicitly whitelisted", async function () {
            expect(await miniMint.isWhitelisted(owner.address)).to.be.false;

            await miniMint.safeMint(addr1.address, TOKEN_URI);
            expect(await miniMint.ownerOf(1)).to.equal(addr1.address);
        });

        it("Should not allow a removed address to mint", async function () {
            await miniMint.whitelistAddress(addr1.address, true);
            await miniMint.whitelistAddress(addr1.address, false);

            await expect(
                miniMint.connect(addr1).safeMint(addr2.address, TOKEN_URI)
            ).to.be.revertedWithCustomError(miniMint, "NotAuthorized").withArgs(addr1.address);
        });
    });

    describe("burn", function () {
        beforeEach(async function () {
            await miniMint.safeMint(addr1.address, "ipfs://token-metadata-1");
        });

        it("Should allow the token owner to burn their token", async function () {
            await expect(miniMint.connect(addr1).burn(1))
                .to.emit(miniMint, "NFTBurned")
                .withArgs(addr1.address, 1);

            await expect(miniMint.ownerOf(1)).to.be.reverted;
        });

        it("Should revert if a non-owner tries to burn the token", async function () {
            await expect(
                miniMint.connect(addr2).burn(1)
            ).to.be.revertedWithCustomError(miniMint, "NotOwner")
                .withArgs(addr2.address, 1);
        });

        it("Should revert if trying to burn a nonexistent token", async function () {
            await expect(
                miniMint.burn(99)
            ).to.be.reverted;
        });

        it("Should remove the burned token from the _allMintedTokens array", async function () {
            await miniMint.safeMint(addr1.address, "ipfs://token-metadata-2");
            await miniMint.safeMint(addr1.address, "ipfs://token-metadata-3");
            await miniMint.safeMint(addr1.address, "ipfs://token-metadata-4");

            await miniMint.connect(addr1).burn(1);

            const allTokens = await miniMint.getAllMintedTokens();

            const tokenIds = allTokens.map((t: bigint) => Number(t));
            expect(tokenIds).to.deep.equal([2, 3, 4]);
        });
    });

    describe("getNextTokenId", function () {
        it("Should return the next token ID to be minted", async function () {
            expect(await miniMint.getNextTokenId()).to.equal(1);

            await miniMint.safeMint(addr1.address, "ipfs://token-metadata-1");
            expect(await miniMint.getNextTokenId()).to.equal(2);

            await miniMint.safeMint(addr1.address, "ipfs://token-metadata-2");
            expect(await miniMint.getNextTokenId()).to.equal(3);
        });

        it("Should not change the next token ID after burning a token", async function () {
            await miniMint.safeMint(addr1.address, "ipfs://token-metadata-1");
            await miniMint.safeMint(addr1.address, "ipfs://token-metadata-2");

            expect(await miniMint.getNextTokenId()).to.equal(3);

            await miniMint.connect(addr1).burn(1);
            expect(await miniMint.getNextTokenId()).to.equal(3);
        });
    });

    describe("tokenURI", function () {
        beforeEach(async function () {
            await miniMint.safeMint(addr1.address, "ipfs://token-metadata-1");
        });

        it("Should return the correct token URI for an existing token", async function () {
            expect(await miniMint.tokenURI(1)).to.equal("ipfs://token-metadata-1");
        });

        it("Should revert for a nonexistent token", async function () {
            await expect(miniMint.tokenURI(99)).to.be.reverted;
        });
    });

    describe("getAllMintedTokens", function () {
        it("Should return all minted token IDs", async function () {
            await miniMint.safeMint(addr1.address, "ipfs://token-metadata-1");
            await miniMint.safeMint(addr2.address, "ipfs://token-metadata-2");

            const mintedTokens = await miniMint.getAllMintedTokens();
            // console.log(mintedTokens)

            const tokenIds = mintedTokens.map((t: bigint) => Number(t));
            expect(tokenIds).to.deep.equal([1, 2]);
        });
    });

    describe("supportsInterface", function () {
        it("Should return true for ERC721 and ERC721URIStorage interfaces", async function () {
            // ERC721 interface ID: 0x80ac58cd
            expect(await miniMint.supportsInterface("0x80ac58cd")).to.be.true;

            // ERC721Metadata (via URIStorage) interface ID: 0x5b5e139f
            expect(await miniMint.supportsInterface("0x5b5e139f")).to.be.true;
        });

        it("Should return false for unsupported interfaces", async function () {
            // Random unsupported interface ID
            expect(await miniMint.supportsInterface("0xffffffff")).to.be.false;
        });
    });
});


