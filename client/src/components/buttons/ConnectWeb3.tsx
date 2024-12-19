// import { useEffect } from "react"
import { useAppContext } from "../../context/context"
import { connectProvider } from "../../service/provider"

const ConnectWeb3 = () => {
    const { web3, setWeb3, setStatus }: any = useAppContext()
    // useEffect(() => {
    //     console.log(web3)
    // }, [web3])

    const handleConnect = async () => {
        setStatus('connecting')
        const res = await connectProvider(true)
        if(typeof res !== 'string'){
            setWeb3(res)
        } else setStatus(res)
    }

    return <div>
        {!web3?.signer ? <div>
            <button onClick={() => handleConnect()}>Connect</button>
        </div> : <div>
            <button onClick={() => setWeb3(null)}>Disconnect</button>
        </div>}
    </div>
}

export default ConnectWeb3