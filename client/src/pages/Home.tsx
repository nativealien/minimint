// import { useOutletContext } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useAppContext } from "../context/context"
import { useEffect } from "react"
import ConnectWeb3 from "../components/ConnectWeb3"
import './home.css'

const Home = () => {
    const { web3 }: any = useAppContext()
    const navigate = useNavigate()
    useEffect(() => {
        console.log(web3)
    }, [web3])

    return <div className="home">
        <h2>Home</h2>
        <section>
            <p>Welcome to MiniMint Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi laboriosam libero quae deserunt maxime doloribus eaque non ad. Similique soluta neque sequi excepturi laborum eligendi ipsam maiores, voluptatem iusto itaque!</p>
        </section>
        {/* {local && <>Local chain running</>} */}
        {window.ethereum ? <ConnectWeb3 /> : <>You need metamask...</>}
        <p onClick={() => navigate('gallery')}>{"continue without connecting ->"}</p>


    </div>
}

export default Home