import { ethers } from 'ethers';
import ERC721 from './blockchain/ERC721';
import marketplace from './blockchain/marketplace';
import factory from './blockchain/factory';
import ipfs from './ipfs';

const processNFT = async (web3: IWeb3, tokenId: any, contract: string, name: string): Promise<INFTMeta> => {
    const nft = await ERC721.getTokenURI(tokenId, web3.provider, contract);
    const listing = await marketplace.getListing(web3.provider, contract, tokenId)
    const priceInEth = ethers.formatUnits(listing[1])
    const nftMeta = await ipfs.fetchIPFSJSON(nft.uri)
    nftMeta.collName = name
    nftMeta.address = contract
    nftMeta.owner = nft.owner
    nftMeta.listing = {list: +priceInEth>0,wei: listing[1], eth: +priceInEth}
    nftMeta.image = ipfs.makeImgURL(nftMeta.imageURI)
    nftMeta.tokenId = tokenId
    nftMeta.type = 'nft'
    return nftMeta;
}

const processNFTs = async (web3: IWeb3, contract: string, name: string, setStatus: (status: string | null) => void): Promise<INFTMeta[]> => {
    setStatus('Process NFTs_')
    const tokenIds = await ERC721.getAllMintedTokens(web3.provider, contract)
    let nftArr: any = [];
    nftArr = await Promise.all(
        tokenIds.map(async (tokenId: any) => {
            const result = await processNFT(web3, tokenId, contract, name)
            return result; 
        })
    );
    return nftArr

}

const processCollection = async (web3: IWeb3, contract: string, setStatus: (status: string | null) => void): Promise<ICollMeta> => {
    setStatus('Proccess Collection')
    const mainColl = await ERC721.getContractMetadataURI(web3.provider, contract)
    const mainMeta = await ipfs.fetchIPFSJSON(mainColl.uri)
    mainMeta.name = mainMeta.name
    mainMeta.address = contract;
    mainMeta.owner = mainColl.owner;
    mainMeta.image = ipfs.makeImgURL(mainMeta.imageURI);
    mainMeta.type = 'collection'

    const nftArr = await processNFTs(web3, contract, mainMeta.name, setStatus)

    mainMeta.nfts = nftArr

    return mainMeta;
}

const initMinimint = async (web3: IWeb3, setStatus: (status: string | null) => void): Promise<ICollMeta[]> => {
    setStatus('Updating MiniMint')
    const factoryContracts = await factory.getAllCollections(web3.provider)
    const contractArray = Object.values(factoryContracts)
    const results = await Promise.all(
        contractArray.map(async (con: any) => {
          const result = await processCollection(web3, con, setStatus);
          return result; 
        })
    );
    setStatus('Minimint updated_')
    return results
}

export default {
    processNFT,
    processNFTs,
    processCollection,
    initMinimint,
}