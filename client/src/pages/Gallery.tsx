import { useEffect, useState } from 'react'
import { useAppContext } from '../context/context'
import Grid from '../components/display/Grid'
import './gallery.css'
import { useNavigate } from 'react-router-dom'

const Gallery = () => {
    const { items } = useAppContext()
    const navigate = useNavigate()
    const [toggle, setToggle] = useState<boolean>(false)
    useEffect(() => {
        console.log(toggle)
    }, [toggle])

    const display = toggle === true ? [items?.collection] : items?.nfts

    return <div className="gallery">
        <h2>Gallery</h2>
        <section>
            <p>Welcome to the Gallery Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi laboriosam libero quae deserunt maxime doloribus eaque non ad. Similique soluta neque sequi excepturi laborum eligendi ipsam maiores, voluptatem iusto itaque!</p>
        </section>
        <nav>
            <button onClick={() => setToggle(true)}>collections</button>
            <button onClick={() => setToggle(false)}>nfts</button>
            <button onClick={() => navigate('collection/mint')}>Create collection</button>
        </nav>
        <Grid items={display} />
    </div>

}

export default Gallery