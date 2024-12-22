// import { useEffect, useState } from "react"
import { useAppContext } from "../../context/context"
import './toggle.css'

const Toggle: React.FC<{
    own: boolean;
    sale: boolean;
    setOwn: (own: boolean) => void;
    setSale: (sale: boolean) => void}> = ({own, sale, setOwn, setSale}) => {
    const { theme } = useAppContext()

    return <div className="toggle">
        <p>toggle</p>
        <img onClick={() => setOwn(!own)} src={`/icons/star-${own ? 'act' : theme}.svg`} alt="Icon star" />
        <img onClick={() => setSale(!sale)} src={`/icons/ethereum-${sale ? 'act' : theme}.svg`} alt="Icon ETH" />
    </div>
}

export default Toggle