import { useOutletContext } from 'react-router-dom'
import './nft.css'

const NFT = () => {
    const { nft }: any = useOutletContext()

    console.log(nft)

    return <div className="nft">
        <h2>NFT</h2>
    </div>
    
}

export default NFT