import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context/context'
import Grid from '../../components/display/grid/Grid'
import GoBack from '../../components/buttons/GoBack'
import './gallery.css'

const Gallery = () => {
    const { items } = useAppContext()
    const navigate = useNavigate()
    const [grid, setGrid] = useState<any>(items)

    const handleToggle = (check: boolean) => {
        setGrid(null)
        console.log('WTF')
        if(check){
            console.log(items)
            setGrid(items)
        }else {
            if(items){
                let nftArr: any = []
                items.forEach((item: any) => {
                    nftArr.push(item.nfts)
                });
                console.log(nftArr.flat())
                setGrid(nftArr.flat())
            }
        }
    }

    return <div className="gallery">
        <nav>
            <button style={{opacity: grid[0].type === 'nft' ? '1' : '0.3'}} onClick={() => handleToggle(true)}>collections</button>
            <button style={{opacity: grid[0].type === 'nft' ? '0.3' : '1'}} onClick={() => handleToggle(false)}>nfts</button>
            <button onClick={() => navigate('collection/mint')}>Create collection</button>
        </nav>
        {grid && <Grid items={grid} />}
        <GoBack />
    </div>

}

export default Gallery