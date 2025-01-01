import { ethers } from "hardhat";
import { MiniMintFactory, MiniMintMarketplace } from "../types";

// npx hardhat run scripts/deploy.ts --network sepolia
// npx hardhat run scripts/deploy.ts --network localhost

async function main() {

  const [deployer] = await ethers.getSigners();

  const name = "MiniMint";
  const symbol = "MM";
  const contractMetadataURI = "ipfs://bafkreiccawontwktqofbmxsmwpwtrebw6g3p6fykwrecpi3oogjsrmvwq4";

  console.log("Deploying MiniMintFactory...");
  const MiniMintFactoryFactory = await ethers.getContractFactory("MiniMintFactory");
  const factory = (await MiniMintFactoryFactory.deploy()) as MiniMintFactory;
  await factory.waitForDeployment();
  const factoryAddress = await factory.getAddress();
  console.log(`MiniMintFactory deployed at: ${factoryAddress}`);

  console.log("Deploying first MiniMintERC721 collection using the factory...");
  const tx = await factory.deployCollection(
    name,
    symbol,
    contractMetadataURI,
    deployer.address 
  );
  const receipt = await tx.wait();

  const collectionDeployedEvent: any = receipt?.logs.find((log: any) => {
    return log.fragment && log.fragment.name === "CollectionDeployed";
  });

  if (!collectionDeployedEvent) {
    throw new Error("CollectionDeployed event not found.");
  }

  console.log(collectionDeployedEvent)

  const collectionAddress = collectionDeployedEvent.args.collectionAddress;
  console.log(`First MiniMintERC721 collection deployed at: ${collectionAddress}`);

  console.log("Deploying MiniMintMarketplace...");
  const MiniMintMarketplaceFactory = await ethers.getContractFactory("MiniMintMarketplace");
  const marketplace = (await MiniMintMarketplaceFactory.deploy(factoryAddress, collectionAddress)) as MiniMintMarketplace;
  await marketplace.waitForDeployment();
  const marketplaceAddress = await marketplace.getAddress();
  console.log(`MiniMintMarketplace deployed at: ${marketplaceAddress}`);

  console.log("Updating marketplace address in the first collection...");
  const collectionContract = await ethers.getContractAt("MiniMintERC721", collectionAddress);
  await collectionContract.setMarketplaceAddress(marketplaceAddress);
  console.log("Marketplace address updated.");


}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

