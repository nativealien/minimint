import { useNavigate, useLocation } from "react-router-dom"
import { useAppContext } from "../../context/context"
import './card.css'

const Card = ({meta}: {meta: IMeta | INFTMeta}) => {
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

    const handleClick = () => {
        navigate(path, { state: { meta } });
    }

    return <div style={{backgroundImage: `url(${meta.image})`}} onClick={handleClick} className={`${meta.type}-card grid-item`}>
        {/* <img src={meta.image} alt="" /> */}
        <div className="item-info">
            <h3>{meta.name}</h3>
            <div className="signs">
                {web3?.address === meta.owner && <p className="O">O</p>}
                {'listing' in meta && meta.listing?.list && <p className="L">L</p>}
            </div>
        </div>
        {/* <p>{meta.description}</p>
        <p>{meta.type}</p> */}
    </div>
}

export default Card