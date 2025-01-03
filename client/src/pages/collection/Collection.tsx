import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useAppContext } from '../../context/context';

import Grid from '../../components/display/grid/Grid';
import Metadata from '../../components/forms/metadata/Metadata';
import GoBack from '../../components/buttons/goback/GoBack';
import Toggle from '../../components/buttons/toggle/Toggle';
import ShortHash from '../../components/buttons/shorthash/ShortHash';
import Tip from '../../components/display/tip/Tip';

import ERC721 from '../../service/blockchain/ERC721';
import './collection.css'

const Collection = () => {
    const { web3, setStatus, reloadItems } = useAppContext()
    const [nftMeta, setNftMeta] = useState<ICids | null>(null)
    const [nfts, setNfts] = useState<any>(null)
    const [toggle, setToggle] = useState<boolean>(true)
    const [own, setOwn] = useState<boolean>(false)
    const [sale, setSale] = useState<boolean>(false)
    const [hover, setHover] = useState<boolean>(false)
    const navigate = useNavigate()
    const location = useLocation()
    const { meta } = location.state || {};
    if(!meta) navigate(-1)

    useEffect(() => {
        let newNfts = meta.nfts;
        if(own) newNfts = newNfts.filter((item: any) => item.owner === web3?.address) 
        if(sale) newNfts = newNfts.filter((item: any) => item.listing.list)
        setNfts(newNfts)
    }, [own, sale])

    const handleMint = async () => {
        if(web3 && web3.address && nftMeta){
            setStatus('Minting NFT on ' + meta.name)
            console.log(nftMeta)
            try {
                const res = await ERC721.mintNFT(web3.address, nftMeta?.jsonCid, web3?.signer, meta.address)
                console.log(res)
                const tokenArr = await ERC721.getAllMintedTokens(web3.signer, meta.address)
                const tokenId = tokenArr[tokenArr.length-1]
                const loaded = await reloadItems(meta.address, meta.name, tokenId)
                console.log(loaded)
                setStatus('Minting complete_')
                await reloadItems(meta.address, meta.collName, tokenId)
                return true
            } catch (error) {
                setStatus('Minting error_')
                return false
            }
        }
    }

    return <div className="collection">
        <section style={{backgroundImage: `url(${meta.image})`}}>
            <div className="info">
                <h2>{meta.name}</h2>
                <Tip hover={hover} text={'owner address'} />
                <p className='des'>{meta.description}</p>
                <ShortHash hash={meta.owner} setHover={setHover} />
            </div>
        </section>
        <nav>
            <div className="coll-btns">
                {web3?.signer ? toggle ? <button onClick={() => setToggle(!toggle)}>MINT</button> : 
                <button onClick={() => setToggle(!toggle)}>SHOW NFTS</button> : <></>}
            </div>
            {toggle && <div className="coll-toggle">
                <Toggle own={own} sale={sale} setOwn={setOwn} setSale={setSale} />
            </div>}
        </nav>
        {toggle ? <Grid items={nfts} /> :
        <Metadata className={'mint-meta'} height='250px' cids={nftMeta} setCids={setNftMeta} mint={handleMint}/>}
        <GoBack />
    </div>
}

export default Collection