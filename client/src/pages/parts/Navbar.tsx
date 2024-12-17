import { NavLink } from "react-router-dom"
import './navbar.css'

const Navbar = () => {

    return <nav>
        <ul>
            <li><NavLink to={'/'}>Home</NavLink></li>
            <li><NavLink to={'about'}>About</NavLink></li>
            <li><NavLink to={'gallery'}>Gallery</NavLink></li>
            <li><NavLink to={'gallery/collection'}>Collection</NavLink></li>
            <li><NavLink to={'gallery/nft'}>NFT</NavLink></li>
            <li><NavLink to={'notfound'}>NotFound</NavLink></li>
        </ul>
    </nav>
}

export default Navbar