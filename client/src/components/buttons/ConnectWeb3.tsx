import { useEffect, useState } from "react"
import { useAppContext } from "../../context/context"
import ShortHash from "./ShortHash"
import Tip from "../display/tip/Tip"
import { connectProvider } from "../../service/provider"
import './connectweb3.css'

const ConnectWeb3: React.FC<{mm?: boolean}> = ({mm}) => {
    const { web3, setWeb3, setStatus }: any = useAppContext()
    const [hover, setHover] = useState<boolean>(false)
    useEffect(() => {
        console.log('TIP', hover)
    }, [hover])

    const handleConnect = async () => {
        setStatus('Connecting')
        const res = await connectProvider(true, setStatus)
        if(typeof res !== 'string'){
            setWeb3(res)
        } else console.log(res)
    }

    return <div className="connectweb3">
        {!web3 && !mm && <div className="tool-container">
            <div onClick={() => handleConnect()} className="no"></div>
            <p>No connection to the blockchain...</p>
        </div>}
        {web3 && !web3.signer && !mm && <div className="tool-container">
            <div onClick={() => handleConnect()} className="inf">
                <img src={`/icons/metamask.svg`} alt="Metamask icon" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}></img>
                <Tip hover={hover} text="connect to metamask" />
            </div>
            <p>Infura connection</p>
        </div>}
        {web3 && web3.signer && !mm && <div className="tool-container">
            <div onClick={() => setWeb3(null)} className="off" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}></div>
            <ShortHash hash={web3.address} />
            <Tip hover={hover} text="disconnect metamask" />
        </div>}
        {mm && <img onClick={() => handleConnect()} src="/icons/metamask.svg" />}
    </div>
}

export default ConnectWeb3