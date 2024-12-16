import { ethers } from "ethers";

const infura = import.meta.env.VITE_INFURA_ENDPOINT

// export const checkLocalChain = async (): Promise<boolean> => {
//     try {
//         const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545');
//         const block = await provider.getBlockNumber();
//         console.log(`Local chain running. Block count ${block}`)
//         return true
//     } catch (error) {
//         console.log('Local chain offline...')
//         return false
//     }
// }

export const connectProvider = async (metamask: boolean) => {
    if(window.ethereum && metamask){
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const sign = await signer.signMessage('Connect?')
        if (sign) {
            return { provider, signer }
        } else { return 'Signature failed...' }
    } else {
        const provider = new ethers.JsonRpcProvider(infura);
        return { provider }
    }
}

export const addListener = (
    setAccount: React.Dispatch<React.SetStateAction<string>>,
    setChain: React.Dispatch<React.SetStateAction<string | null>>,
    setConnected: React.Dispatch<React.SetStateAction<boolean>>
) => {
    if (window.ethereum) {
        window.ethereum.on("accountsChanged", (accounts: string[]) => {
            console.log("Accounts changed:", accounts);
            setAccount(accounts[0]);
            setConnected(accounts.length > 0);
        });

        window.ethereum.on("chainChanged", (chainId: string) => {
            console.log("Network changed to:", chainId);
            setChain(chainId);
        });

        window.ethereum.on("disconnect", (error: any) => {
            console.log("Disconnected:", error);
            setAccount('');
            setChain('');
            setConnected(false);
        });

        console.log("Event listeners added for provider.");
    } else {
        console.error("No Ethereum provider detected.");
    }
};
