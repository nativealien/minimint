import axios from 'axios';

const pinataApiKey = import.meta.env.VITE_PINATA_API_KEY
const pinataSecretApiKey = import.meta.env.VITE_PINATA_API_SECRET

const checkKeys = () => { console.log(pinataApiKey, pinataSecretApiKey) }

const pinFile = async (file: File | Blob) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

    const formData = new FormData();
    formData.append('file', file);

    const headers = {
        'Content-Type': 'multipart/form-data',
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataSecretApiKey,
    };

    try {
        const response = await axios.post(url, formData, { headers });
        return response.data;
    } catch (error) {
        throw error;
    }
};


const pinJSON = async (jsonData: any) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

    const headers = {
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataSecretApiKey,
        'Content-Type': 'application/json',
    };

    try {
        const response = await axios.post(url, jsonData, { headers });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const unpin = async (cid: string) => {
    const pureCid = cid.replace("ipfs://", "")
    const url = `https://api.pinata.cloud/pinning/unpin/${pureCid}`;

    const headers = {
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataSecretApiKey,
    };

    try {
        const response = await axios.delete(url, { headers });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const fetchIPFS = async (cid: string, timeout = 3000) => {
    const pureCid = cid.replace("ipfs://", "")
    console.log(pureCid)
    const gatewayURL = `https://gateway.pinata.cloud/ipfs/${pureCid}`;

    try {
        const source = axios.CancelToken.source();
    
        // Set timeout for the fetch request
        const timer = setTimeout(() => {
          source.cancel(`Request timed out after ${timeout} ms`);
        }, timeout);

        const response = await axios.get(gatewayURL, { cancelToken: source.token });
        // console.log('File fetched:', response.data);
        clearTimeout(timer);
        return response.data;
    } catch (error) {
        // console.error(`Error fetching file with CID ${pureCid}:`, error);
        throw error;
    }
};

const makeImgURL = (ipfsUrl: string) => {
    const pureCid = ipfsUrl.replace("ipfs://", "")
    const gatewayUrl = `https://gateway.pinata.cloud/ipfs/${pureCid}`
    return gatewayUrl 
};

export default { checkKeys, pinFile, pinJSON, unpin, fetchIPFS, makeImgURL }