import { ethers } from "ethers";

const infura = import.meta.env.VITE_INFURA_ENDPOINT

export const connectProvider = async (metamask: boolean, setStatus: (status: string | null) => void ): Promise<IWeb3 | string> => {
    if (window.ethereum && metamask) {
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
        const provider = new ethers.JsonRpcProvider(infura);
        return { provider };
      }
}

export const addListener = (
    setStatus: React.Dispatch<React.SetStateAction<string | null>>
) => {
    if (window.ethereum) {
        window.ethereum.on("accountsChanged", (accounts: string[]) => {
            setStatus(`Accounts changed: ${accounts[0]}`);
        });

        window.ethereum.on("chainChanged", (chainId: string) => {
            setStatus(`Network changed to: ${chainId}`);
        });

        window.ethereum.on("disconnect", (error: any) => {
            setStatus(`Disconnected: ${error}`);
        });

        console.log("Event listeners added for provider.");
    } else {
        console.error("No Ethereum provider detected.");
    }
};
