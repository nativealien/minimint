import { ethers } from "ethers"
import MiniMintABI from "../../../../hardhat/artifacts/contracts/MiniMintERC721.sol/MiniMintERC721.json"
import { delay } from "../../utils/utils"
import { VITE_MINIMINT_MARKET_CONTRACT } from "../../utils/config"

export const minimintContract = async (signerOrProvider: ethers.Signer | ethers.Provider, address: string) => {
    await delay(1000)
    return new ethers.Contract(address, MiniMintABI.abi, signerOrProvider);
}

const setContractMetadataURI = async (uri: string, signer: any, address: string) => {
    const contract = await minimintContract(signer, address)
    const tx = await contract.setContractURI(uri);
    const receipt = await tx.wait();
    return receipt

};

const getContractMetadataURI = async (signer: any, address: string) => {
    const contract = await minimintContract(signer, address)
    const owner = await contract.owner()
    await delay(1000)
    const uri = await contract.contractURI();
    const res = { uri, owner}
    return res;
};

const mintNFT = async (to: string, uri: string, signer: any, address: string) => {
    const contract = await minimintContract(signer, address)
    const tx = await contract.safeMint(to, uri);
    const receipt = await tx.wait();
    return receipt;

};

const getNextTokenId = async (signer: any, address: string) => {
    const contract = await minimintContract(signer, address)
    const nextTokenId = await contract.getNextTokenId();
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
    const res = await contract.setMarketplaceAddress(VITE_MINIMINT_MARKET_CONTRACT);
}

const approveMarketplace = async (signer: ethers.Signer, address: string) => {
    const contract = await minimintContract(signer, address)
    try {
        const tx = await contract.setApprovalForAll(VITE_MINIMINT_MARKET_CONTRACT, true);
        await tx.wait();
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