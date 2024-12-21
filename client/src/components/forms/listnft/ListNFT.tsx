import { useState } from "react"
import marketplace from "../../../service/blockchain/marketplace"
import { useAppContext } from "../../../context/context"
import './listnft.css'

const ListNFT = ({meta, toggle, setToggle}: {meta: INFTMeta, toggle: boolean, setToggle: (toggle: boolean) => void}) => {
    const { web3, setStatus } = useAppContext()
    const [price, setPrice] = useState<string>('')
    const handleChange = (e: any) => {
        e.preventDefault()
        setPrice(e.target.value)
    }

    const handleList = async () => {
        if(+price > 0){
            console.log(meta.address)
            const res = await marketplace.listNFT(web3?.signer, meta.address, meta.tokenId, price, setStatus )
            console.log(res)
            setToggle(!toggle)
        } else {
            setStatus('Price has to be higher than 0_')
        }
    }

    const handleDelist = async () => {
        const res = await marketplace.delistNFT(web3?.signer, meta.address, meta.tokenId, setStatus )
        console.log(res)
        setToggle(!toggle)
    }

    return <div className="listnft">
        {!meta.listing.list ? <div className="list-wrap">
                <h4 onClick={() => handleList()}>List for sale</h4>
                <input min='0' type="number" onChange={(e) => handleChange(e)}/>
                <img src="/icons/ethereum-light.svg" alt="" />
            </div> : <div className="list-wrap">
                <h4 onClick={() => handleDelist()}>Delist</h4>
            </div>}
    </div>
}

export default ListNFT