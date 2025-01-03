import { useNavigate } from "react-router-dom"
import { useAppContext } from "../../../context/context"
import './card.css'
import { useEffect, useState } from "react"

const Card = ({meta}: {meta: ICollMeta | INFTMeta}) => {
    const { web3, theme } = useAppContext()
    const [sample, setSample] = useState<INFTMeta[] | null>(null)
    const navigate = useNavigate()
    useEffect(() => {
        if(meta.type === 'collection'){
            const samp = (meta as ICollMeta).nfts?.slice(0, 3) || []
            setSample(samp)
        }
    }, [])

    const handleClick = () => {
        if(meta.type === 'collection'){
            navigate('/gallery/collection', { state: { meta } });
        } else {
            navigate('/gallery/collection/nft', { state: { meta } });
        }
    }
    
    return <div onClick={handleClick} className={`${meta.type}-card grid-item`}>
        <img src={meta.image} />
        <div className="item-info">
            {sample && meta.type === 'collection' && <div className="sample">
                {sample.map((sam: INFTMeta, idx: any) => <img key={idx} src={sam.image} />)}    
            </div>}
            <div className="signs">
                <h3>{meta.name}</h3>
                {web3?.address === meta.owner && <img src={`/icons/star-${theme}.svg`}></img>}
                {'listing' in meta && meta.listing?.list && <img src={`/icons/ethereum-${theme}.svg`}></img>}
            </div>
        </div>
    </div>
}

export default Card

// 'listing' in meta