import { useNavigate } from "react-router-dom"
import { useAppContext } from "../../context/context"

import Section from "../../components/display/section/Section"

import home from '../../content/home.md?raw'
import './home.css'

const Home = () => {
    const { web3, loading }: any = useAppContext()
    const navigate = useNavigate()

    return <div className="home">
            <Section markdown={home} />
            {!web3?.address ? <div>
                {/* {window.ethereum ? <img src={`/icons/metamask.svg`} alt="Metamask icon"></img> : <p>You need metamask...</p>} */}
                <h4 onClick={() => navigate('gallery')}>{"continue without connecting ->"}</h4>
            </div> : <div>
                    <p>You are connected!</p>
                    {!loading && <h4 onClick={() => navigate('gallery')}>Continue to the gallery ▶</h4>}
            </div>}
    </div>
}

export default Home