import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./pages/parts/Header";
import Footer from "./pages/parts/Footer";
import Navbar from "./pages/parts/Navbar";
import { checkLocalChain } from "./service/provider";
import erc721 from './service/blockchain/ERC721'
import factory from './service/blockchain/factory'
import market from './service/blockchain/marketplace'
// import ipfs from './service/ipfs'
import './app.css'

function App() {
  const [wallet, setWallet] = useState<any>(null)
  const [local, setLocal] = useState<boolean>(false)
  const [status, setStatus] = useState<string>('')
  useEffect(() => {

    const checkContracts = async () => {
      if(wallet){
        const address = await wallet.signer.getAddress()
        const uri = await erc721.getContractMetadataURI(wallet.provider)
        const tokenId = await erc721.getNextTokenId(wallet.signer)
        console.log(uri, address)
        console.log(tokenId)
  
        const colls = await factory.getAllCollections(wallet.provider)
        console.log(colls)
        const isWhitelist = await factory.isUserWhitelisted(wallet.provider, address)
        console.log(isWhitelist)

      } else {
        console.log('No connection to metamask...')
      }
    }
    checkContracts()

  
    const checkLocal = async () => {
      const check = await checkLocalChain()
      setLocal(check)
    }
    checkLocal()
  }, [wallet])



  return <div className="app">
    <Header />
    <Navbar />
    <main><Outlet context={{local, wallet, setWallet, status, setStatus}} /></main>
    <Footer />
  </div>
}

export default App
