import { useAppContext } from '../context/context'
import './nft.css'

const NFT = () => {
    const { nfts }: any = useAppContext()

    console.log(nfts)

    return <div className="nft">
        <h2>NFT</h2>
    </div>
    
}

export default NFT