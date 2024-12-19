import { useLocation, useNavigate } from 'react-router-dom'
import './collection.css'
import Grid from '../components/display/Grid';
import { useAppContext } from '../context/context';
import './collection.css'

const Collection = () => {
    const { items } = useAppContext()
    const navigate = useNavigate()
    const location = useLocation()
    const { meta } = location.state || {};
    if(!meta) navigate(-1)

    return <div className="collection" style={{backgroundImage: `url(${meta.image})`}}>
        <section className='override'>
            <h2>{meta.name}</h2>
            <div>
                <p>{meta.owner}</p>
                <p className='des'>{meta.description}</p>
            </div>
            {/* <img src={meta.image} alt="" /> */}
        </section>
        <Grid items={items?.nfts} />
    </div>
}

export default Collection