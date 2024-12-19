import { useEffect, useState } from "react"
import { useAppContext } from "../context/context"
import Metadata from "../components/forms/Metadata"
import './mintcollection.css'
import ConnectWeb3 from "../components/buttons/ConnectWeb3"

const MintCollection = () => {
    const { web3 } = useAppContext()
    const [collMeta, setCollmeta] = useState<any>(null)
    const [nft1, setNft1] = useState<any>(null)
    const [nft2, setNft2] = useState<any>(null)
    const [nft3, setNft3] = useState<any>(null)
    const [nft4, setNft4] = useState<any>(null)

    useEffect(() => {
        console.log(collMeta)
    }, [collMeta])

    const handleMint = async () => {
        const NFTUris = [
            nft1.jsonCid,
            nft2.jsonCid,
            nft3.jsonCid,
            nft4.jsonCid
        ]
        console.log(collMeta.jsonCid)
        console.log(NFTUris)
    }

    return <div className="mintcollection">
        <h2>Mint Collection</h2>
        <section>
            <p>Mint a collection, Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis dolorum modi eos distinctio ad. Doloribus tempore quia nam, voluptate aliquid possimus velit expedita illo quos cupiditate placeat animi sit veritatis?</p>
        </section>
        {web3 && web3.signer ? <div className="signed">
            {<Metadata className={'collmeta'} height="500px" cids={collMeta} setCids={setCollmeta} />}
            {collMeta && <div className="collnfts">
                <Metadata className={'collnftmeta'} height='400px' cids={nft1} setCids={setNft1} />
                <Metadata className={'collnftmeta'} height='400px' cids={nft2} setCids={setNft2} />
                <Metadata className={'collnftmeta'} height='400px' cids={nft3} setCids={setNft3} />
                <Metadata className={'collnftmeta'} height='400px' cids={nft4} setCids={setNft4} />
            </div>}
            {collMeta && nft1 && nft2 && nft3 && nft4 && <div>
                <button onClick={() => handleMint()}>Mint Collection</button>
                <button>Reset All</button>
            </div>}
        </div> : <div>
            <p>You need too connect with metamask</p>
            <ConnectWeb3 />
        </div>}

    </div>
}

export default MintCollection