import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context/context'

import Grid from '../../components/display/grid/Grid'
import GoBack from '../../components/buttons/goback/GoBack'
import Toggle from '../../components/buttons/toggle/Toggle'
import Section from '../../components/display/section/Section'

import gallery from '../../content/gallery.md?raw'
import './gallery.css'

const Gallery = () => {
    const { items, web3 } = useAppContext()
    const navigate = useNavigate()
    const [colls, setColls] = useState<ICollMeta[] | null>(null)
    const [nfts, setNfts] = useState<INFTMeta[] | null>(null)
    const [type, setType] = useState<boolean>(false)
    const [own, setOwn] = useState<boolean>(false)
    const [sale, setSale] = useState<boolean>(false)
    useEffect(() => {
        if(items){
            console.log(own)
            let newColls: any = items
            if(own) newColls = items.filter(item => item.owner === web3?.address)
            setColls(newColls)
            const res: any = items?.map( item => item.nfts)
            let resFlat = res.flat()
            if(own) resFlat = resFlat.filter((item: any) => item.owner === web3?.address)
            if(sale) resFlat = resFlat.filter((item: any) => item.listing.list)
            setNfts(resFlat)
        }
    }, [own, sale, items])

    return <div className="gallery">
            <Section markdown={gallery}/>
            {colls && nfts && <div className="gallery-buttons">
                <div className='type'>
                    <button style={{opacity: type ? '1' : '0.3'}} onClick={() => setType(false)}>collections</button>
                    <button style={{opacity: type ? '0.3' : '1'}} onClick={() => setType(true)}>nfts</button>
                    <button onClick={() => navigate('collection/mint')}>New collection</button>
                </div>
                <Toggle own={own} sale={sale} setOwn={setOwn} setSale={setSale} />
            </div>}
            {colls && nfts && <Grid items={!type ? colls : nfts} />}
            <GoBack />
        </div>

}

export default Gallery
