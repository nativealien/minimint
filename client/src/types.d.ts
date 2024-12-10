interface Window{
    ethereum?: {
        isMetaMask?: boolean;
        request: ({method: string}) => Promise<string[]>;
        on: (string, any) => void;
        removeListener: any;
    } | any
}