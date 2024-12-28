import Navbar from '../navbar/Navbar'
import ToggleTheme from '../../../components/buttons/toggletheme/ToggleTheme'
import ConnectWeb3 from '../../../components/buttons/connectweb3/ConnectWeb3';

import './header.css'

const Header = () => {

    return <header>
        <h1>MINIMINT<span>marketplace</span></h1>
        <Navbar />
        <div className="toggles">
            <ToggleTheme />
            <ConnectWeb3 />
        </div>
    </header>
}

export default Header