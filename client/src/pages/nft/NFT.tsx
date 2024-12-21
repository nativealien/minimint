import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context/context'
import marketplace from '../../service/blockchain/marketplace'
import ListNFT from '../../components/forms/ListNFT'
import './nft.css'
import GoBack from '../../components/buttons/GoBack'

// const address = import.meta.env.VITE_MINIMINT_MAIN_CONTRACT

const NFT = () => {
    const { web3, items, reloadItems, setStatus } = useAppContext()
    const [toggle, setToggle] = useState<boolean>(false)
    const [nft, setNft] = useState<any>(null)
    const [coll, setColl] = useState<any>(null)
    const navigate = useNavigate()
    const location = useLocation()
    const { meta } = location.state || {};
    useEffect(() => {
        if(items) {
            const collect = items.filter((item: ICollMeta) => item.name === meta.collName)
            setColl(collect[0])

        }
        console.log('NFT TEST', meta)
        setNft(meta)
    }, [])
    useEffect(() => {
        const check = async () => {
            if(nft){
                setStatus('Reloading metadata')
                const newNft = await reloadItems(meta.address, meta.collName, nft.tokenId)
                setNft(newNft)
                setStatus(null)
            }
        }
        check()
    }, [toggle])

    const handleBuy = async () => {
        await marketplace.buyNFT(web3?.signer, nft.address, nft.tokenId, nft.listing.eth, setStatus)
        setToggle(!toggle)
    }

    return <div className="nft">
        {nft && <section className='override'>
            <img src={nft.image} alt="" />
            <div className="nft-info">
                <h2>{nft.name}</h2>
                <p>{nft.description}</p>
                <p>{nft.owner}</p>
                {nft.owner === web3?.address ? 
                    <ListNFT meta={nft} toggle={toggle} setToggle={setToggle} /> : 
                    nft.listing.list ? 
                        <h4 onClick={() => handleBuy()}>For sale: {nft.listing.eth} <img style={{width: "25px"}} src='/icons/ethereum-light.svg' /></h4> : 
                        <p>This NFT is not on sale</p>}
                <a onClick={() => navigate('/gallery/collection', {state: {meta: coll}})}>{nft.collName}</a>
            </div>
        </section>}
        <GoBack />
    </div>
    
}

export default NFT