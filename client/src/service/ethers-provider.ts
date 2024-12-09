import { ethers } from "ethers";

export const checkLocalChain = async (): Promise<boolean> => {
    try {
        const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545');
        const block = await provider.getBlockNumber();
        console.log(`Local chain running. Block count ${block}`)
        return true
    } catch (error) {
        console.log('Local chain offline...')
        return false
    }
}