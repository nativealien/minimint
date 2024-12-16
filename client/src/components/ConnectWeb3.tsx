import { useOutletContext } from "react-router-dom"
import { connectProvider } from "../service/provider"
import { useEffect } from "react"

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
        {!web3.signer ? <div>
            <button onClick={() => handleConnect()}>Connect</button>
        </div> : <div>
            <button onClick={() => setWeb3(null)}>Disconnect</button>
        </div>}
    </div>
}

export default ConnectWeb3