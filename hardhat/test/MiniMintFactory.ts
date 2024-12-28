import { ethers } from "hardhat";
import { expect } from "chai";

describe("MiniMintFactory", function () {
  let factory: any;
  let owner: any;

  beforeEach(async function () {
    const Factory = await ethers.getContractFactory("MiniMintFactory");
    [owner] = await ethers.getSigners();

    factory = await Factory.deploy();
    await factory.waitForDeployment();
  });

  it("Should deploy the factory contract", async function () {
    expect(await factory.owner()).to.equal(owner.address);
  });

  it("Should deploy a collection", async function () {
    const name = "MyCollection";
    const symbol = "MYC";
    const metadataURI = "example-uri";
    const marketplaceAddress = owner.address;

    const tx = await factory.deployCollection(name, symbol, metadataURI, marketplaceAddress);
    const receipt = await tx.wait();

    const collectionAddress = receipt.events?.find((e: any) => e.event === "CollectionDeployed")?.args?.collectionAddress;
    expect(collectionAddress).to.not.equal(ethers.ZeroAddress);
  });
});