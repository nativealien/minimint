import { ethers } from "hardhat";
import { MiniMintFactory, MiniMintMarketplace } from "../types"; // Update the path if needed

// npx hardhat run scripts/deploy.ts --network localhost


async function main() {
  const name = "MiniMint";
  const symbol = "MM";
  const contractMetadataURI = "ipfs://bafkreihwyznlwgmb3ortnw3th63cowmaguxm6efjyqggdfymqv7b34zt7e";

  // const MiniMintERC721 = await ethers.getContractFactory("MiniMintERC721");
  // const collection = await MiniMintERC721.deploy(name, symbol, contractMetadataURI);
  // await collection.waitForDeployment();
  // console.log(`MiniMintERC721 deployed at: ${await collection.getAddress()}`);

  console.log("Deploying MiniMintFactory...");
  const MiniMintFactoryFactory = await ethers.getContractFactory("MiniMintFactory");
  const factory = (await MiniMintFactoryFactory.deploy()) as MiniMintFactory;
  await factory.waitForDeployment();
  console.log(`MiniMintFactory deployed at: ${await factory.getAddress()}`);

  console.log("Deploying first MiniMintERC721 collection using the factory...");
  const tx = await factory.deployCollection(name, symbol, contractMetadataURI);
  const receipt: any = await tx.wait();
  // console.log('RECEIPT', await receipt.logs)

  const collectionDeployedEvent = receipt.logs.find((log: any) => {
    return log.fragment && log.fragment.name === "CollectionDeployed";
  });

  if (!collectionDeployedEvent) {
    throw new Error("CollectionDeployed event not found.");
  }

  const collectionAddress = collectionDeployedEvent.args[1];

  if (!collectionAddress) {
    throw new Error("Failed to retrieve collection address from event.");
  }

  console.log(`First MiniMintERC721 collection deployed at: ${collectionAddress}`);

  console.log("Deploying MiniMintMarketplace...");
  const MiniMintMarketplaceFactory = await ethers.getContractFactory("MiniMintMarketplace");
  const marketplace = (await MiniMintMarketplaceFactory.deploy(await factory.getAddress(), collectionAddress)) as MiniMintMarketplace;
  await marketplace.waitForDeployment();
  console.log(`MiniMintMarketplace deployed at: ${await marketplace.getAddress()}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
