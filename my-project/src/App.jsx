import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './Pages/Home'
import ProductListing from './Pages/ProductListing'

function App() {

  return (
    <>
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path={"/"} exact={true} element={<Home/>} />
        <Route path={"/productListing"} exact={true} element={<ProductListing/>} />
      </Routes>
      <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
