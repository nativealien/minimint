import { useOutletContext } from "react-router-dom"
import { connectProvider, addListener } from "../service/ethers-provider"
import { useEffect, useState } from "react"

const ConnectWeb3 = () => {
    const { wallet, setWallet, setStatus }: any = useOutletContext()
    const [account, setAccount] = useState<string>('')
    const [chainId, setChain] = useState<string | null>(null)
    const [connected, setConnected] = useState<boolean>(false)
    useEffect(() => {
        console.log(account, chainId, connected)
    }, [account, chainId, connected])

    const handleConnect = async () => {
        const res = await connectProvider()
        if(typeof res !== 'string'){
            setWallet(res)
            setAccount(await res.signer.getAddress())
            const network = await res.provider.getNetwork()
            setChain(network.chainId.toString())
            setConnected(true)
            addListener(setAccount, setChain, setConnected)
        } else setStatus(res)
    }

    return <div>

        {window.ethereum.isMetaMask && !wallet ? <div>
                    <button onClick={() => handleConnect()}>CONNECT</button>
                </div> : <div>
                    <button onClick={() => setWallet(null)}>DISCONNECT</button>
                    <p>{account}</p>
                    <p>{chainId}</p>
                </div>}
    </div>
}

export default ConnectWeb3