import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useAppContext } from '../../context/context';
import Grid from '../../components/display/grid/Grid';
import Metadata from '../../components/forms/metadata/Metadata';
import GoBack from '../../components/buttons/GoBack';
import ERC721 from '../../service/blockchain/ERC721';
import './collection.css'

const Collection = () => {
    const { web3, setStatus, reloadItems } = useAppContext()
    const [nftMeta, setNftMeta] = useState<ICids | null>(null)
    const [toggle, setToggle] = useState<boolean>(true)
    const navigate = useNavigate()
    const location = useLocation()
    const { meta } = location.state || {};
    if(!meta) navigate(-1)

    const handleMint = async () => {
        if(web3 && web3.address && nftMeta){
            setStatus('Minting NFT on ' + meta.name)
            const res = await ERC721.mintNFT(web3.address, nftMeta?.jsonCid, web3?.signer, meta.address)
            const tokenArr = await ERC721.getAllMintedTokens(web3.signer, meta.address)
            const tokenId = tokenArr[tokenArr.length-1]
            const loaded = await reloadItems(meta.address, meta.name, tokenId)
            console.log(loaded)
            setStatus(null)
        }
    }

    return <div className="collection">
        <section style={{backgroundImage: `url(${meta.image})`}}>
            {/* <img src={meta.image} /> */}
            {/* <div className='wrap' style={{backgroundImage: `url(${meta.image})`}}> */}
                <div className="info">
                    <h2>{meta.name}</h2>
                    <p>{meta.owner}</p>
                    <p className='des'>{meta.description}</p>
                </div>
            {/* </div> */}
            {/* <img src={meta.image} alt="" /> */}
        </section>
        <nav>
            {toggle ? <button onClick={() => setToggle(!toggle)}>Mint NFT</button> : <button onClick={() => setToggle(!toggle)}>Show NFTs</button>}
            <button>set meta</button>
        </nav>
        {toggle ? <Grid items={meta.nfts} /> :
        <Metadata className={'mint-meta'} height='400px' cids={nftMeta} setCids={setNftMeta} />}
        {nftMeta && <button onClick={() => handleMint()}>Mint</button>}
        <GoBack />
    </div>
}

export default Collection