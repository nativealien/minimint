import { useNavigate } from "react-router-dom"
import { useAppContext } from "../../context/context"
import './home.css'

const Home = () => {
    const { web3, loading, setStatus, theme }: any = useAppContext()
    const navigate = useNavigate()

    return <div className="home">
            {/* <h2>Home</h2> */}
            <section>
                <img src={`/icons/ethereum-${theme}.svg`} alt="Eth icon"></img>
                <p>Welcome to MiniMint Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi laboriosam libero quae deserunt maxime doloribus eaque non ad. Similique soluta neque sequi excepturi laborum eligendi ipsam maiores, voluptatem iusto itaque!</p>
            </section>
            {!web3?.address ? <div>
                {window.ethereum ? <img src={`/icons/metamask.svg`} alt="Metamask icon"></img> : <>You need metamask...</>}
                <p onClick={() => navigate('gallery')}>{"continue without connecting ->"}</p>
                <button onClick={() => setStatus('Status')}>Set</button>
            </div> : <div>
                    {!loading && <h2 onClick={() => navigate('gallery')}>Continue to the gallery!</h2>}
            </div>}
    </div>
}

export default Home