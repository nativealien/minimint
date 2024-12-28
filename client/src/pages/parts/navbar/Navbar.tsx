import { NavLink } from "react-router-dom"
import { useAppContext } from "../../../context/context"
import './navbar.css'

const Navbar = () => {
    const {loading} = useAppContext()

    return <nav>
        <ul>
            <li><NavLink to={'/'}>Home</NavLink></li>
            <li><NavLink to={'about'}>About</NavLink></li>
            {!loading && <li><NavLink to={'gallery'}>Gallery</NavLink></li>}
        </ul>
    </nav>
}

export default Navbar