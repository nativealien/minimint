import { ethers } from "ethers";

import { VITE_INFURA_ENDPOINT } from '../utils/config'

const sepoliaChainId = "0xaa36a7";

export const connectProvider = async (metamask: boolean, setStatus: (status: string | null) => void ): Promise<IWeb3 | string> => {
      if (window.ethereum && metamask) {
        const currentChainId = await window.ethereum.request({ method: "eth_chainId" });
        console.log(currentChainId)
        if(currentChainId !== sepoliaChainId){
          setStatus('Network switch to Sepolia')
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: sepoliaChainId }],
          });
        }
        setStatus('Connecting...')
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        try {
          setStatus('Sign to connect...')
          const sign = await signer.signMessage("Connect to MiniMint?");
          if (sign) {
            const address = await signer.getAddress();
            setStatus('You are connected!_')
            return { provider, signer, address }; 
          } else {
            setStatus && setStatus("Signature failed..._");
            return "Signature failed...";
          }
        } catch (error: any) {
          if (error.code === 4001) {
            setStatus && setStatus("User rejected the connection request.");
          } else {
            setStatus && setStatus("An error occurred during signature._");
            console.error("Error during connection:", error);
          }
          return "Error occurred";
        }
      } else {
        setStatus('Connected without wallet_')
        const provider = new ethers.JsonRpcProvider(VITE_INFURA_ENDPOINT);
        return { provider };
      }
}

export const addListener = async (
    setStatus: React.Dispatch<React.SetStateAction<string | null>>,
    web3: IWeb3 | null,
    setWeb3: React.Dispatch<React.SetStateAction<any>>
) => {
    if (window.ethereum) {
        window.ethereum.on("accountsChanged", async () => {
          console.log('TEST', web3)
          const currentChainId = await window.ethereum.request({ method: "eth_chainId" });
          if(web3?.address) {
            if(currentChainId === sepoliaChainId){
              setStatus('Network switch to Sepolia')
              await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: sepoliaChainId }],
              });
            }
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
  
            const adrsString = address.toString()
  
            setWeb3({ provider, signer, address })
            setStatus(`Changed account: ${adrsString.slice(0,4)}...${adrsString.slice(-4)}_`)
          }
        });

        window.ethereum.on("chainChanged", (chainId: string) => {
            setStatus(`Network changed to: ${chainId}`);
            setWeb3(null)
        });

        window.ethereum.on("disconnect", (error: any) => {
            setStatus(`Disconnected: ${error}`);
        });

        console.log("Event listeners added for provider.");
    } else {
        // console.error("No Ethereum provider detected.");
    }
};
