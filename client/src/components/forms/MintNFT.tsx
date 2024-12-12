import { useState } from "react"
import ipfs from '../../service/ipfs'

interface INftMetadata {
    name: string,
    description: string,
    imageURI: string | File
}

interface ICids {
    imgCid: string,
    jsonCid: string
}

const MintNFT = () => {
    const [cids, setCids] = useState<ICids>({
        imgCid: '',
        jsonCid: ''
    })
    const [nftMeta, setNftMeta] = useState<INftMetadata>({
        name: '',
        description: '',
        imageURI: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target as HTMLInputElement;
        const files = (e.target as HTMLInputElement).files;
        console.log(name, value, files);
        if(files){
            const test = value.split('\\')[2]
            console.log(test)
            setNftMeta({ ...nftMeta, ['imageURI']: files[0]}) // [name]: files[0], 
        } else {
            setNftMeta({ ...nftMeta, [name]: value})
        }
    }

    const handleMint = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        const {name, description, imageURI} = nftMeta;
        if(name !== '' && description !== '' && imageURI instanceof File){
            const imgCid = await ipfs.pinFile(imageURI)
            console.log(imgCid)
            if(imgCid) {
                const jsonCid = await ipfs.pinJSON(nftMeta)
                console.log(jsonCid)
                setCids({ ...cids, ['imgCid']: await imgCid.IpfsHash, ['jsonCid']: await jsonCid.IpfsHash})
            }
        } else {
            console.log('Something is missing...')
        }

    }

    const handleReset = async (e: { preventDefault: () => void }) => {
        e.preventDefault()

        const resetImg = await ipfs.unpin(cids.imgCid)
        const resetJson = await ipfs.unpin(cids.jsonCid)

        console.log(resetImg, resetJson)
    }

    return <div className="mintnft">

        <form>
            <div className="nft-image">
                <input type="file" name="image-file" className="image-file" onChange={handleChange} />
            </div>

            <div className="nft-info">
                <input type="text" className='name' value={nftMeta.name} name='name' onChange={handleChange} placeholder='Name' />
                <textarea className='description' value={nftMeta.description} name='description' onChange={handleChange} placeholder='Description' />
            </div>

            <div className="mint-btns">
                <button onClick={(e) => handleMint(e)}>Mint</button>
                <button onClick={(e) => handleReset(e)}>Delete</button>
            </div>

        </form>

        {cids.imgCid !== '' && <a href={`${ipfs.makeImgURL(cids.imgCid)}`}>Img</a>}
        {cids.jsonCid !== '' && <a href={`${ipfs.makeImgURL(cids.jsonCid)}`}>JSON</a>}

    </div>
}

export default MintNFT