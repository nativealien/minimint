import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./pages/parts/Header";
import Footer from "./pages/parts/Footer";
import Navbar from "./pages/parts/Navbar";
import { checkLocalChain } from "./service/provider";
import erc721 from './service/blockchain/ERC721'
import ipfs from './service/ipfs'
import './app.css'

function App() {
  const [wallet, setWallet] = useState<any>(null)
  const [local, setLocal] = useState<boolean>(false)
  const [status, setStatus] = useState<string>('')
  useEffect(() => {
    if(wallet){
      const uri = erc721.getContractMetadataURI(wallet.provider)
      const tokenId = erc721.getNextTokenId(wallet.signer)
      console.log(uri)
      console.log(tokenId)
    }
    const checkLocal = async () => {
      const check = await checkLocalChain()
      setLocal(check)
    }
    checkLocal()
  })



  return <div className="app">
    <Header />
    <Navbar />
    <main><Outlet context={{local, wallet, setWallet, status, setStatus}} /></main>
    <Footer />
  </div>
}

export default App
