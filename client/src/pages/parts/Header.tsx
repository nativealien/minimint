import ConnectWeb3 from '../../components/buttons/ConnectWeb3'
import { useAppContext } from '../../context/context'
import './header.css'

const Header = () => {
    const { web3 } = useAppContext()

    return <header>
        <h1>MINIMINT</h1>
        {web3?.address && <ConnectWeb3 />}
    </header>
}

export default Header