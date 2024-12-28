import { useNavigate } from "react-router-dom"
import './goback.css'


const GoBack: React.FC<{path?: string, state?: any}> = ({path, state}) => {
    const navigate = useNavigate()

    return <h4 className="goback" onClick={() => path ? navigate(path, { state: { state }}) : navigate(-1)}>◀ BACK</h4>
}

export default GoBack