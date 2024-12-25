import { useEffect, useState } from "react"
import { useAppContext } from "../../context/context"

import Metadata from "../../components/forms/metadata/Metadata"
import ConnectWeb3 from "../../components/buttons/ConnectWeb3"
import GoBack from "../../components/buttons/GoBack"
import Section from "../../components/display/section/Section"
import factory from "../../service/blockchain/factory"
import ipfs from "../../service/ipfs"
import mintcollection from '../../content/mintcollection.md?raw'

import './mintcollection.css'

const MintCollection = () => {
    const { web3, setStatus } = useAppContext()
    const [collMeta, setCollmeta] = useState<any>(null)

    useEffect(() => {
        console.log(collMeta)
    }, [collMeta])

    const handleMint = async (e: any) => {
        e.preventDefault()
        setStatus('Minting collection, dont leave the page.')
        const coll = await ipfs.fetchIPFSJSON(collMeta.jsonCid)
        const collUri = collMeta.jsonCid
        const res = await factory.deployCollection(web3?.signer, coll.name, 'MM',collUri)
        console.log(res)
        setStatus('Collection minted!_')
    }

    return <div className="mintcollection">
        <Section markdown={mintcollection} />
        {web3 && web3.signer ? <div className="signed">
            {<Metadata className={'collmeta'} height="500px" cids={collMeta} setCids={setCollmeta} />}
            {collMeta && <div className="mintcoll-btn">
                <button onClick={(e) => handleMint(e)}>Mint Collection</button>
            </div>}
        </div> : <div className="nometamask">
            <ConnectWeb3 mm={true} />
            <p>You need too connect with metamask</p>
        </div>}
        <GoBack />
    </div>
}

export default MintCollection