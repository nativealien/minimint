import { useOutletContext } from 'react-router-dom'
import './collection.css'

const Collection = () => {
    const { collection }: any = useOutletContext()

    console.log(collection)

    return <div className="collection">
        <h2>Collection</h2>
    </div>
    
}

export default Collection