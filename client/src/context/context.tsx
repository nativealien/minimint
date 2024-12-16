import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface AppContextType {
  web3: any;
  setWeb3: (web3: any) => void;
  collections: any;
  setCollections: (colls: any) => void;
  nfts: any;
  setNfts: (nfts: any) => void;
  status: string;
  setStatus: (string: any) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [web3, setWeb3] = useState<any>(null)
    const [collections, setCollections] = useState<any>(null)
    const [nfts, setNfts] = useState<any>(null)
    const [status, setStatus] = useState<any>(null)

    useEffect(() => {
        console.log('Context:', web3)
    }, [web3])

    const contextValue = {
        web3,
        setWeb3,
        collections,
        setCollections,
        nfts,
        setNfts,
        status,
        setStatus
    }

    return <AppContext.Provider value={contextValue}>
                {children}
        </AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};