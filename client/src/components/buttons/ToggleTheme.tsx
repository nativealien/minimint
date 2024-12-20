import { useAppContext } from '../../context/context'
import './buttons.css'

const ToggleTheme = () => {
    const { toggleTheme } = useAppContext()

    return <div onClick={() => toggleTheme()} className="toggletheme">
        
    </div>
}
export default ToggleTheme