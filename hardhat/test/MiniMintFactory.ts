import { ethers } from "hardhat";
import { expect } from "chai";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";

describe("MiniMintFactory", function () {
  let factory: any;
  let owner: any, addr1: any, addr2: any;

  const contractName = "MiniMint";
  const contractSymbol = "MTK";
  const contractMetadataURI = "ipfs://collection-metadata";
  const URIS = [
    "ipfs://token-metadata-1",
    "ipfs://token-metadata-2",
    "ipfs://token-metadata-3",
    "ipfs://token-metadata-4"
  ];

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    const Factory = await ethers.getContractFactory("MiniMintFactory");
    factory = await Factory.deploy();
  });

  it("Should allow anyone to deploy a new collection", async function () {
    // addr1 deploys a collection
    await expect(
      factory
        .connect(addr1)
        .deployCollection(contractName, contractSymbol, contractMetadataURI, URIS)
    )
      .to.emit(factory, "CollectionDeployed")
      .withArgs(addr1.address, anyValue, contractName, contractSymbol, contractMetadataURI);
  
    const collections = await factory.getCollections();
    expect(collections.length).to.equal(1);
  });

  it("Should correctly store multiple deployed collections", async function () {
    await factory
      .connect(addr1)
      .deployCollection(contractName, contractSymbol, contractMetadataURI, URIS);

    await factory
      .connect(addr1)
      .deployCollection(contractName, contractSymbol, contractMetadataURI, URIS);

    const collections = await factory.getCollections();
    expect(collections.length).to.equal(2);
  });

  it("Should fail if URIs length is not exactly 4", async function () {
    const invalidUris = ["uri1", "uri2"]; // Less than 4

    await expect(
      factory.deployCollection(contractName, contractSymbol, contractMetadataURI, invalidUris)
    ).to.be.revertedWith("Must provide exactly 4 URIs");
  });

  it("Should allow only owner to transfer ownership of the factory", async function () {
    await expect(factory.connect(addr1).transferOwnership(addr2.address)).to.be.revertedWith(
      "Only owner can call this function"
    );

    await factory.transferOwnership(addr1.address);
    expect(await factory.owner()).to.equal(addr1.address);
  });
});

