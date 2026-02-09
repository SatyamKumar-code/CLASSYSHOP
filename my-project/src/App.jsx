import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './Pages/Home'
import ProductListing from './Pages/ProductListing'
import { ProductDetails } from './Pages/ProductDetails'
import { createContext } from 'react'

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { ProductZoom } from './components/ProductZoom'
import { IoCloseSharp } from 'react-icons/io5'
import { ProductDetailsComponent } from './components/ProductDetails'
import Login from './Pages/Login'
import Register from './Pages/Register'
import CartPage from './Pages/Cart'
import Verify from './Pages/Verify'
import ForgotPassword from './Pages/ForgotPassword'
import MyAccount from './Pages/MyAccount'

import toast, { Toaster } from 'react-hot-toast';
import Checkout from './Pages/Checkout'
import MyList from './Pages/MyList'
import Orders from './Pages/Orders'
import { fetchDataFromApi, postData } from './utils/api'
import Address from './Pages/MyAccount/address'



const MyContext = createContext();

function App() {

  const [openProductDetailsModal, setOpenProductDetailsModal] = useState({
    open: false,
    item: {}
  });
  const [maxWidth, setMaxWidth] = useState('lg');
  const [fullWidth, setFullWidth] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [catData, setCatData] = useState([]);
  const [cartData, setCartData] = useState([]);


  const [openCartPanel, setOpenCartPanel] = useState(false);

  const handleOpenProductDetailModel = (status, item) => {
    setOpenProductDetailsModal({
      open: status,
      item: item 
    });
  };
  

  const handleCloseProductDetailsModal = () => {
    setOpenProductDetailsModal({
      open: false,
      item: {} 
    });
  };

  const toggleCartPanel = (newOpen) => () => {
    setOpenCartPanel(newOpen);
  }

  useEffect(() => {
    const token = localStorage.getItem("accesstoken");

    if(token !== undefined && token !== null && token !== ""){
      setIsLogin(true);

      fetchDataFromApi(`/api/user/user-details`).then((res) => {
        if(res?.response?.data?.error === true){
          if(res?.response?.data?.message === "You have not login"){
            localStorage.removeItem("accesstoken");
            localStorage.removeItem("refreshtoken");

            alertBox("error", "Session expired. Please login again.");

            window.location.href = "/login";

            setIsLogin(false);
            return;
          }
        }
        
        setUserData(res.data);
        getCartItems();
      })

    }else{
      setIsLogin(false);
    }
  }, [isLogin]);

  useEffect(() => {
    fetchDataFromApi("/api/category").then((res) => {
      if(res?.error === false) {
        setCatData(res?.categories);
      }
    })
  }, []);

  const alertBox = (type, msg) => {
    if(type === "Success"){
      toast.success(msg)
    }
    if(type === "error"){
      toast.error(msg);
    }
  }

  const addToCart = (product, quantity) => {
    if(!isLogin){
      alertBox("error", "You are not logged in. Please login first");
      return false;
    }

    const id = userData?._id;

    const data = {
      productTitle: product?.name,
      image: product?.images?.[0],
      rating: product?.rating,
      quantity: quantity,
      price: product?.price,
      subTotal: Math.round(product?.price * quantity * 100) / 100,
      countInStock: product?.countInStock,
      productId: product?._id,
      userId: id,
      
    }

    postData("/api/cart/add", data).then((res) => {
      if(res?.error !== false){
        alertBox("error", res?.message);
        return false;
      }
      alertBox("Success", res?.message);

      getCartItems();
      
    }).catch((error) => {
      alertBox("error", error?.message || "Failed to add to cart");
    })
    
  }

  const getCartItems = () => {
    fetchDataFromApi(`/api/cart/get`).then((res) => {
      if (res?.error === false) {
        setCartData(res?.data);
      }
    })
  }

  const values = {
    setOpenProductDetailsModal,
    handleOpenProductDetailModel,
    setOpenCartPanel,
    toggleCartPanel,
    openCartPanel,
    alertBox,
    isLogin,
    setIsLogin,
    setUserData,
    userData,
    setCatData,
    catData,
    addToCart,
    cartData,
  }

  return (
    <>
      <BrowserRouter>
      <MyContext.Provider value={values}>
      <Header />
      <Routes>
        <Route path={"/"} exact={true} element={<Home/>} />
        <Route path={"/products"} exact={true} element={<ProductListing/>} />
        <Route path={"/product/:id"} exact={true} element={<ProductDetails/>} />
        <Route path={"/login"} exact={true} element={<Login/>} />
        <Route path={"/register"} exact={true} element={<Register/>} />
        <Route path={"/cart"} exact={true} element={ <CartPage />} />
        <Route path={"/verify"} exact={true} element={ <Verify />} />
        <Route path={"/forgot-password"} exact={true} element={ <ForgotPassword />} />
        <Route path={"/checkout"} exact={true} element={ <Checkout />} />
        <Route path={"/my-account"} exact={true} element={ <MyAccount />} />
        <Route path={"/my-list"} exact={true} element={ <MyList />} />
        <Route path={"/my-orders"} exact={true} element={ <Orders />} />
        <Route path={"/address"} exact={true} element={ <Address />} />
        
      </Routes>
      <Footer />
      </MyContext.Provider>
      </BrowserRouter>

      <Toaster />

      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={openProductDetailsModal.open}
        onClose={handleCloseProductDetailsModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className='productDetailsModal'
      >
        
        <DialogContent>
          <div className='flex items-center wfull productDetailsModalContainer relative'>
            <Button className='!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000] !absolute top-[15px] right-[15px] !bg-[#f1f1f1]' 
            onClick={handleCloseProductDetailsModal}><IoCloseSharp className='text-[20px]' /></Button>
            {
              openProductDetailsModal?.item?.length !== 0 &&
              <>
                <div className='col1 w-[40%] px-3 py-8'>
                  <ProductZoom images={openProductDetailsModal?.item?.images} />
                </div>

                <div className='col2 w-[60%] py-8 px-8 pr-16 productContent'>
                  <ProductDetailsComponent item={openProductDetailsModal?.item} />
                </div>
              </>
            }
          </div>
        </DialogContent>
      </Dialog>


     
    </>
  )
}

export default App;
export { MyContext };
