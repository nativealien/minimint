// import { useOutletContext } from "react-router-dom"
import ConnectWeb3 from "../components/ConnectWeb3"

const Home = () => {
    // const { local }: any = useOutletContext()

    return <div className="home">
        <h2>Home</h2>
        {/* {local && <>Local chain running</>} */}
        {window.ethereum ? <ConnectWeb3 /> : <>You need metamask...</>}
    </div>
}

export default Home