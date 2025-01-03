import { useNavigate } from "react-router-dom"
import { useAppContext } from "../../context/context"
import Lottie from "lottie-react"
import metamask from '../../content/lottie/metamask.json'

import Section from "../../components/display/section/Section"

import home from '../../content/home.md?raw'
import './home.css'

const Home = () => {
    const { web3, loading, connectWeb3 }: any = useAppContext()
    const navigate = useNavigate()

    const handleConnect = async (metamask: boolean) => {
        await connectWeb3(metamask)
    }

    return <div className="home">
            <Section markdown={home} />
            <div className="home-bottom">
                    <Lottie animationData={metamask} style={{
                        width: '200px',
                        cursor: 'pointer'
                    }} onClick={() => handleConnect(true)}/>
                    <div className="home-right">
                        <p>{!window.ethereum ? 'You dont have Metamask installed...' 
                          : !web3?.address ? 'Sign in with metamask' : 'You are connected!'}</p>
                        {!loading && web3?.address ? 
                        <h4 onClick={() => navigate('gallery')}>Continue to the gallery ▶</h4> :
                        <h4 onClick={() => navigate('gallery')}>{"continue without connecting ▶"}</h4>}
                    </div>
            </div>
    </div>
}

export default Home