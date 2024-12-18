import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { addListener } from "../service/provider";
import metafetcher from "../service/metafetcher";

const mainAddress = import.meta.env.VITE_MINIMINT_MAIN_CONTRACT

interface AppContextType {
  web3: any;
  setWeb3: (web3: any) => void;
  items: any,
  setItems: (web3: any) => void;
  // collections: any;
  // setCollections: (colls: any) => void;
  // nfts: any;
  // setNfts: (nfts: any) => void;
  status: string;
  setStatus: (string: any) => void;
  loading: boolean;
  setLoading: (boolean: any) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [web3, setWeb3] = useState<any>(null)
    const [items, setItems] = useState<any>(null)
    // const [collections, setCollections] = useState<any>(null)
    // const [nfts, setNfts] = useState<any>(null)
    const [status, setStatus] = useState<any>(null)
    const [loading, setLoading] = useState<any>(false)

    useEffect(() => {
      console.log(status)
    }, [status, loading])

    useEffect(() => {
        const getCollections = async () => {
          setLoading(true)
          const test = await metafetcher.initMinimint(web3, mainAddress)
          console.log('CONTEXT', test)
          setItems(test)
          setLoading(false)
          // setCollections([test.collection])
          // setNfts(test.nfts)
        }
        if(web3) getCollections()
        console.log('Context:', web3)
        addListener(setStatus)
    }, [web3])

    const contextValue = {
        web3,
        setWeb3,
        items,
        setItems,
        // collections,
        // setCollections,
        // nfts,
        // setNfts,
        status,
        setStatus,
        loading,
        setLoading
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