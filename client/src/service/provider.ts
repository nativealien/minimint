import { ethers } from "ethers";

const infura = import.meta.env.VITE_INFURA_ENDPOINT

export const connectProvider = async (metamask: boolean ): Promise<IWeb3 | string> => {
    if(window.ethereum && metamask){
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const sign = await signer.signMessage('Connect?')
        if (sign) {
            const address = await signer.getAddress()
            return { provider, signer, address }
        } else { return 'Signature failed...' }
    } else {
        const provider = new ethers.JsonRpcProvider(infura);
        return { provider }
    }
}

export const addListener = (
    // setWeb3: React.Dispatch<React.SetStateAction<any>>,
    setStatus: React.Dispatch<React.SetStateAction<string>>
    // setChain: React.Dispatch<React.SetStateAction<string | null>>,
    // setConnected: React.Dispatch<React.SetStateAction<boolean>>
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
