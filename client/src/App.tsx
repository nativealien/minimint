import { Outlet } from "react-router-dom";
import Header from "./pages/parts/header/Header";
import Footer from "./pages/parts/footer/Footer";
import './app.css'


function App() {

  return <div className="app">
    <div className="top">
      <Header />
    </div>
    <main><Outlet/></main>
    <Footer />
  </div>
}

export default App
