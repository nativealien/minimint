import { useState } from "react"
import { useAppContext } from "../../../context/context"
import ShortHash from "../shorthash/ShortHash"
import Tip from "../../display/tip/Tip"
import './connectweb3.css'

const ConnectWeb3 = () => {
    const { setStatus, web3, connectWeb3 }: any = useAppContext()
    const [hover, setHover] = useState<boolean>(false)

    const handleConnect = async (metamask: boolean) => {
        if(!metamask) setStatus('Disconnecting Metamask_')
        await connectWeb3(metamask)
        // if(!status) await connectWeb3(metamask)
    }

    return <div className="connectweb3">
        {web3 && !window.ethereum && <div className="tool-container">
            <div className="no" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                <Tip hover={hover} text="you dont have metamask..."  />
            </div>
        </div>}
        {web3 && !web3.signer && window.ethereum && <div className="tool-container">
            <div onClick={() => handleConnect(true)} className="inf">
                <img src={`/icons/metamask.svg`} alt="Metamask icon" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}></img>
                <Tip hover={hover} text="connect to metamask" />
            </div>
            {/* <p>Infura connection</p> */}
        </div>}
        {web3 && web3.signer && window.ethereum &&  <div className="tool-container">
            <div onClick={() => handleConnect(false)} className="off" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}></div>
                <ShortHash hash={web3.address} />
                <Tip hover={hover} text="disconnect metamask" />
            </div>}
    </div>
}

export default ConnectWeb3