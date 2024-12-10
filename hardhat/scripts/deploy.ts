import { ethers } from "ethers";
import MiniMintERC721 from "../artifacts/contracts/MiniMintERC721.sol/MiniMintERC721.json";
import MiniMintFactory from "../artifacts/contracts/MiniMintFactory.sol/MiniMintFactory.json";
import MiniMintMarketplace from "../artifacts/contracts/MiniMintMarketplace.sol/MiniMintMarketplace.json";

const main = async () => {
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
  const deployer = await provider.getSigner(0);

  console.log("Deployer Address:", await deployer.getAddress());

  const MiniMintERC721Factory = new ethers.ContractFactory(
    MiniMintERC721.abi,
    MiniMintERC721.bytecode,
    deployer
  );
  const mainCollection = await MiniMintERC721Factory.deploy("ipfs://metadata-uri");
  await mainCollection.waitForDeployment();
  console.log("MiniMintERC721 deployed to:", await mainCollection.getAddress());

  const MiniMintFactoryFactory = new ethers.ContractFactory(
    MiniMintFactory.abi,
    MiniMintFactory.bytecode,
    deployer
  );
  const factory = await MiniMintFactoryFactory.deploy();
  await factory.waitForDeployment();
  console.log("MiniMintFactory deployed to:", await factory.getAddress());

  const MiniMintMarketplaceFactory = new ethers.ContractFactory(
    MiniMintMarketplace.abi,
    MiniMintMarketplace.bytecode,
    deployer
  );
  const marketplace = await MiniMintMarketplaceFactory.deploy(
    await factory.getAddress(),
    await mainCollection.getAddress()
  );
  await marketplace.waitForDeployment();
  console.log("MiniMintMarketplace deployed to:", await marketplace.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });



