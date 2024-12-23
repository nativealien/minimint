import { ethers } from "ethers";
// import MiniMintFactoryABI from "./abi/MiniMintFactory.json"
import MiniMintFactoryABI from "../../../../hardhat/artifacts/contracts/MiniMintFactory.sol/MiniMintFactory.json"
import { delay } from "../../utils/utils"

const erc721Address = import.meta.env.VITE_MINIMINT_MAIN_CONTRACT
const contractAddress = import.meta.env.VITE_MINIMINT_FACTORY_CONTRACT
const marketplaceAddress = import.meta.env.VITE_MINIMINT_MARKET_CONTRACT

export const checkAddressess = () => {
    console.log(erc721Address)
    console.log(contractAddress)
    console.log(marketplaceAddress)
}

export const factoryContract = (signerOrProvider: ethers.Signer | ethers.Provider) => {
    return new ethers.Contract(contractAddress, MiniMintFactoryABI.abi, signerOrProvider);
}

const getAllCollections = async (provider: ethers.Provider) => {
    await delay(1000)
    const contract = factoryContract(provider);
    console.log(contract)
    const collections = await contract.getCollections();
    return collections;
}

const deployCollection = async (signer: ethers.Signer, name: string, symbol: string, metadataURI: string) => {
    const contract = factoryContract(signer);
    const tx = await contract.deployCollection(name, symbol, metadataURI, marketplaceAddress);
    const receipt = await tx.wait();
    console.log("Collection deployed:", receipt);
    return receipt
}

const transferOwnership = async (signer: ethers.Signer, newOwner: string) => {
    const contract = factoryContract(signer);
    const tx = await contract.transferOwnership(newOwner);
    await tx.wait();
    delay(500)
    console.log("Ownership transferred to:", newOwner);
}

export default {
    getAllCollections,
    deployCollection,
    transferOwnership,
    checkAddressess
}