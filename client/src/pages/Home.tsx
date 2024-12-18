// import { useOutletContext } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useAppContext } from "../context/context"
import { useEffect } from "react"
import ConnectWeb3 from "../components/buttons/ConnectWeb3"
import Loading from "../components/display/Loading"
import './home.css'

const Home = () => {
    const { web3, loading }: any = useAppContext()
    const navigate = useNavigate()
    useEffect(() => {
        console.log(web3)
    }, [web3])

    return <div className="home">
            <h2>Home</h2>
            <section>
                <p>Welcome to MiniMint Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi laboriosam libero quae deserunt maxime doloribus eaque non ad. Similique soluta neque sequi excepturi laborum eligendi ipsam maiores, voluptatem iusto itaque!</p>
            </section>
            {!web3?.address ? <div>
                {window.ethereum ? <ConnectWeb3 /> : <>You need metamask...</>}
                <p onClick={() => navigate('gallery')}>{"continue without connecting ->"}</p>
            </div> : <div>
                    {!loading && <h2 onClick={() => navigate('gallery')}>Continue to the gallery!</h2>}
                </div>}
            {loading && <Loading />}
    </div>
}

export default Home