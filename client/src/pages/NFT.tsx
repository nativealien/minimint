import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/context'
import marketplace from '../service/blockchain/marketplace'
import ListNFT from '../components/forms/ListNFT'
import './nft.css'

// const address = import.meta.env.VITE_MINIMINT_MAIN_CONTRACT

const NFT = () => {
    const { web3, items } = useAppContext()
    const navigate = useNavigate()
    const location = useLocation()
    const { meta } = location.state || {};
    useEffect(() => {
        const check = async () => {
            // const test = await marketplace.isSupportedCollection(web3.provider, address)
            const test = await marketplace.getMainCollection(web3.provider)
            console.log(test)
        }
        check()
    })

    console.log(meta.owner)

    return <div className="nft">
        <section>
            <img src={meta.image} alt="" />
            <div className="nft-info">
                <h2>{meta.name}</h2>
                <p>{meta.description}</p>
                <p>{meta.owner}</p>
                {meta.owner === web3?.address ? <ListNFT meta={meta} /> : meta.listing.list ? <button>ON SALE FOR {meta.listing.eth} ETH</button> : <>This NFT is not on sale</>}
                <a onClick={() => navigate('/gallery/collection', {state: {meta: items.collection}})}>{items.collection.name}</a>
            </div>
        </section>
    </div>
    
}

export default NFT