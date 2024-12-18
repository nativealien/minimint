interface Window{
    ethereum?: {
        isMetaMask?: boolean;
        request: ({method: string}) => Promise<string[]>;
        on: (string, any) => void;
        removeListener: any;
    } | any
}

interface IMeta {
    name: string;
    description: string;
    address: string;
    owner: string;
    image: string;
    type: string;
}

interface INFTMeta extends IMeta {
    tokenId: any;
    listing: {
        list: boolean;
        wei: bigint;
        eth: number;
    }
}

interface ICollMeta {
    collection: IMeta;
    nfts: INFTMeta[] | [];
}