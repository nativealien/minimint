import { useState } from "react"
import { useAppContext } from "../../context/context"

import Metadata from "../../components/forms/metadata/Metadata"
import ConnectWeb3 from "../../components/buttons/connectweb3/ConnectWeb3"
import GoBack from "../../components/buttons/goback/GoBack"
import Section from "../../components/display/section/Section"

import factory from "../../service/blockchain/factory"
import metafetcher from "../../service/metafetcher"
import ipfs from "../../service/ipfs"

import mintcollection from '../../content/mintcollection.md?raw'
import './mintcollection.css'

const MintCollection = () => {
    const { web3, setStatus } = useAppContext()
    const [collMeta, setCollmeta] = useState<any>(null)

    const handleMint = async () => {
        setStatus('Minting collection, dont leave the page.')
        try {
            const coll = await ipfs.fetchIPFSJSON(collMeta.jsonCid)
            const collUri = collMeta.jsonCid
            const res = await factory.deployCollection(web3?.signer, coll.name, 'MM',collUri)
            console.log(res)
            setStatus('Collection minted!_')
            if(web3){
                await metafetcher.initMinimint(web3, setStatus)
            }
            return true
        } catch (error) {
            setStatus('Minting error_')
            return false
        }
    }

    return <div className="mintcollection">
        <Section markdown={mintcollection} />
        {web3 && web3.signer ? <div className="signed">
            {<Metadata className={'collmeta'} height="200px" cids={collMeta} setCids={setCollmeta} mint={handleMint}/>}
            {collMeta && <div className="mintcoll-btn">
                {/* <button onClick={(e) => handleMint(e)}>Mint Collection</button> */}
            </div>}
        </div> : <div className="nometamask">
            <ConnectWeb3 />
            <p>You need too connect with metamask</p>
        </div>}
        <GoBack />
    </div>
}

export default MintCollection