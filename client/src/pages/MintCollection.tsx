import { useEffect, useState } from "react"
import Metadata from "../components/forms/Metadata"

const MintCollection = () => {
    const [collMeta, setCollmeta] = useState<any>(null)
    const [process, setProcess] = useState<boolean>(false)
    const [del, setDel] = useState<boolean>(false)
    useEffect(() => {
        console.log('--------------------------------------------------------------------------------------------------------------------------------------------------------')
        console.log(collMeta)
        if(collMeta) setProcess(false)
        if(!collMeta) setDel(false)
    }, [collMeta])

    return <div className="mintcollection">
        <h2>Mint Collection</h2>
        <section>
            <p>Mint a collection, Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis dolorum modi eos distinctio ad. Doloribus tempore quia nam, voluptate aliquid possimus velit expedita illo quos cupiditate placeat animi sit veritatis?</p>
        </section>
        <Metadata process={process} del={del} className={'collmeta'} setNew={setCollmeta} />
        <button onClick={() => setProcess(true)}>process</button>
        <button onClick={() => setDel(true)}>del</button>
    </div>
}

export default MintCollection