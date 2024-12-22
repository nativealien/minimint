import { useState } from 'react'
import { useAppContext } from '../../context/context'
import './toggletheme.css'

const ToggleTheme = () => {
    const { toggleTheme } = useAppContext()
    const [hover, setHover] = useState<boolean>(false)

    return <div onClick={() => toggleTheme()} 
                className="toggletheme"
                onMouseEnter={() => setHover(true)} 
                onMouseLeave={() => setHover(false)}>
            <div className="tip" style={{
                        opacity: `${hover ? '1' : '0'}`,
                        transform: `${hover ? 'translate(0, -25px)' : ''}`,
                        visibility: 'visible'
                    }}>toggle darkmode</div>
            </div>
}
export default ToggleTheme