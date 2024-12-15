import { ethers } from "ethers";
// import MiniMintFactoryABI from "./abi/MiniMintFactory.json"
import MiniMintFactoryABI from "../../../../hardhat/artifacts/contracts/MiniMintFactory.sol/MiniMintFactory.json"

const contractAddress = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512";

export const factoryContract = (signerOrProvider: ethers.Signer | ethers.Provider) => {
    return new ethers.Contract(contractAddress, MiniMintFactoryABI.abi, signerOrProvider);
}

const getAllCollections = async (provider: ethers.Provider) => {
    const contract = factoryContract(provider);
    const collections = await contract.getCollections();
    return collections;
}

const deployCollection = async (signer: ethers.Signer, name: string, symbol: string, metadataURI: string) => {
    const contract = factoryContract(signer);
    const tx = await contract.deployCollection(name, symbol, metadataURI);
    const receipt = await tx.wait();
    console.log("Collection deployed:", receipt);
    return receipt
}

const whitelistUser = async (signer: ethers.Signer, userAddress: string, isWhitelisted: boolean) => {
    console.log('Signer', signer)
    console.log('Address', userAddress)
    console.log('isWhitelist', isWhitelisted)
    const contract = factoryContract(signer);
    console.log('contract', contract)
    const tx = await contract.whitelistUser(userAddress, isWhitelisted);
    const test = await tx.wait();
    console.log(`User ${userAddress} whitelisted: ${isWhitelisted}`);
    return test
}

const isUserWhitelisted = async (provider: ethers.Provider, userAddress: string) => {
    const contract = factoryContract(provider);
    const whitelisted = await contract.whitelisted(userAddress);
    return whitelisted;
}

const transferOwnership = async (signer: ethers.Signer, newOwner: string) => {
    const contract = factoryContract(signer);
    const tx = await contract.transferOwnership(newOwner);
    await tx.wait();
    console.log("Ownership transferred to:", newOwner);
}

export default {
    getAllCollections,
    deployCollection,
    whitelistUser,
    isUserWhitelisted,
    transferOwnership
}