import { useNavigate } from "react-router-dom"


const GoBack: React.FC<{path?: string, state?: any}> = ({path, state}) => {
    const navigate = useNavigate()

    return <h4 onClick={() => path ? navigate(path, { state: { state }}) : navigate(-1)}>◀ BACK</h4>
}

export default GoBack