import { useEffect, useState } from "react"
import Modal from "../../display/modal/Modal"
import ipfs from "../../../service/ipfs"
import './metadata.css'

interface IMetadata {
    name: string,
    description: string,
    imageURI: string | File
}

interface ICids {
    imgCid: string,
    jsonCid: string
}

const Metadata = ({className, height, cids, setCids, mint}: {className: string, height: string, cids: ICids | null, setCids: (value: ICids | null) => void, mint: ()=>void}) => {
    const [process, setProcess] = useState<boolean>(false)
    const [del, setDel] = useState<boolean>(false)
    const [status, setStatus] = useState<any>(null)
    const [imgURL, setImgURL] = useState<any>('none')
    const [nftMeta, setNftMeta] = useState<IMetadata>({
        name: '',
        description: '',
        imageURI: ''
    })
    useEffect(() => {
        const handleProcess = async () => {
            console.log(process)
            setStatus('Process')
            const {name, description, imageURI} = nftMeta;
            if(name !== '' && description !== '' && imageURI instanceof File){
                setStatus('Process image cid...')
                const imgCid = await ipfs.pinFile(imageURI)
                nftMeta.imageURI = 'ipfs://' + imgCid.IpfsHash
                console.log('META DATA', nftMeta)
                if(imgCid) {
                    setStatus('Process json cid...')
                    const jsonCid = await ipfs.pinJSON(nftMeta)

                    const newCid = { imgCid: 'ipfs://' + await imgCid.IpfsHash, jsonCid: 'ipfs://' + await jsonCid.IpfsHash}
                    setStatus(`Success: Img: ${newCid.imgCid} - JSON: ${newCid.jsonCid}_`)
                    console.log(jsonCid)
                    setCids(newCid)
                    setProcess(false)
                    // setCids( newCid )//{ ...cids, ['imgCid']: await imgCid.IpfsHash, ['jsonCid']: await jsonCid.IpfsHash})
                }
            } else {
                setStatus('Something is missing..._')
                setProcess(false)
            }
        }
        if(process) handleProcess()
    }, [process])
    useEffect(() => {
        const handleDelete = async () => {
            setStatus('Deleteing CIDs')
            if(cids){
                const resetImg = await ipfs.unpin(cids.imgCid)
                const resetJson = await ipfs.unpin(cids.jsonCid)
                console.log('Image reset: ', resetImg)
                console.log('JSON reset: ', resetJson)
                if(resetImg === 'OK' && resetJson === 'OK'){
                    setStatus('CIDs has been deleted_')
                }
                setCids(null)
                setDel(false)
            } else {
                setStatus('No Cids_')
                setDel(false)
            }
        }
        if(del) handleDelete()
    }, [del])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target as HTMLInputElement;
        const files = (e.target as HTMLInputElement).files;
        console.log(className)
        if(files){
            const url = URL.createObjectURL(files[0])
            if(className === 'collmeta'){
                const img =  new Image()
                img.src = url;
                img.onload = () => {
                    const {width, height} = img;
                    console.log(width)
                    if(width >= 3 * height) {
                        setImgURL(url)
                        setNftMeta({ ...nftMeta, ['imageURI']: files[0]})
                    } else {
                        setImgURL(null)
                        setStatus('The width of the banner needs too be 3 times the size of the height._')
                    }
                }
            } else {
                setImgURL(url)
                setNftMeta({ ...nftMeta, ['imageURI']: files[0]})
            }
        } else {
            setNftMeta({ ...nftMeta, [name]: value})
        }
    }

    const displayUrl = imgURL
    const handleProcess = (e: any) => {
        e.preventDefault()
        setProcess(true)
    }
    const handleDelete = (e: any) => {
        e.preventDefault()
        setNftMeta({
            name: '',
            description: '',
            imageURI: ''
        })
        setImgURL(null)
        setDel(true)
    }

    return <div className={`metadata ${className}`}>
        {status && <Modal status={status} setStatus={setStatus} />}
        <form>
            <div className="meta-image" style={{backgroundImage: `url(${displayUrl})`, height: `${height}`}}>
                <input type="file" name="image-file" className="image-file" onChange={handleChange} />
            </div>

            <div className="meta-info">
                <p>Click to add image</p>
                <input type="text" className='name' value={nftMeta.name} name='name' onChange={handleChange} placeholder='Name' />
                <textarea className='description' value={nftMeta.description} name='description' onChange={handleChange} placeholder='Description' />
            </div>
        </form>
        {!cids ? 
        <button style={{bottom: cids ? '0' : '30px'}} onClick={(e) => handleProcess(e)}>Process</button> : 
        <div>
            <button onClick={mint}>mint</button>
            <button style={{bottom: cids ? '0' : '30px'}} onClick={(e) => handleDelete(e)}>Reset</button>
        </div>}
    </div>
}

export default Metadata

//  cids ? 'none' : 'flex'}}>

// style={{height: cids ? '40px' : height}}>