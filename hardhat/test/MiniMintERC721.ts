import { ethers } from "hardhat";
import { expect } from "chai";
import { MiniMintERC721 } from "../types";

describe("MiniMintERC721", function () {
  let miniMint: MiniMintERC721;
  let owner: any, addr1: any, addr2: any;

  const name = "MiniMint";
  const symbol = "MMT";
  const contractMetadataURI = "ipfs://collection-metadata";
  const URIS = [
    "ipfs://token-metadata-1",
    "ipfs://token-metadata-2",
    "ipfs://token-metadata-3",
    "ipfs://token-metadata-4"
  ];

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    const MiniMintERC721Factory = await ethers.getContractFactory("MiniMintERC721");
    miniMint = (await MiniMintERC721Factory.deploy(
      name,
      symbol,
      contractMetadataURI,
      URIS,
      owner.address
    )) as MiniMintERC721;
  });

  it("Should deploy the contract with correct initial values", async function () {
    expect(await miniMint.name()).to.equal(name);
    expect(await miniMint.symbol()).to.equal(symbol);
    expect(await miniMint.contractURI()).to.equal(contractMetadataURI);
    expect(await miniMint.getNextTokenId()).to.equal(5); // Starts at 1 and mints 4 tokens
  });

  it("Should mint 4 NFTs during deployment", async function () {
    const allTokens = await miniMint.getAllMintedTokens();
    expect(allTokens.map((id: any) => Number(id))).to.deep.equal([1, 2, 3, 4]);

    for (let i = 1; i <= 4; i++) {
      const tokenURI = await miniMint.tokenURI(i);
      expect(tokenURI).to.equal(URIS[i - 1]);
    }
  });

  it("Should allow the owner to mint new NFTs", async function () {
    const newURI = "ipfs://token-metadata-5";
    await miniMint.safeMint(addr1.address, newURI);

    const tokenURI = await miniMint.tokenURI(5);
    expect(tokenURI).to.equal(newURI);
    expect(await miniMint.ownerOf(5)).to.equal(addr1.address);
    expect(await miniMint.getNextTokenId()).to.equal(6);
  });

  it("Should not allow non-owners to mint NFTs", async function () {
    await expect(
      miniMint.connect(addr1).safeMint(addr1.address, "ipfs://token-metadata-5")
    ).to.be.reverted;
  });

  it("Should allow the owner to burn tokens they own", async function () {
    await miniMint.burn(1); 

    const allTokens = await miniMint.getAllMintedTokens();
    expect(allTokens.map((id: any) => Number(id))).to.deep.equal([2, 3, 4]);

    await expect(miniMint.tokenURI(1)).to.be.reverted;
  });

  it("Should not allow non-owners to burn tokens", async function () {
    await expect(miniMint.connect(addr1).burn(1)).to.be.revertedWithCustomError(
      miniMint,
      "NotOwner"
    );
  });

  it("Should allow the owner to update the contract metadata URI", async function () {
    const newContractURI = "ipfs://collection-metadata-new";
    await miniMint.setContractURI(newContractURI);

    expect(await miniMint.contractURI()).to.equal(newContractURI);
  });

  it("Should not allow non-owners to update the contract metadata URI", async function () {
    await expect(
      miniMint.connect(addr1).setContractURI("ipfs://collection-metadata-new")
    ).to.be.reverted;
  });

  it("Should return correct supportsInterface results", async function () {
    expect(await miniMint.supportsInterface("0x01ffc9a7")).to.equal(true); 
    expect(await miniMint.supportsInterface("0x80ac58cd")).to.equal(true); 
    expect(await miniMint.supportsInterface("0x5b5e139f")).to.equal(true); 
  });
});