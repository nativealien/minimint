import { useEffect, useState } from 'react'
import { useAppContext } from '../context/context'
import Grid from '../components/display/Grid'
import './gallery.css'

const Gallery = () => {
    const { collections, nfts } = useAppContext()
    const [toggle, setToggle] = useState<any>(false)
    useEffect(() => {
        console.log(toggle)
    }, [toggle])

    const items = toggle === true ? collections : nfts

    return <div className="gallery">
        <h2>Gallery</h2>
        <section>
            <p>Welcome to the Gallery Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi laboriosam libero quae deserunt maxime doloribus eaque non ad. Similique soluta neque sequi excepturi laborum eligendi ipsam maiores, voluptatem iusto itaque!</p>
        </section>
        <nav>
            <button onClick={() => setToggle(true)}>collections</button>
            <button onClick={() => setToggle(false)}>nfts</button>
        </nav>
        <Grid items={items} />
    </div>

}

export default Gallery