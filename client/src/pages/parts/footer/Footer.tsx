import { useAppContext } from '../../../context/context'
import './footer.css'

const Footer = () => {
    const { theme } = useAppContext()

    return <footer>
        <div className="social-icons">
            <img src={`/icons/linkedin-${theme}.svg`} alt="" />
            <a href='https://github.com/nativealien/minimint' target='_blank'><img src={`/icons/github-${theme}.svg`} alt="" /></a>
        </div>
    </footer>
}

export default Footer