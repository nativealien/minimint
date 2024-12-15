import { expect } from "chai";
import { ethers } from "hardhat";

describe("MiniMintMarketplace", function () {
  let factory: any, collection: any, marketplace: any;
  let owner: any, addr1: any;

  const contractName = "MiniMint";
  const contractSymbol = "MTK";
  const contractMetadataURI = "ipfs://collection-metadata";
  const URIS = [
    "ipfs://token-metadata-1",
    "ipfs://token-metadata-2",
    "ipfs://token-metadata-3",
    "ipfs://token-metadata-4"
  ];
  const price = ethers.parseEther("1"); 

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
  
    const Factory = await ethers.getContractFactory("MiniMintFactory");
    factory = await Factory.deploy();
    await factory.waitForDeployment();
  
    await factory.deployCollection(contractName, contractSymbol, contractMetadataURI, URIS);
  
    const collections = await factory.getCollections();
    const collectionAddress = collections[0];
    expect(collectionAddress, "Collection address is undefined").to.not.be.undefined;
  
    const Collection = await ethers.getContractFactory("MiniMintERC721");
    collection = Collection.attach(collectionAddress);
  
    const Marketplace = await ethers.getContractFactory("MiniMintMarketplace");
    marketplace = await Marketplace.deploy(factory.target, collectionAddress);
    await marketplace.waitForDeployment();
  
    await collection.setApprovalForAll(marketplace.target, true);
  });

  it("Should allow listing an NFT", async function () {
    await marketplace.listNFT(collection.target, 1, price);

    const listing = await marketplace.getListing(collection.target, 1);
    expect(listing.seller).to.equal(owner.address);
    expect(listing.price).to.equal(price);
  });

  it("Should allow buying a listed NFT", async function () {
    await marketplace.listNFT(collection.target, 1, price);

    await marketplace.connect(addr1).buyNFT(collection.target, 1, { value: price });

    expect(await collection.ownerOf(1)).to.equal(addr1.address);

    const listing = await marketplace.getListing(collection.target, 1);
    expect(listing.price).to.equal(0);
  });

  it("Should allow delisting an NFT", async function () {
    await marketplace.listNFT(collection.target, 1, price);

    await marketplace.delistNFT(collection.target, 1);

    const listing = await marketplace.getListing(collection.target, 1);
    expect(listing.price).to.equal(0);
  });
});


