interface Window{
    ethereum?: {
        isMetaMask?: boolean;
        request: ({method: string}) => Promise<string[]>;
        on: (string, any) => void;
        removeListener: any;
    } | any
}

interface IAppContext {
    web3: IWeb3 | null;
    setWeb3: (web3: IWeb3 | null) => void;
    items: ICollMeta[] | null,
    setItems: (items: ICollMeta[]) => void;
    status: string | null;
    setStatus: (status: string | null) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    reloadItems: (contract: string, collName: string, tokenId: string) => Promise<INFTMeta | undefined>;
}

interface IWeb3 {
    provider: ethers.BrowserProvider | ethers.JsonRpcProvider;
    signer?: ethers.Signer;
    address?: string
}

interface IMeta {
    name: string;
    description: string;
    image: string;
    address: string;
    owner: string;
    type: string;
}

interface INFTMeta extends IMeta {
    collName: string
    tokenId: any;
    listing: {
        list: boolean;
        wei: bigint;
        eth: number;
    }
}

interface ICollMeta extends IMeta {
    nfts: INFTMeta[] | undefined;
}