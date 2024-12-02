import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@typechain/hardhat";

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  typechain: {
    outDir: "types", 
    target: "ethers-v6",
  },
};

export default config;
