// import { useOutletContext } from "react-router-dom"
import ConnectWeb3 from "../components/ConnectWeb3"
import { connectProvider } from "../service/provider"
import { useOutletContext } from "react-router-dom"
import './home.css'
import { useEffect } from "react"

const Home = () => {
    const { web3 }: any = useOutletContext()
    useEffect(() => {
        console.log(web3)
    }, [web3])

    const handleContinue = async () => {
        const res = await connectProvider(false)
        console.log(res)
    }

    return <div className="home">
        <h2>Home</h2>
        <section>
            <p>Welcome to MiniMint Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi laboriosam libero quae deserunt maxime doloribus eaque non ad. Similique soluta neque sequi excepturi laborum eligendi ipsam maiores, voluptatem iusto itaque!</p>
        </section>
        {/* {local && <>Local chain running</>} */}
        {window.ethereum ? <ConnectWeb3 /> : <>You need metamask...</>}
        <p onClick={() => handleContinue()}>continue without connecting</p>


    </div>
}

export default Home