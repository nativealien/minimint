import { ethers } from "ethers";
import MiniMintFactoryABI from "../../../../hardhat/artifacts/contracts/MiniMintFactory.sol/MiniMintFactory.json"
import {VITE_MINIMINT_FACTORY_CONTRACT, VITE_MINIMINT_MARKET_CONTRACT} from '../../utils/config'
import { delay } from "../../utils/utils"

export const factoryContract = (signerOrProvider: ethers.Signer | ethers.Provider) => {
    return new ethers.Contract(VITE_MINIMINT_FACTORY_CONTRACT, MiniMintFactoryABI.abi, signerOrProvider);
}

const getAllCollections = async (provider: ethers.Provider) => {
    await delay(1000)
    const contract = factoryContract(provider);
    const collections = await contract.getCollections();
    return collections;
}

const deployCollection = async (signer: ethers.Signer, name: string, symbol: string, metadataURI: string) => {
    const contract = factoryContract(signer);
    const tx = await contract.deployCollection(name, symbol, metadataURI, VITE_MINIMINT_MARKET_CONTRACT);
    const receipt = await tx.wait();
    return receipt
}

const transferOwnership = async (signer: ethers.Signer, newOwner: string) => {
    const contract = factoryContract(signer);
    const tx = await contract.transferOwnership(newOwner);
    await tx.wait();
    delay(500)
}

export default {
    getAllCollections,
    deployCollection,
    transferOwnership
}