import { useNavigate } from "react-router-dom"

const Card = ({meta}: {meta: IMeta}) => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate("collection", { state: { meta } });
    }

    return <div onClick={handleClick} className={`${meta.type}-card grid-item`}>
        <img src={meta.image} alt="" />
        <h3>{meta.name}</h3>
        <p>{meta.description}</p>
        <p>{meta.type}</p>
    </div>
}

export default Card