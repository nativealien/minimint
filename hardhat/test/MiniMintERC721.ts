import { ethers } from "hardhat";
import { expect } from "chai";
import { MiniMintERC721 } from "../types";

describe("MiniMintERC721", function () {
  let miniMint: MiniMintERC721;
  let owner: any;
  let addr1: any;
  let addr2: any;

  beforeEach(async function () {
    const MiniMintERC721 = await ethers.getContractFactory("MiniMintERC721");
    [owner, addr1, addr2] = await ethers.getSigners();

  miniMint = (await MiniMintERC721.deploy(
      "MiniMintToken",
      "MMT",
      "example-uri",
      addr1.address
    )) as MiniMintERC721;
    await miniMint.waitForDeployment();
  });

  it("Should deploy the contract with correct parameters", async function () {
    expect(await miniMint.name()).to.equal("MiniMintToken");
    expect(await miniMint.symbol()).to.equal("MMT");
    expect(await miniMint.contractURI()).to.equal("example-uri");
    expect(await miniMint.marketplaceAddress()).to.equal(addr1.address);
  });

  it("Should allow owner to mint an NFT", async function () {
    const tokenURI = "example-uri";
    await expect(miniMint.safeMint(addr1.address, tokenURI))
      .to.emit(miniMint, "NFTMinted")
      .withArgs(addr1.address, 1, tokenURI);

    const ownerOfToken = await miniMint.ownerOf(1);
    expect(ownerOfToken).to.equal(addr1.address);

    const allTokens = await miniMint.getAllMintedTokens();
    const tokenIds = allTokens.map((t: bigint) => Number(t));
    expect(tokenIds).to.include(1);
  });

  it("Should update the contract URI", async function () {
    const newContractURI = "example-uri";
    await miniMint.setContractURI(newContractURI);
    expect(await miniMint.contractURI()).to.equal(newContractURI);
  });

  it("Should automatically approve the marketplace", async function () {
    const isApproved = await miniMint.isApprovedForAll(owner.address, addr1.address);
    expect(isApproved).to.be.true;

    const isNotApproved = await miniMint.isApprovedForAll(owner.address, addr2.address);
    expect(isNotApproved).to.be.false;
  });

  it("Should revert when non-owner tries to update contract URI", async function () {
    const newContractURI = "example-uri";
    await expect(
      miniMint.connect(addr1).setContractURI(newContractURI)
    ).to.be.reverted;
  });
});