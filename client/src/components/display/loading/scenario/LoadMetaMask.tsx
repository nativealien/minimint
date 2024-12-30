import Lottie from "lottie-react"
import animate from '../../../../content/lottie/ethereum-logo.json'

const LoadMetaMask = () => {

    return <div className="loading metamask">
        <Lottie animationData={animate} />
    </div>
}

export default LoadMetaMask