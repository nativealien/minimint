import { useLocation, useNavigate } from 'react-router-dom'
import './nft.css'

const NFT = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { meta } = location.state || {};
    if(!meta) navigate(-1)

    console.log(meta)

    return <div className="nft">
        <section>
            <img src={meta.image} alt="" />
            <div className="nft-info">
                <h2>{meta.name}</h2>
                <p>{meta.description}</p>
                <p>{meta.owner}</p>
                <a onClick={() => navigate('/gallery/collection', {state: {meta: meta.collection}})}>{meta.collection.name}</a>
            </div>
        </section>
    </div>
    
}

export default NFT