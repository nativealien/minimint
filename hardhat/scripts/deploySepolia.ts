import { ethers } from "hardhat";

// npx hardhat run scripts/deploySepolia.ts --network sepolia


const main = async () => {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

  const NftURIS = [
    'ipfs://bafkreie7v4ngyzywvw7owz6lcumqi6fd5nwnkbcwirefgjrz632c6ibagu',
    'ipfs://bafkreih46etik777v4ijkcp6t7lj2hiwibugh6u5wubtwhdwhnoifr7wey',
    'ipfs://bafkreifh2z4ju327zpjyqshqvgqvxz2ieyk2e5wlqnmamdu3h54hgihycm',
    'ipfs://bafkreifl6ya6qotonxktkcw5q44nl4db7kuo5sauilvz2fxfmezzfr2cb4'
  ]

  const collName = "MiniMint Main"
  const symbol = "MMM"
  const collectionURI = "ipfs://bafybeiffsqswnufhhbxr3kb3taw5amdz4vgom6zv2mvxo76dgjxuhoco3a"

  // Deploy MiniMintERC721
  const MiniMintERC721 = await ethers.getContractFactory("MiniMintERC721");
  const mainCollection = await MiniMintERC721.deploy(collName, symbol, collectionURI, NftURIS);
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
