import { ethers } from 'ethers';
import ERC721 from './blockchain/ERC721';
import marketplace from './blockchain/marketplace';
// import factory from './blockchain/factory';
import ipfs from './ipfs';

const mainAddress = import.meta.env.VITE_MINIMINT_MAIN_CONTRACT

const processNFTs = async (web3: any, contract: any): Promise<INFTMeta[]> => {
    const tokenIds = await ERC721.getAllMintedTokens(web3.provider, contract)
    let nftArr: any = [];
    nftArr = await Promise.all(
        tokenIds.map(async (tokenId: any) => {
            const nft = await ERC721.getTokenURI(tokenId, web3.provider);
            const listing = await marketplace.getListing(web3.provider, contract, tokenId)
            const priceInEth = ethers.formatUnits(listing[1])
            const nftMeta = await ipfs.fetchIPFSJSON(nft.uri)
            const newImg = ipfs.makeImgURL(nftMeta.image)
            nftMeta.address = contract
            nftMeta.owner = nft.owner
            nftMeta.listing = {list: +priceInEth>0,wei: listing[1], eth: +priceInEth}
            nftMeta.image = newImg
            nftMeta.tokenId = tokenId
            nftMeta.type = 'nft'
            return nftMeta; 
        })
    );
    return nftArr

}

const processCollection = async (web3: any, contract: any): Promise<ICollMeta> => {
    const mainColl = await ERC721.getContractMetadataURI(web3.provider, contract)
    const mainMeta = await ipfs.fetchIPFSJSON(mainColl.uri)
    const mainURL = ipfs.makeImgURL(mainMeta.image)
    mainMeta.address = contract;
    mainMeta.owner = mainColl.owner;
    mainMeta.image = mainURL;
    mainMeta.type = 'collection'
    mainMeta.address = mainAddress

    const nftArr = await processNFTs(web3, contract)

    const collMeta = {
        collection: mainMeta,
        nfts: nftArr
    }

    return collMeta;
}

const initMinimint = async (web3: any, contract: any): Promise<ICollMeta> => {
    const result = await processCollection(web3, contract)
    return result
}


// const initMarketplace = async (web3: any) => {

//     const mainColl = await ERC721.getContractMetadataURI(web3.provider)
//     const mainMeta = await ipfs.fetchIPFSJSON(mainColl.uri)
//     const mainURL = ipfs.makeImgURL(mainMeta.image)
//     mainMeta.owner = mainColl.owner;
//     mainMeta.image = mainURL;
//     mainMeta.type = 'collection'
//     mainMeta.address = mainAddress

//     const tokenIds = await ERC721.getAllMintedTokens(web3.provider, contract)
//     let nftArr: any = [];

//     nftArr = await Promise.all(
//         tokenIds.map(async (tokenId: any) => {
//             const nft = await ERC721.getTokenURI(tokenId, web3.provider);
//             const nftMeta = await ipfs.fetchIPFSJSON(nft.uri)
//             const newImg = ipfs.makeImgURL(nftMeta.image)
//             nftMeta.collection = mainMeta
//             nftMeta.owner = nft.owner
//             nftMeta.image = newImg
//             nftMeta.tokenId = tokenId
//             nftMeta.type = 'nft'
//             return nftMeta; 
//         })
//     );
//     mainMeta.nfts = nftArr

//     const collMeta = {
//         collection: mainMeta,
//         nfts: nftArr
//     }

//     return collMeta
// }

export default {
    processNFTs,
    processCollection,
    initMinimint,
}