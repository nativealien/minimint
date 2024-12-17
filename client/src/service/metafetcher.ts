import ERC721 from './blockchain/ERC721';
import factory from './blockchain/factory';
import ipfs from './ipfs';

const initMarketplace = async (web3: any) => {

    const mainColl = await ERC721.getContractMetadataURI(web3.provider)
    const mainMeta = await ipfs.fetchIPFSJSON(mainColl.uri)
    const mainURL = ipfs.makeImgURL(mainMeta.image)
    mainMeta.owner = mainColl.owner;
    mainMeta.image = mainURL;
    mainMeta.type = 'collection'

    const tokenIds = await ERC721.getAllMintedTokens(web3.provider)
    let nftArr: any = [];

    nftArr = await Promise.all(
    tokenIds.map(async (tokenId: any) => {
        const nft = await ERC721.getTokenURI(tokenId, web3.provider);
        const nftMeta = await ipfs.fetchIPFSJSON(nft)
        const newImg = ipfs.makeImgURL(nftMeta.image)
        nftMeta.image = newImg
        nftMeta.type = 'nft'
        return nftMeta; 
    })
    );

    const collMeta = {
        collection: mainMeta,
        nfts: nftArr
    }

    return collMeta
}

export default {
    initMarketplace
}