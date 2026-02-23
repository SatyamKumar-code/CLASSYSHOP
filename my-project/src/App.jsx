import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import "./responsive.css"
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './Pages/Home'
import ProductListing from './Pages/ProductListing'
import { ProductDetails } from './Pages/ProductDetails'
import { createContext } from 'react'


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
import OrderSuccess from './Pages/Orders/success'
import OrderFailed from './Pages/Orders/failed'
import SearchPage from './Pages/Search'



const MyContext = createContext();

function App() {

  const [openProductDetailsModal, setOpenProductDetailsModal] = useState({
    open: false,
    item: {}
  });
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [catData, setCatData] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [myListData, setMyListData] = useState([]);


  const [openCartPanel, setOpenCartPanel] = useState(false);
  const [openAddressPanel, setOpenAddressPanel] = useState(false);

  const [addressMode, setAddressMode] = useState("add");
  const [addressId, setAddressId] = useState('');

  const [searchData, setSearchData] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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

  const toggleAddressPanel = (newOpen) => () => {
    if(newOpen == false){
      setAddressMode("add");
    }
    setOpenAddressPanel(newOpen);
  }

  useEffect(() => {
    const token = localStorage.getItem("accesstoken");

    if(token !== undefined && token !== null && token !== ""){
      setIsLogin(true);

      

      getCartItems();
      getMyListData();
      getUserDetails();

    }else{
      setIsLogin(false);
    }
  }, [isLogin]);

  const getUserDetails = () => {
    fetchDataFromApi(`/api/user/user-details`).then((res) => {
      if (res?.response?.data?.error === true) {
        if (res?.response?.data?.message === "You have not login") {
          localStorage.removeItem("accesstoken");
          localStorage.removeItem("refreshtoken");

          alertBox("error", "Session expired. Please login again.");

          window.location.href = "/login";

          setIsLogin(false);
          return;
        }
      }

      setUserData(res.data);

    }).catch((err) => {
      alertBox("error", err?.message || "Failed to fetch user details");
    })
  }

  useEffect(() => {
    fetchDataFromApi("/api/category").then((res) => {
      if(res?.error === false) {
        setCatData(res?.categories);
      }
    })
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };

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
      image: product?.image,
      rating: product?.rating,
      quantity: quantity,
      price: product?.price,
      oldPrice: product?.oldPrice,
      discount: product?.discount,
      subTotal: Math.round(product?.price * quantity * 100) / 100,
      countInStock: product?.countInStock,
      productId: product?._id,
      brand: product?.brand,
      size: product?.size,
      weight: product?.weight,
      ram: product?.ram
      
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

  const getMyListData = () => {
    fetchDataFromApi(`/api/mylist/`).then((res) => {
      if (res?.error === false) {
        setMyListData(res?.data);
      }
    }).catch((error) => {
      alertBox("error", error?.message || "Failed to fetch wishlist items");
    })
  }

  

  const values = {
    openProductDetailsModal,
    setOpenProductDetailsModal,
    handleOpenProductDetailModel,
    handleCloseProductDetailsModal,
    setOpenCartPanel,
    toggleCartPanel,
    openCartPanel,
    setOpenAddressPanel,
    toggleAddressPanel,
    openAddressPanel,
    alertBox,
    isLogin,
    setIsLogin,
    setUserData,
    userData,
    setCatData, 
    catData,
    addToCart,
    cartData,
    setCartData,
    getCartItems,
    myListData,
    setMyListData,
    getMyListData,
    getUserDetails,
    addressMode,
    setAddressMode,
    addressId,
    setAddressId,
    searchData,
    setSearchData,
    windowWidth
    
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
        <Route path={"/order/success"} exact={true} element={ <OrderSuccess />} />
        <Route path={"/order/failed"} exact={true} element={ <OrderFailed />} />
        <Route path={"/address"} exact={true} element={ <Address />} />
        <Route path={"/search"} exact={true} element={ <SearchPage />} />
        
      </Routes>
      <Footer />
      </MyContext.Provider>
      </BrowserRouter>

      <Toaster />

      


     
    </>
  )
}

export default App;
export { MyContext };
