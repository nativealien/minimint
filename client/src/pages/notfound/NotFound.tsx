import { useNavigate } from 'react-router-dom'
import './notfound.css'
import GoBack from '../../components/buttons/GoBack'

const NotFound = () => {
    const navigate = useNavigate()

    const handleGoBack = () => {
        navigate(-1)
    }

    return <div className= "notfound">
        <h2>Notfound</h2>
        <GoBack  />
    </div>
}

export default NotFound