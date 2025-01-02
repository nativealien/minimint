import { useAppContext } from '../../../context/context'
import './footer.css'

const Footer = () => {
    const { theme } = useAppContext()

    return <footer>
        <div className="social-icons">
            <img src={`/icons/linkedin-${theme}.svg`} alt="" />
            <img src={`/icons/github-${theme}.svg`} alt="" />
        </div>
    </footer>
}

export default Footer