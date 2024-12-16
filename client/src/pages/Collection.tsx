import { useAppContext } from '../context/context'
import './collection.css'

const Collection = () => {
    const { collections }: any = useAppContext()

    console.log(collections)

    return <div className="collection">
        <h2>Collection</h2>
    </div>
    
}

export default Collection