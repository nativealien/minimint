import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@typechain/hardhat";
import "solidity-coverage";
import dotenv from 'dotenv';

dotenv.config();

const config: HardhatUserConfig = {
  networks: {
    sepolia: {
      url: process.env.INFURA_ENDPOINT, // Infura/Alchemy URL
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [], // Your wallet private key
    },
  },
  solidity: "0.8.27",
  typechain: {
    outDir: "types", 
    target: "ethers-v6",
  },
};

export default config;
