import { ethers } from 'ethers';
import ERC721 from './blockchain/ERC721';
import marketplace from './blockchain/marketplace';
import factory from './blockchain/factory';
import ipfs from './ipfs';

const mainAddress = import.meta.env.VITE_MINIMINT_MAIN_CONTRACT

const processNFT = async (web3: IWeb3, tokenId: any, contract: string, name: string, setStatus: (status: string | null) => void): Promise<INFTMeta> => {
    setStatus('Process NFT')
    const nft = await ERC721.getTokenURI(tokenId, web3.provider, contract);
    const listing = await marketplace.getListing(web3.provider, contract, tokenId)
    const priceInEth = ethers.formatUnits(listing[1])
    const nftMeta = await ipfs.fetchIPFSJSON(nft.uri)
    // let newImg;
    // if(nftMeta.image){
    //     newImg = ipfs.makeImgURL(nftMeta.image)
    // } else {
    //     newImg = ipfs.makeImgURL(nftMeta.imageURI)
    //     delete nftMeta.imageURI
    // }
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
    setStatus('Process NFTs')
    const tokenIds = await ERC721.getAllMintedTokens(web3.provider, contract)
    let nftArr: any = [];
    nftArr = await Promise.all(
        tokenIds.map(async (tokenId: any) => {
            const result = await processNFT(web3, tokenId, contract, name, setStatus)
            return result; 
        })
    );
    return nftArr

}

const processCollection = async (web3: IWeb3, contract: string, setStatus: (status: string | null) => void): Promise<ICollMeta> => {
    setStatus('Proccess Collection')
    const mainColl = await ERC721.getContractMetadataURI(web3.provider, contract)
    const mainMeta = await ipfs.fetchIPFSJSON(mainColl.uri)
    // let mainUrl = ''
    // if(mainMeta.image){
    //     mainUrl = ipfs.makeImgURL(mainMeta.image)
    // }else {
    //     mainUrl = ipfs.makeImgURL(mainMeta.imageURI)
    //     delete mainMeta.imageURI
    // }
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
    setStatus('Initializing MiniMint')
    const factoryContracts = await factory.getAllCollections(web3.provider)
    const contractArray = Object.values(factoryContracts)
    // contractArray.push(mainAddress)
    const results = await Promise.all(
        contractArray.map(async (con: any) => {
          const result = await processCollection(web3, con, setStatus);
          return result; 
        })
    );
    return results
}

export default {
    processNFT,
    processNFTs,
    processCollection,
    initMinimint,
}