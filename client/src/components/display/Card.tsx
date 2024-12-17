import { useNavigate, useLocation } from "react-router-dom"

const Card = ({meta}: {meta: IMeta}) => {
    const location = useLocation()
    const navigate = useNavigate()
    let path = ''
    if(meta.type === 'collection'){
        path = meta.type
    }else {
        if(location.pathname === '/gallery'){
            path = '/gallery/collection/' + meta.type;
        } else {
            path = location.pathname + '/' + meta.type
        }
    }
    console.log(location)

    const handleClick = () => {
        navigate(path, { state: { meta } });
    }

    return <div onClick={handleClick} className={`${meta.type}-card grid-item`}>
        <img src={meta.image} alt="" />
        <h3>{meta.name}</h3>
        <p>{meta.description}</p>
        <p>{meta.type}</p>
    </div>
}

export default Card