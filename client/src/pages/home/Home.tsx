import { useNavigate } from "react-router-dom"
import { useAppContext } from "../../context/context"
import './home.css'
import Section from "../../components/display/section/Section"

const Home = () => {
    const { web3, loading, setStatus, theme }: any = useAppContext()
    const navigate = useNavigate()

    const welcome = 'Welcome To Minimint'
    const ptext = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum inventore optio, sed nulla culpa quaerat sint, quia repellat enim modi ipsum blanditiis nobis quod dicta impedit beatae, consequuntur veniam natus!"

    return <div className="home">
            
            <Section imgSrc={`/icons/ethereum-${theme}.svg`} imgAlt="Eth icon" h2Text={welcome} pText={ptext + ptext} />
            {!web3?.address ? <div>
                {window.ethereum ? <img src={`/icons/metamask.svg`} alt="Metamask icon"></img> : <p>You need metamask...</p>}
                <p onClick={() => navigate('gallery')}>{"continue without connecting ->"}</p>
            </div> : <div>
                    {!loading && <h2 onClick={() => navigate('gallery')}>Continue to the gallery!</h2>}
            </div>}
    </div>
}

export default Home