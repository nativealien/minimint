import { useEffect, useState } from 'react'
import Card from '../card/Card'
import './grid.css'

const cardGenerator = (items: ICollMeta[] | INFTMeta[]) => {
    const temp: JSX.Element[] = []
    let cardkey = 1
    items?.map((item: ICollMeta | INFTMeta) => {
        temp.push(<Card key={`key-${cardkey}`} meta={item} />)
        cardkey++
    })
    return temp
}

const Grid = ({items}: { items: ICollMeta[] | INFTMeta[] | any }) => {
    const [cards, setCards] = useState<JSX.Element[] | null>(null)
    useEffect(() => {
        console.log(items)
        setCards(null)
        const newCards = cardGenerator(items)
        setCards(newCards)
    }, [items])

    return <>{items && items.length > 0 && <div className={`grid${items[0].type === 'nft' ? ' nfts-grid' : ' colls-grid'}`}>
        {items && cards && cards.length > 0 && cards}
    </div>}</>
}

export default Grid