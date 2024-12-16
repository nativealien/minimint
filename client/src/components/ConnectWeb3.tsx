import { useOutletContext } from "react-router-dom"
import { connectProvider, addListener } from "../service/provider"
import { useEffect, useState } from "react"

const ConnectWeb3 = () => {
    const { web3, setWeb3, setStatus }: any = useOutletContext()
    useEffect(() => {
        console.log(web3)
    }, [web3])

    const handleConnect = async () => {
        const res = await connectProvider(true)
        if(typeof res !== 'string'){
            setWeb3(res)
        } else setStatus(res)
    }

    return <div>
        {!web3 ? <div>
            <button onClick={() => handleConnect()}>{window.ethereum ? 'METAMASK' : 'INFURA'}</button>
        </div> : <div>
            <button onClick={() => setWeb3(null)}>disconnect</button>
        </div>}
    </div>
}

export default ConnectWeb3