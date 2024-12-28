import { useState } from "react"
import { shortHash } from "../../../utils/utils"
import './shorthash.css'

const ShortHash: React.FC<{hash: string, setHover?: (hoover: boolean)=> void}> = ({hash, setHover}) => {
    const [state, setState] = useState<boolean>(true)

    return <p className="shorthash" 
              style={{fontStyle: 'italic', cursor: 'pointer', position: 'absolute', left: '15px'}} 
              onClick={() => setState(!state)}
              onMouseEnter={() => {if(setHover) setHover(true)}} 
              onMouseLeave={() => {if(setHover) setHover(false)}}>{shortHash(hash, state)}</p>
}

export default ShortHash