import { useNavigate, useLocation } from "react-router-dom"
import { useAppContext } from "../../context/context"

const Card = ({meta}: {meta: IMeta}) => {
    const { web3 } = useAppContext()
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
    console.log(web3)

    const handleClick = () => {
        navigate(path, { state: { meta } });
    }

    return <div style={{backgroundImage: `url(${meta.image})`}} onClick={handleClick} className={`${meta.type}-card grid-item`}>
        {/* <img src={meta.image} alt="" /> */}
        <div className="item-info">
            <h3>{meta.name}</h3>
            {web3.address === meta.owner && <>OWN</>}
        </div>
        {/* <p>{meta.description}</p>
        <p>{meta.type}</p> */}
    </div>
}

export default Card