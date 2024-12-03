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
        console.log('Minimint deployed')
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

    describe("safeMint", function () {
        it("Should mint a new token and emit NFTMinted event", async function () {
            const tokenURI = "ipfs://token-metadata-1";
            await expect(miniMint.safeMint(addr1.address, tokenURI))
                .to.emit(miniMint, "NFTMinted")
                .withArgs(addr1.address, 1, tokenURI);

            expect(await miniMint.ownerOf(1)).to.equal(addr1.address);
            expect(await miniMint.tokenURI(1)).to.equal(tokenURI);
        });

        it("Should update the next token ID after minting", async function () {
            const tokenURI = "ipfs://token-metadata-1";
            await miniMint.safeMint(addr1.address, tokenURI);

            expect(await miniMint.getNextTokenId()).to.equal(2);
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
            // expect(mintedTokens.map((t: any) => t.toNumber())).to.deep.equal([1, 2]);

            const tokenIds = mintedTokens.map((t: bigint) => Number(t));
            expect(tokenIds).to.deep.equal([1, 2]);
        });
    });
});

