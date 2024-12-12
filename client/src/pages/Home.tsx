// import { useOutletContext } from "react-router-dom"
import ConnectWeb3 from "../components/ConnectWeb3"
// import MetaForm from "../components/MetaForm"
import MintNFT from "../components/forms/MintNFT"

const Home = () => {
    // const { local }: any = useOutletContext()

    return <div className="home">
        <h2>Home</h2>
        {/* {local && <>Local chain running</>} */}
        {window.ethereum ? <ConnectWeb3 /> : <>You need metamask...</>}

        <MintNFT />
    </div>
}

export default Home