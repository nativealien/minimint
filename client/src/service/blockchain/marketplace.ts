import { ethers } from "ethers";
import MiniMintMarketplaceABI from "./abi/MiniMintMarketplace.json"

const marketplaceAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

export const marketplaceContract = (signerOrProvider: ethers.Signer | ethers.Provider) => {
  return new ethers.Contract(marketplaceAddress, MiniMintMarketplaceABI.abi, signerOrProvider);
}

const listNFT = async (signer: ethers.Signer, collAddress: string, tokenId: number, priceInEth: string) => {
  const contract = marketplaceContract(signer);
  const price = ethers.parseEther(priceInEth);
  const tx = await contract.listNFT(collAddress, tokenId, price);
  const receipt = await tx.wait();
  console.log("NFT listed successfully:", receipt);
}

const buyNFT = async (signer: ethers.Signer, collAddress: string, tokenId: number, priceInEth: string) => {
  const contract = marketplaceContract(signer);
  const price = ethers.parseEther(priceInEth); // Convert Ether to Wei
  const tx = await contract.buyNFT(collAddress, tokenId, { value: price });
  const receipt = await tx.wait();
  console.log("NFT bought successfully:", receipt);
}

const delistNFT = async (signer: ethers.Signer, collAddress: string, tokenId: number) => {
  const contract = marketplaceContract(signer);
  const tx = await contract.delistNFT(collAddress, tokenId);
  const receipt = await tx.wait();
  console.log("NFT delisted successfully:", receipt);
}

const getListing = async (provider: ethers.Provider, collAddress: string, tokenId: number) => {
  const contract = marketplaceContract(provider);
  const listing = await contract.getListing(collAddress, tokenId);
  console.log("Listing details:", listing);
  return listing;
}

const isSupportedCollection = async (provider: ethers.Provider, collAddress: string) => {
  const contract = marketplaceContract(provider);
  const isSupported = await contract.isFactoryDeployedCollection(collAddress);
  console.log(`Is collection supported: ${isSupported}`);
  return isSupported;
}

export default {
  listNFT,
  buyNFT,
  delistNFT,
  getListing,
  isSupportedCollection
}
