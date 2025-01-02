import { useNavigate } from "react-router-dom"
import { useAppContext } from "../../context/context"
import { connectProvider } from "../../service/provider"
import Lottie from "lottie-react"
import metamask from '../../content/lottie/metamask.json'

import Section from "../../components/display/section/Section"

import home from '../../content/home.md?raw'
import './home.css'

const Home = () => {
    const { web3, setWeb3, loading, setStatus }: any = useAppContext()
    const navigate = useNavigate()

    const handleConnect = async () => {
        setStatus('Connecting')
        const res = await connectProvider(true, setStatus)
        if(typeof res !== 'string'){
            setWeb3(res)
        } else console.log(res)
    }

    return <div className="home">
            <Section markdown={home} />
            <div className="home-bottom">
                    <Lottie animationData={metamask} style={{
                        width: '200px',
                        cursor: 'pointer'
                    }} onClick={() => handleConnect()}/>
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