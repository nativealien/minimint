import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./pages/parts/Header";
import Footer from "./pages/parts/Footer";
import Navbar from "./pages/parts/Navbar";
// import { checkLocalChain } from "./service/provider";
// import erc721 from './service/blockchain/ERC721'
// import factory from './service/blockchain/factory'
// import market from './service/blockchain/marketplace'
// import ipfs from './service/ipfs'
import './app.css'

function App() {
  const [web3, setWeb3] = useState<any>(null)
  const [collection, setCollection] = useState<any>(null)
  const [nft, setNft] = useState<any>(null)
  const [status, setStatus] = useState<any>(null)
  const [context, setContext] = useState<object>({
    web3,
    setWeb3,
    collection,
    setCollection,
    nft,
    setNft,
    status,
    setStatus
  })
  useEffect(() => {

    setContext({
      web3,
      setWeb3,
      collection,
      setCollection,
      nft,
      setNft,
      status,
      setStatus
    })

    // const checkContracts = async () => {
      // if(wallet){
      //   const address = await wallet.signer.getAddress()
      //   const uri = await erc721.getContractMetadataURI(wallet.provider)
      //   const tokenId = await erc721.getNextTokenId(wallet.signer)
      //   console.log(uri, address)
      //   console.log(tokenId)



      // } else {
      //   console.log('No connection to metamask...')
      // }
    // }
    // checkContracts()

  
    // const checkLocal = async () => {
    //   const check = await checkLocalChain()
    //   setLocal(check)
    // }
    // checkLocal()
    console.log('APP', web3)
  }, [web3, collection, nft, status])



  return <div className="app">
    <Header />
    <Navbar />
    <main><Outlet context={context} /></main>
    <Footer />
  </div>
}

export default App
