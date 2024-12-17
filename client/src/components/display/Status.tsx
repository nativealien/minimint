import { useAppContext } from "../../context/context"
import './status.css'


const Status = () => {
    const {status, setStatus} = useAppContext()

    return <div className="status">
        <p>{status}</p>
    </div>
}

export default Status