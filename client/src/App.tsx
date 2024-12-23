import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppContext } from "./context/context";
import { connectProvider } from "./service/provider";
import Modal from "./components/display/modal/Modal";
import Header from "./pages/parts/header/Header";
import Footer from "./pages/parts/footer/Footer";
import factory from "./service/blockchain/factory";
import './app.css'

factory.checkAddressess()

function App() {
  const { web3, setWeb3, status, setStatus } = useAppContext()
  useEffect(() => {
    const connectInfura = async () => {
      const infura = await connectProvider(false, setStatus)
      if(typeof infura === "string"){
        setStatus(infura)
      } else {
        setWeb3(infura)
      }
    }
    if(!web3) connectInfura()
  }, [web3])

  return <div className="app">
    {status && <Modal status={status} setStatus={setStatus} />}
    <div className="top">
      <Header />
    </div>
    <main><Outlet/></main>
    <Footer />
  </div>
}

export default App
