import Navbar from '../navbar/Navbar'
import ToggleTheme from '../../../components/buttons/toggletheme/ToggleTheme'

import './header.css'

const Header = () => {
    return <header>
        <div className="head-top">
            <h1>MINIMINT<span>marketplace</span></h1>
            <ToggleTheme />
        </div>
        <Navbar />
    </header>
}

export default Header