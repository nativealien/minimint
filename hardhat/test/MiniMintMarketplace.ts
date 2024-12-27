import { ethers } from "hardhat";
import { expect } from "chai";

describe("MiniMintMarketplace", function () {
  let marketplace: any;
  let factory: any;
  let collection: any;
  let owner: any, seller: any, buyer: any;

  beforeEach(async function () {
    const Factory = await ethers.getContractFactory("MiniMintFactory");
    const Marketplace = await ethers.getContractFactory("MiniMintMarketplace");
    [owner, seller, buyer] = await ethers.getSigners();

    factory = await Factory.deploy();
    await factory.waitForDeployment();

    await factory.deployCollection("TestCollection", "TST", "example-uri", owner.address);
    const collections = await factory.getCollections();
    collection = await ethers.getContractAt("MiniMintERC721", collections[0]);

    await collection.connect(owner).safeMint(seller.address, "example-uri/1");

    marketplace = await Marketplace.deploy(await factory.getAddress(), await collection.getAddress());
    await marketplace.waitForDeployment();
  });

  it("Should deploy the marketplace with the correct factory and main collection", async function () {
    expect(await marketplace.factory()).to.equal(await factory.getAddress());
    expect(await marketplace.mainCollection()).to.equal(await collection.getAddress());
  });

  it("Should allow listing an NFT", async function () {
    const tokenId = 1;
    const price = ethers.parseEther("1");

    await collection.connect(seller).setApprovalForAll(await marketplace.getAddress(), true);

    await expect(marketplace.connect(seller).listNFT(await collection.getAddress(), tokenId, price))
      .to.emit(marketplace, "NFTListed")
      .withArgs(seller.address, await collection.getAddress(), tokenId, price);

    const listing = await marketplace.getListing(await collection.getAddress(), tokenId);
    expect(listing.seller).to.equal(seller.address);
    expect(listing.price).to.equal(price);
  });

  it("Should allow purchasing an NFT", async function () {
    const tokenId = 1;
    const price = ethers.parseEther("1");

    await collection.connect(seller).setApprovalForAll(await marketplace.getAddress(), true);
    await marketplace.connect(seller).listNFT(await collection.getAddress(), tokenId, price);

    await expect(marketplace.connect(buyer).buyNFT(await collection.getAddress(), tokenId, { value: price }))
      .to.emit(marketplace, "NFTSold")
      .withArgs(buyer.address, await collection.getAddress(), tokenId, price);

    expect(await collection.ownerOf(tokenId)).to.equal(buyer.address);

    const listing = await marketplace.getListing(await collection.getAddress(), tokenId);
    expect(listing.price).to.equal(0);
  });

  it("Should allow delisting an NFT", async function () {
    const tokenId = 1;
    const price = ethers.parseEther("1");

    await collection.connect(seller).setApprovalForAll(await marketplace.getAddress(), true);
    await marketplace.connect(seller).listNFT(await collection.getAddress(), tokenId, price);

    await expect(marketplace.connect(seller).delistNFT(await collection.getAddress(), tokenId))
      .to.emit(marketplace, "NFTDelisted")
      .withArgs(seller.address, await collection.getAddress(), tokenId);

    const listing = await marketplace.getListing(await collection.getAddress(), tokenId);
    expect(listing.price).to.equal(0);
  });
});