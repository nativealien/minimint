import { useState } from 'react'
import { useAppContext } from '../../../context/context'
import Tip from '../../display/tip/Tip'
import './toggletheme.css'

const ToggleTheme = () => {
    const { toggleTheme, theme } = useAppContext()
    const [hover, setHover] = useState<boolean>(false)

    return <div onClick={() => toggleTheme()} 
                className="toggletheme"
                onMouseEnter={() => setHover(true)} 
                onMouseLeave={() => setHover(false)}>
                <img src={`/icons/dark-mode-${theme}.svg`} alt="" />
                <Tip hover={hover} text='toggle darkmode' />
            </div>
}
export default ToggleTheme