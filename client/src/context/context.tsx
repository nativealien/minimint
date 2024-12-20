import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { addListener } from "../service/provider";
import metafetcher from "../service/metafetcher";

const AppContext = createContext<IAppContext | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [web3, setWeb3] = useState<IWeb3 | null>(null)
    const [items, setItems] = useState<ICollMeta[] | null>(null)
    const [status, setStatus] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
      if(loading) {
        setStatus('loading')
      } else setStatus(null)
    }, [loading])

    useEffect(() => {
        const getCollections = async (newWeb3: IWeb3) => {
          setLoading(true)
          const test: any = await metafetcher.initMinimint(newWeb3, setStatus)
          setItems(test)
          setLoading(false)
        }
        if(web3) getCollections(web3)
        addListener(setStatus)
    }, [web3])

    const reloadItems: (contract: string, collName: string, tokenId: string) => Promise<INFTMeta | undefined> = async (contract, collName, tokenId) => {
      if(web3 && items){
        const newNfts = await metafetcher.processNFTs(web3, contract, collName, setStatus)
        items.map(item => {
          if(item.name === collName){
            item.nfts = newNfts
          }
        })
        const nft = newNfts.filter(item => item.tokenId === tokenId)[0]
        return nft
      }
    }

    const contextValue = {
        web3,
        setWeb3,
        items,
        setItems,
        status,
        setStatus,
        loading,
        setLoading,
        reloadItems
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