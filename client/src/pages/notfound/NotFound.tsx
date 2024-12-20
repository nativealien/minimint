import { useNavigate } from 'react-router-dom'
import './notfound.css'

const NotFound = () => {
    const navigate = useNavigate()

    const handleGoBack = () => {
        navigate(-1)
    }

    return <div className= "notfound">
        <h2>Notfound</h2>
        <button onClick={handleGoBack}>GO BACK</button>
    </div>
}

export default NotFound