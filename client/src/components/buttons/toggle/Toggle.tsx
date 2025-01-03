import { useEffect, useState } from "react";
import { useAppContext } from "../../../context/context"
import Tip from "../../display/tip/Tip";
import './toggle.css'

const Toggle: React.FC<{
    own: boolean;
    sale: boolean;
    setOwn: (own: boolean) => void;
    setSale: (sale: boolean) => void}> = ({own, sale, setOwn, setSale}) => {
    const { theme, web3 } = useAppContext()
    const [hover, setHover] = useState<boolean>(false)

    return <div className="toggle" 
                onMouseEnter={() => {
                    setHover(true)}} 
                onMouseLeave={() => {setHover(false)}}>
        {web3?.signer && <img onClick={() => setOwn(!own)} src={`/icons/star-${own ? 'act' : theme}.svg`} alt="Icon star" />}
        <img onClick={() => setSale(!sale)} 
             src={`/icons/ethereum-${sale ? 'act' : theme}.svg`} 
             alt="Icon ETH" 
             />
        <Tip hover={hover} text="toggle sale/own" />
    </div>
}

export default Toggle