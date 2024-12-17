import { useLocation, useNavigate } from 'react-router-dom'
import './collection.css'

const NFT = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { meta } = location.state || {};
    if(!meta) navigate(-1)

    console.log(meta)

    return <div className="collection">
        <h2>NFT</h2>
    </div>
    
}

export default NFT