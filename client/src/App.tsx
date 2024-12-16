import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAppContext } from "./context/context";
import Header from "./pages/parts/Header";
import Footer from "./pages/parts/Footer";
import Navbar from "./pages/parts/Navbar";
import { connectProvider } from "./service/provider";
import './app.css'

function App() {
  const { web3, setWeb3 } = useAppContext()
  useEffect(() => {
    const connectInfura = async () => {
      const infura = await connectProvider(false)
      setWeb3(infura)
    }
    if(!web3) connectInfura()

    console.log('APP', web3)
  }, [web3])

  return <div className="app">
    <Header />
    <Navbar />
    <main><Outlet/></main>
    <Footer />
  </div>
}

export default App
