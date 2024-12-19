import { ethers } from "ethers";
// import MiniMintMarketplaceABI from "./abi/MiniMintMarketplace.json"
import MiniMintMarketplaceABI from "../../../../hardhat/artifacts/contracts/MiniMintMarketplace.sol/MiniMintMarketplace.json"
import { delay } from "../../utils/utils"

const marketplaceAddress = import.meta.env.VITE_MINIMINT_MARKET_CONTRACT

export const marketplaceContract = async (signerOrProvider: ethers.Signer | ethers.Provider) => {
  await delay(1000)
  return new ethers.Contract(marketplaceAddress, MiniMintMarketplaceABI.abi, signerOrProvider);
}

const listNFT = async (signer: ethers.Signer, collAddress: string, tokenId: number, priceInEth: string, setStatus: (status: string | null) => void) => {
  setStatus('Listing NFT')
  const contract = await marketplaceContract(signer);
  const price = ethers.parseEther(priceInEth);
  try {
    const tx = await contract.listNFT(collAddress, tokenId, price);
    const receipt = await tx.wait();
    console.log(receipt)
    setStatus(null)
  } catch (error) {
    setStatus('ERROR')
  }
}

const buyNFT = async (signer: ethers.Signer, collAddress: string, tokenId: number, priceInEth: number, setStatus: (status: string | null) => void) => {
  setStatus('Buying NFT')
  const contract = await marketplaceContract(signer);
  const priceInWei = ethers.parseEther(`${priceInEth}`);
  try {
    const tx = await contract.buyNFT(collAddress, tokenId, { value: priceInWei});
    const receipt = await tx.wait();
    console.log("NFT bought successfully:", receipt);
    setStatus(null)
  } catch (error) {
    setStatus('ERROR')
  }
}

const delistNFT = async (signer: ethers.Signer, collAddress: string, tokenId: number, setStatus: (status: string | null) => void) => {
  setStatus('Delisting NFT')
  const contract = await marketplaceContract(signer);
  try {
    const tx = await contract.delistNFT(collAddress, tokenId);
    const receipt = await tx.wait();
    console.log("NFT delisted successfully:", receipt);
    setStatus(null)
  } catch (error) {
    setStatus(null)
  }
}

const getListing = async (provider: ethers.Provider, collAddress: string, tokenId: number) => {
  const contract = await marketplaceContract(provider);
  try {
    const listing = await contract.getListing(collAddress, tokenId);
    return listing;
  } catch (error) {
    return 'error'
  }
}

const getMainCollection = async (provider: ethers.Provider) => {
  const contract = await marketplaceContract(provider);
  const mainCollectionAddress = await contract.mainCollection();
  return mainCollectionAddress

};

const isSupportedCollection = async (provider: ethers.Provider, collAddress: string) => {
  const contract = await marketplaceContract(provider);
  const isSupported = await contract.isFactoryDeployedCollection(collAddress);
  return isSupported;
}

export default {
  listNFT,
  buyNFT,
  delistNFT,
  getListing,
  getMainCollection,
  isSupportedCollection
}
