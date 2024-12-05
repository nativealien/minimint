import { expect } from "chai";
import { ethers } from "hardhat";
import { MiniMintFactory, MiniMintERC721 } from "../types";

describe("MiniMintFactory", function () {
  let factory: MiniMintFactory;
  let miniMintERC721: MiniMintERC721;
  let owner: any, addr1: any, addr2: any;

  beforeEach(async () => {
    [owner, addr1, addr2] = await ethers.getSigners();

    const MiniMintERC721 = await ethers.getContractFactory("MiniMintERC721");
    miniMintERC721 = (await MiniMintERC721.deploy("ipfs://metadataURI")) as MiniMintERC721;

    const MiniMintFactory = await ethers.getContractFactory("MiniMintFactory");
    factory = (await MiniMintFactory.deploy()) as MiniMintFactory;
  });

  it("Should set the deployer as the owner", async () => {
    const contractOwner = await factory.owner();
    expect(contractOwner).to.equal(owner.address);
  });

  it("Should allow the owner to whitelist a user", async () => {
    await factory.whitelistUser(addr1.address, true);
    const isWhitelisted = await factory.whitelisted(addr1.address);
    expect(isWhitelisted).to.be.true;
  });

  it("Should emit an event when a user is whitelisted", async () => {
    await expect(factory.whitelistUser(addr1.address, true))
      .to.emit(factory, "UserWhitelisted")
      .withArgs(addr1.address, true);
  });

  it("Should restrict non-owner from whitelisting a user", async () => {
    await expect(factory.connect(addr1).whitelistUser(addr2.address, true)).to.be.revertedWith(
      "Only owner can call this function"
    );
  });

  it("Should allow a whitelisted user to deploy a collection", async () => {
    await factory.whitelistUser(addr1.address, true);

    await factory
      .connect(addr1)
      .deployCollection("TestNFT", "TNFT", "ipfs://testMetadataURI");

    const collections = await factory.getCollections();
    expect(collections.length).to.equal(1);
  });

  it("Should emit an event when a collection is deployed", async () => {
    await factory.whitelistUser(addr1.address, true);
  
    const tx = await factory
      .connect(addr1)
      .deployCollection("TestNFT", "TNFT", "ipfs://testMetadataURI");
  
    const receipt: any = await tx.wait();
  
  
    const eventTopic = ethers.id(
      "CollectionDeployed(address,address,string,string,string)"
    );
  
    const log = receipt.logs.find((log: any) => log.topics[0] === eventTopic);
  
    expect(log, "CollectionDeployed event log not found").to.exist;
  
    const iface = new ethers.Interface([
      "event CollectionDeployed(address indexed owner, address collectionAddress, string name, string symbol, string contractMetadataURI)"
    ]);
    const parsedLog: any = iface.parseLog(log!);
  
    const owner = parsedLog.args.owner;
    const collectionAddress = parsedLog.args.collectionAddress;
    const name = parsedLog.args.name;
    const symbol = parsedLog.args.symbol;
    const metadataURI = parsedLog.args.contractMetadataURI;
  
    expect(owner).to.equal(addr1.address); 
    expect(collectionAddress).to.not.equal(ethers.ZeroAddress); 
    expect(name).to.equal("TestNFT"); 
    expect(symbol).to.equal("TNFT"); 
    expect(metadataURI).to.equal("ipfs://testMetadataURI"); 
  });
  

  it("Should restrict non-whitelisted users from deploying a collection", async () => {
    await expect(
      factory
        .connect(addr1)
        .deployCollection("TestNFT", "TNFT", "ipfs://testMetadataURI")
    ).to.be.revertedWith("Not whitelisted");
  });

  it("Should allow the owner to transfer ownership", async () => {
    await factory.transferOwnership(addr1.address);
    const newOwner = await factory.owner();
    expect(newOwner).to.equal(addr1.address);
  });

  it("Should restrict non-owner from transferring ownership", async () => {
    await expect(factory.connect(addr1).transferOwnership(addr2.address)).to.be.revertedWith(
      "Only owner can call this function"
    );
  });

  it("Should revert if new owner is the zero address", async () => {
    await expect(factory.transferOwnership(ethers.ZeroAddress)).to.be.revertedWith(
        "New owner is the zero address"
    );
  });
});
