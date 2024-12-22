import { useState } from "react"
import { shortHash } from "../../utils/utils"
import './shorthash.css'

const ShortHash: React.FC<{hash: string}> = ({hash}) => {
    const [state, setState] = useState<boolean>(true)

    return <p style={{fontStyle: 'italic', cursor: 'pointer', position: 'absolute', left: '15px'}} onClick={() => setState(!state)}>{shortHash(hash, state)}</p>
}

export default ShortHash