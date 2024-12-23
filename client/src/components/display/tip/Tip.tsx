import { useEffect, useState } from "react"
import { delay } from "../../../utils/utils"


const Tip: React.FC<{hover: boolean, text: string}> = ({hover, text}) => {
    const [show, setShow] = useState<boolean>(hover)
    useEffect(() => {
        setShow(true)
        const timeHover = async () => {
            await delay(3000)
            setShow(false)
        }
        timeHover()
    }, [hover])

    return <div className="tip" style={{
        opacity: `${show ? '1' : '0'}`,
        transform: `${show ? 'translate(0, -25px)' : ''}`,
        visibility: 'visible',
        color: 'var(--color-50)'
    }}>{text}</div>
}

export default Tip