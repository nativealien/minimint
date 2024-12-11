import { ethers } from "ethers"
import MiniMintABI from "./abi/MiniMintERC721.json"

const address = '0x5fbdb2315678afecb367f032d93f642f64180aa3'

export const minimintContract = (signerOrProvider: ethers.Signer | ethers.Provider) => {
    return new ethers.Contract(address, MiniMintABI.abi, signerOrProvider);
  }

const setContractMetadataURI = async (uri: string, signer: any) => {
    const contract = minimintContract(signer)
    const tx = await contract.setContractURI(uri);
    console.log("Setting contract metadata URI transaction sent:", tx.hash);
    const receipt = await tx.wait();
    console.log("Transaction confirmed:", receipt);
    return receipt

};

const getContractMetadataURI = async (signer: any) => {
    const contract = minimintContract(signer)
    const uri = await contract.contractURI();
    console.log("Contract Metadata URI:", uri);
    return uri;
};

const mintNFT = async (to: string, uri: string, signer: any) => {
    const contract = minimintContract(signer)
    const tx = await contract.safeMint(to, uri);
    console.log("Minting transaction sent:", tx.hash);
    const receipt = await tx.wait();
    console.log("Transaction confirmed:", receipt);
    return receipt;

};

const getNextTokenId = async (signer: any) => {
    const contract = minimintContract(signer)
    const nextTokenId = await contract.getNextTokenId();
    console.log("Next Token ID:", nextTokenId.toString());
    return nextTokenId.toString();
};

const getAllMintedTokens = async (signer: any) => {
    const contract = minimintContract(signer)
    const tokenIds: number[] = await contract.getAllMintedTokens();
    console.log("All Minted Tokens:", tokenIds.map(id => id.toString()));
    return tokenIds.map(id => id.toString());
};


const getTokenURI = async (tokenId: number, signer: any) => {
    const contract = minimintContract(signer)
    const uri = await contract.tokenURI(tokenId);
    console.log(`Metadata URI for Token ID ${tokenId}:`, uri);
    return uri;
};

export default {
    setContractMetadataURI,
    getContractMetadataURI,
    mintNFT,
    getNextTokenId,
    getTokenURI,
    getAllMintedTokens
}