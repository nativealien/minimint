import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import metafetcher from "../service/metafetcher";
// import factory from '../service/blockchain/factory'
// import erc721 from '../service/blockchain/ERC721'

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
        const getCollections = async () => {
          const test = await metafetcher.initMarketplace(web3)
          setCollections([test.collection])
          setNfts(test.nfts)
            // const colls = await factory.getAllCollections(web3.provider)
            // console.log(colls)
            // const erc = await erc721.getContractMetadataURI(web3.provider)
            // const tokenIds = await erc721.getAllMintedTokens(web3.provider)
            // const token = await erc721.getTokenURI(1,web3.provider)
        }
        if(web3) getCollections()
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