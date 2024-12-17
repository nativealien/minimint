import { useLocation, useNavigate } from 'react-router-dom'
import './collection.css'
import Grid from '../components/display/Grid';

const Collection = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { meta } = location.state || {};
    if(!meta) navigate(-1)

    console.log(meta)

    return <div className="collection">
        <section>
            <h2>{meta.name}</h2>
            <p>{meta.owner}</p>
            <img src={meta.image} alt="" />
        </section>
        <Grid items={meta.nfts} />
    </div>
    
}

export default Collection