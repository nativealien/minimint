import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { addListener } from "../service/provider";
import metafetcher from "../service/metafetcher";

const AppContext = createContext<IAppContext | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [web3, setWeb3] = useState<IWeb3 | null>(null)
    const [items, setItems] = useState<ICollMeta[] | null>(null)
    const [status, setStatus] = useState<string | null>(null)
    const [theme, setTheme] = useState(() => {
      return localStorage.getItem("theme") || "light";
    })

    useEffect(() => {
      if(status === 'acc-change'){
        console.log('hej')
      }
    }, [status])

    useEffect(() => {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }, [theme])

    useEffect(() => {
        const getCollections = async (newWeb3: IWeb3) => {
          const test: any = await metafetcher.initMinimint(newWeb3, setStatus)
          setItems(test)
          setStatus('Minimint is now connected!_')
        }
        if(web3 && !items) getCollections(web3)
        addListener(setStatus, setWeb3)
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

    const toggleTheme = () => {
      setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    }

    const contextValue = {
        web3,
        setWeb3,
        items,
        setItems,
        status,
        setStatus,
        reloadItems,
        theme,
        toggleTheme
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