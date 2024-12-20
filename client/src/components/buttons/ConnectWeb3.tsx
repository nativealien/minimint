// import { useEffect } from "react"
import { useAppContext } from "../../context/context"
import { connectProvider } from "../../service/provider"
import './buttons.css'

const ConnectWeb3 = () => {
    const { web3, setWeb3, setStatus }: any = useAppContext()
    // useEffect(() => {
    //     console.log(web3)
    // }, [web3])

    const handleConnect = async () => {
        setStatus('connecting')
        const res = await connectProvider(true, setStatus)
        if(typeof res !== 'string'){
            setWeb3(res)
        } else console.log(res)
    }

    return <div className="connectweb3">
        {!web3 && <div>
            <div onClick={() => handleConnect()} className="no"></div>
            <p>No connection to the blockchain...</p>
        </div>}
        {web3 && !web3.signer && <div>
            <div onClick={() => handleConnect()} className="inf">
                <img src={`/icons/metamask.svg`} alt="Metamask icon"></img>
            </div>
            <p>Infura connection</p>
        </div>}
        {web3 && web3.signer && <div>
            <div onClick={() => setWeb3(null)} className="off"></div>
            <p>{web3.address}</p>
        </div>}
    </div>
}

export default ConnectWeb3