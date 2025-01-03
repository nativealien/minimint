import { ethers } from "ethers";

import { VITE_INFURA_ENDPOINT } from '../utils/config'

const sepoliaChainId = "0xaa36a7";

const setSepolia = async (setStatus: (status: string | null) => void) => {
  const currentChainId = await window.ethereum.request({ method: "eth_chainId" });
  if (currentChainId !== sepoliaChainId) {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: sepoliaChainId }],
    });
    setStatus('Network switched to Sepolia_')
  }
}

const removeListener = (setWeb3: (web3: IWeb3) => void) => {
  if(window.ethereum){
    console.log('Listeners removed!')
    window.ethereum.removeListener("accountsChanged", async () => { 
          console.log('NEW ACCOUNT!')
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          setWeb3({ provider, signer, address })
    });
  }

}

const addListener = async (setWeb3: (web3: IWeb3) => void) => {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", async () => { 
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setWeb3({ provider, signer, address })
    });
  }
}

const connectProvider = async (metamask: boolean, setStatus: (status: string | null) => void, setWeb3: (web3: IWeb3) => void) => {
  if(metamask) {
    setStatus('Connecting...')
    await setSepolia(setStatus)
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    setStatus('Sign connect...')
    try {
      const signature = await signer.signMessage('Do you want to connect to MiniMint?')
      if(signature) {
        await addListener(setWeb3)
        setWeb3({ provider, signer, address });
        setStatus('Metamask connected_')
      }else setStatus('Signature failed..._')

    } catch (error: any) {
      if (error.code === 4001) {
        setStatus("An error occurred 4001_");
      } else {
        setStatus("Signature failed_");
      }
    } 
  } else {
    removeListener(setWeb3)
    const provider = new ethers.JsonRpcProvider(VITE_INFURA_ENDPOINT);
    setWeb3({ provider });
  }
}

export default connectProvider


