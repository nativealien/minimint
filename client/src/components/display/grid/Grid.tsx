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
        setCards(null)
        const newCards = cardGenerator(items)
        setCards(newCards)
    }, [items])

    return <>{items && <div className="grid" style={{gridTemplateColumns: items.length > 0 ? items[0].type === 'nft' ? 'repeat(4, 1fr)' : 'repeat(2, 1fr)' : ''}}>
        {cards && cards.length > 0 && cards}
    </div>}</>
}

export default Grid