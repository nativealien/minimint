import { useEffect, useState } from 'react'
import Card from './Card'
import './grid.css'

const cardGenerator = (items: IMeta[] | INFTMeta[]) => {
    const temp: JSX.Element[] = []
    let cardkey = 1
    console.log(items)
    items.map((item: IMeta | INFTMeta) => {
        temp.push(<Card key={`key-${cardkey}`} meta={item} />)
        cardkey++
    })
    return temp
}

const Grid = ({items}: { items: IMeta[] | INFTMeta[] }) => {
    const [cards, setCards] = useState<JSX.Element[] | null>(null)
    useEffect(() => {
        const newCards = cardGenerator(items)
        setCards(newCards)
    }, [items])

    return <div className="grid">
        {cards && cards}
    </div>
}

export default Grid