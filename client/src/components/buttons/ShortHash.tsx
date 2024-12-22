import { useState } from "react"
import { shortHash } from "../../utils/utils"
import './shorthash.css'

const ShortHash: React.FC<{hash: string}> = ({hash}) => {
    const [state, setState] = useState<boolean>(true)

    return <p onClick={() => setState(!state)}>{shortHash(hash, state)}</p>
}

export default ShortHash