import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useAppContext } from '../../context/context';
import Grid from '../../components/display/grid/Grid';
import Metadata from '../../components/forms/metadata/Metadata';
import GoBack from '../../components/buttons/GoBack';
import Toggle from '../../components/buttons/Toggle';
import ShortHash from '../../components/buttons/ShortHash';
import Tip from '../../components/display/tip/Tip';
import ERC721 from '../../service/blockchain/ERC721';
import './collection.css'
// wtf

const Collection = () => {
    const { web3, setStatus, reloadItems } = useAppContext()
    const [nftMeta, setNftMeta] = useState<ICids | null>(null)
    const [nfts, setNfts] = useState<any>(null)
    const [toggle, setToggle] = useState<boolean>(true)
    const [own, setOwn] = useState<boolean>(false)
    const [sale, setSale] = useState<boolean>(false)
    const [hover, setHover] = useState<boolean>(true)
    const navigate = useNavigate()
    const location = useLocation()
    const { meta } = location.state || {};
    if(!meta) navigate(-1)

    useEffect(() => {
        console.log(meta)
        let newNfts = meta.nfts;
        if(own) newNfts = newNfts.filter((item: any) => item.owner === web3?.address) 
        if(sale) newNfts = newNfts.filter((item: any) => item.listing.list)
        setNfts(newNfts)
    }, [own, sale])

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
            <div className="info">
                <h2>{meta.name}</h2>
                <ShortHash hash={meta.owner} setHover={setHover} />
                <Tip hover={hover} text={'owner address'} />
                <p className='des'>{meta.description}</p>
            </div>
        </section>
        <nav>
            <div className="coll-btns">
                {toggle ? <button onClick={() => setToggle(!toggle)}>Mint NFT</button> : <button onClick={() => setToggle(!toggle)}>Show NFTs</button>}
                <button>set meta</button>
            </div>
            <div className="coll-toggle">
                <Toggle own={own} sale={sale} setOwn={setOwn} setSale={setSale} />
            </div>
        </nav>
        {toggle ? <Grid items={nfts} /> :
        <Metadata className={'mint-meta'} height='400px' cids={nftMeta} setCids={setNftMeta} />}
        {nftMeta && <button onClick={() => handleMint()}>Mint</button>}
        <GoBack />
    </div>
}

export default Collection