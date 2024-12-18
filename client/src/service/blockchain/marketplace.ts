import { ethers } from "ethers";
// import MiniMintMarketplaceABI from "./abi/MiniMintMarketplace.json"
import MiniMintMarketplaceABI from "../../../../hardhat/artifacts/contracts/MiniMintMarketplace.sol/MiniMintMarketplace.json"

const marketplaceAddress = import.meta.env.VITE_MINIMINT_MARKET_CONTRACT

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

const buyNFT = async (signer: ethers.Signer, collAddress: string, tokenId: number, priceInWei: number) => {
  const contract = marketplaceContract(signer);
  // const price = ethers.parseEther(priceInEth); // Convert Ether to Wei
  const tx = await contract.buyNFT(collAddress, tokenId, { value: priceInWei});
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

const getMainCollection = async (provider: ethers.Provider) => {
  const contract = marketplaceContract(provider);
  const mainCollectionAddress = await contract.mainCollection();
  console.log("Main Collection Address:", mainCollectionAddress);
  return mainCollectionAddress

};

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
  getMainCollection,
  isSupportedCollection
}
