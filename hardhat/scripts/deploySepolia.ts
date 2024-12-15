import { ethers } from "hardhat";

const main = async () => {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

  // Deploy MiniMintERC721
  const MiniMintERC721 = await ethers.getContractFactory("MiniMintERC721");
  const mainCollection = await MiniMintERC721.deploy("ipfs://metadata-uri");
  await mainCollection.waitForDeployment();
  console.log("MiniMintERC721 deployed to:", await mainCollection.getAddress());

  // Deploy MiniMintFactory
  const MiniMintFactory = await ethers.getContractFactory("MiniMintFactory");
  const factory = await MiniMintFactory.deploy();
  await factory.waitForDeployment();
  console.log("MiniMintFactory deployed to:", await factory.getAddress());

  // Deploy MiniMintMarketplace
  const MiniMintMarketplace = await ethers.getContractFactory("MiniMintMarketplace");
  const marketplace = await MiniMintMarketplace.deploy(
    await factory.getAddress(),
    await mainCollection.getAddress()
  );
  await marketplace.waitForDeployment();
  console.log("MiniMintMarketplace deployed to:", await marketplace.getAddress());

  console.log("Deployment successful!");
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error deploying contracts:", error);
    process.exit(1);
});
