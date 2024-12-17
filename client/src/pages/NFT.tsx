import { useLocation } from 'react-router-dom'
import './collection.css'

const NFT = () => {
    const location = useLocation()
    const { meta } = location.state || {};

    console.log(meta)

    return <div className="collection">
        <h2>NFT</h2>
    </div>
    
}

export default NFT