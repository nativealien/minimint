import { useLocation } from 'react-router-dom'
// import { useAppContext } from '../context/context'
import './collection.css'

const Collection = () => {
    // const { collections }: any = useAppContext()
    const location = useLocation()
    const { meta } = location.state || {};

    console.log(meta)

    return <div className="collection">
        <h2>Collection</h2>
    </div>
    
}

export default Collection