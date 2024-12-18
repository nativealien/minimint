import { useState } from "react"
import marketplace from "../../service/blockchain/marketplace"
import { useAppContext } from "../../context/context"

const ListNFT = ({meta}: {meta: INFTMeta}) => {
    const { web3 } = useAppContext()
    const [price, setPrice] = useState<string>('')
    const handleChange = (e: any) => {
        e.preventDefault()
        setPrice(e.target.value)
    }

    const handleList = async () => {
        const res = await marketplace.listNFT(web3.signer, meta.address, meta.tokenId, price )
        console.log(res)
    }

    const handleDelist = async () => {
        const res = await marketplace.delistNFT(web3.signer, meta.address, meta.tokenId )
        console.log(res)
    }

    return <div className="listnft">
        {meta.listing.list ? <div>
                <p>OWN</p>
                <input type="text" onChange={(e) => handleChange(e)}/>
                <button onClick={() => handleList()}>List</button>
            </div> : <button onClick={() => handleDelist()}>Delist</button>}
    </div>
}

export default ListNFT