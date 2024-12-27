import axios from 'axios';
import { VITE_PINATA_API_KEY, VITE_PINATA_API_SECRET } from '../utils/config';

const checkKeys = () => { console.log(VITE_PINATA_API_KEY, VITE_PINATA_API_SECRET) }

const pinFile = async (file: File | Blob) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

    const formData = new FormData();
    formData.append('file', file);

    const headers = {
        'Content-Type': 'multipart/form-data',
        pinata_api_key: VITE_PINATA_API_KEY,
        pinata_secret_api_key: VITE_PINATA_API_SECRET,
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
        pinata_api_key: VITE_PINATA_API_KEY,
        pinata_secret_api_key: VITE_PINATA_API_SECRET,
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
        pinata_api_key: VITE_PINATA_API_KEY,
        pinata_secret_api_key: VITE_PINATA_API_SECRET,
    };

    try {
        const response = await axios.delete(url, { headers });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const fetchIPFSJSON = async (cid: string, timeout = 3000) => {
    const pureCid1 = cid.replace("ipfs://", "");
    const pureCid = pureCid1.replace("/", "");
    const gateways = [
      `https://ipfs.io/ipfs/${pureCid}`,
      `https://gateway.pinata.cloud/ipfs/${pureCid}`
    ];
  
    // console.log("Trying gateways:", gateways);
  
    for (const gatewayURL of gateways) {
      try {
        const source = axios.CancelToken.source();
        const timer = setTimeout(() => {
          source.cancel(`Request timed out after ${timeout} ms`);
        }, timeout);
  
        // console.log(`Fetching: ${gatewayURL}`);
        const response = await axios.get(gatewayURL, {
          cancelToken: source.token,
          headers: { Accept: "application/json" },
        });
        clearTimeout(timer);
        if (response.status === 200) {
          return response.data; 
        }
      } catch (error: any) {
        // console.error(`Error fetching from ${gatewayURL}:`, error.message);
      }
    }
  
    throw new Error("All gateways failed to fetch the file.");
};

const makeImgURL = (ipfsUrl: string) => {
    const pureCid = ipfsUrl.replace("ipfs://", "")
    const gatewayUrl = `https://gateway.pinata.cloud/ipfs/${pureCid}`
    return gatewayUrl 
};

export default { checkKeys, pinFile, pinJSON, unpin, fetchIPFSJSON, makeImgURL }