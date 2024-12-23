import { ethers } from "ethers"
// import MiniMintABI from "./abi/MiniMintERC721.json"
import MiniMintABI from "../../../../hardhat/artifacts/contracts/MiniMintERC721.sol/MiniMintERC721.json"
import { delay } from "../../utils/utils"

// const address = '0x5fbdb2315678afecb367f032d93f642f64180aa3'
// const mainAddress = import.meta.env.VITE_MINIMINT_MAIN_CONTRACT
const marketAddress = import.meta.env.VITE_MINIMINT_MARKET_CONTRACT


export const minimintContract = async (signerOrProvider: ethers.Signer | ethers.Provider, address: string) => {
    await delay(1000)
    return new ethers.Contract(address, MiniMintABI.abi, signerOrProvider);
}

const setContractMetadataURI = async (uri: string, signer: any, address: string) => {
    const contract = await minimintContract(signer, address)
    const tx = await contract.setContractURI(uri);
    console.log("Setting contract metadata URI transaction sent:", tx.hash);
    const receipt = await tx.wait();
    console.log("Transaction confirmed:", receipt);
    return receipt

};

const getContractMetadataURI = async (signer: any, address: string) => {
    const contract = await minimintContract(signer, address)
    const owner = await contract.owner()
    await delay(1000)
    const uri = await contract.contractURI();
    // console.log("Contract Metadata URI:", uri);
    const res = { uri, owner}
    return res;
};

const mintNFT = async (to: string, uri: string, signer: any, address: string) => {
    const contract = await minimintContract(signer, address)
    const tx = await contract.safeMint(to, uri);
    console.log("Minting transaction sent:", tx.hash);
    const receipt = await tx.wait();
    console.log("Transaction confirmed:", receipt);
    return receipt;

};

const getNextTokenId = async (signer: any, address: string) => {
    const contract = await minimintContract(signer, address)
    const nextTokenId = await contract.getNextTokenId();
    console.log("Next Token ID:", nextTokenId.toString());
    return nextTokenId.toString();
};

const getAllMintedTokens = async (signer: any, address: string) => {
    const contract = await minimintContract(signer, address)
    const tokenIds: number[] = await contract.getAllMintedTokens();
    return tokenIds.map(id => id.toString());
};


const getTokenURI = async (tokenId: number, signer: any, address: string) => {
    const contract = await minimintContract(signer, address)
    const uri = await contract.tokenURI(tokenId);
    const owner = await contract.ownerOf(tokenId)
    return {uri: uri, owner: owner};
};

const changeMarketplaceAddress = async (signer: ethers.Signer, address: string) => {
    const contract = await minimintContract(signer, address)
    const res = await contract.setMarketplaceAddress(marketAddress);
    console.log('Succes changing address', res)

}

const approveMarketplace = async (signer: ethers.Signer, address: string) => {
    const contract = await minimintContract(signer, address)
    try {
        const tx = await contract.setApprovalForAll(marketAddress, true);
        await tx.wait();
        console.log("Marketplace approved successfully!", tx);
    } catch (error) {
        console.log('ERROR', error)
    }
};

export default {
    setContractMetadataURI,
    getContractMetadataURI,
    mintNFT,
    getNextTokenId,
    getTokenURI,
    getAllMintedTokens,
    approveMarketplace,
    changeMarketplaceAddress
}