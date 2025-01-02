import { NavLink } from "react-router-dom"
import ConnectWeb3 from "../../../components/buttons/connectweb3/ConnectWeb3"
import Modal from "../../../components/display/modal/Modal"
import './navbar.css'
import { useAppContext } from "../../../context/context"

const Navbar = () => {
    const { status, setStatus } = useAppContext()

    return <nav>
        <ul>
            <li><NavLink to={'/'}>Home</NavLink></li>
            <li><NavLink to={'about'}>About</NavLink></li>
            <li><NavLink to={'gallery'}>Gallery</NavLink></li>
        </ul>
        <div className="toggles">
            <ConnectWeb3 />
            {status && <Modal status={status} setStatus={setStatus} />}
        </div>
    </nav>
}

export default Navbar