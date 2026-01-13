import React, { useEffect, useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Header from './Components/Header'
import Sidebar from './Components/Sidebar'
import Dashboard from './Pages/Dashboard'
import { createContext } from 'react'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import Products from './Pages/Products'




import HomeSliderBanners from './Pages/HomeSliderBanners'
import CategoryList from './Pages/Categegory'
import SubCategoryList from './Pages/Categegory/subCatList'
import Users from './Pages/Users'
import Orders from './Pages/Orders'
import ForgotPassword from './Pages/ForgotPassword'
import VerifyAccount from './Pages/VerifyAccount'
import ChangePassword from './Pages/ChangePassword'
import { fetchDataFromApi } from './utils/api'
import toast, { Toaster } from 'react-hot-toast';
import Profile from './Pages/Profile'
import ProductDetails from './Pages/Products/productDetails'
import AddRAMS from './Pages/Products/addRAMS'







const MyContext = createContext();


function App() {

  const [isSidebarOpen, setisSidebarOpen] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [address, setAddress] = useState([]);
  const [catData, setCatData] = useState([]);

  const [isOpenFullScreenPanel, setIsOpenFullScreenPanel] = useState({
    open: false,
    Modal: '',
    id: ""
  });


  useEffect(() => {
    const token = localStorage.getItem("accesstoken");

    if (token !== undefined && token !== null && token !== "") {
      setIsLogin(true);

      fetchDataFromApi(`/api/user/user-details`).then((res) => {
        setUserData(res.data);
        if (res?.response?.data?.error === true) {
          if (res?.response?.data?.message === "You have not login") {
            localStorage.removeItem("accesstoken");
            localStorage.removeItem("refreshtoken");

            alertBox("error", "Session expired. Please login again.");

            window.location.href = '/login';

            setIsLogin(false);

          }
        }
      })

    } else {
      setIsLogin(false);
    }
  }, [isLogin]);

  useEffect(() => {
    getCat();
  }, []) // ← Now runs only once on mount

  const getCat = () => {
    fetchDataFromApi("/api/category").then((res) => {
      setCatData(res?.categories);
    })
  }

  const alertBox = (type, msg) => {
    if (type === "Success") {
      toast.success(msg)
    }
    if (type === "error") {
      toast.error(msg);
    }
  }



  const router = createBrowserRouter([
    {
      path: '/',
      exaxt: true,
      element: (
        <>
          <section className='main'>
            <Header />
            <div className='contentMain flex'>
              <div className={`overflow-hidden sidebarWrapper ${isSidebarOpen === true ? 'w-[18%]' : 'w-[0%] opacity-0'} transition-all duration-300`}>
                <Sidebar />
              </div>
              <div className={`contentRight py-4 px-5 ${isSidebarOpen === false ? 'w-[100%]' : 'w-[82%]'} transition-all duration-300`}>
                <Dashboard />
              </div>
            </div>
          </section>
        </>
      ),
    },

    {
      path: '/login',
      exaxt: true,
      element: (
        <>
          <Login />
        </>
      ),
    },

    {
      path: '/sign-up',
      exaxt: true,
      element: (
        <>
          <SignUp />
        </>
      ),
    },

    {
      path: '/forgot-password',
      exaxt: true,
      element: (
        <>
          <ForgotPassword />
        </>
      ),
    },

    {
      path: '/verify-account',
      exaxt: true,
      element: (
        <>
          <VerifyAccount />
        </>
      ),
    },
    {
      path: '/change-password',
      exaxt: true,
      element: (
        <>
          <ChangePassword />
        </>
      ),
    },

    {
      path: '/products',
      exaxt: true,
      element: (
        <>
          <section className='main'>
            <Header />
            <div className='contentMain flex'>
              <div className={`overflow-hidden sidebarWrapper ${isSidebarOpen === true ? 'w-[18%]' : 'w-[0%] opacity-0'} transition-all duration-300`}>
                <Sidebar />
              </div>
              <div className={`contentRight py-4 px-5 ${isSidebarOpen === false ? 'w-[100%]' : 'w-[82%]'} transition-all duration-300`}>
                <Products />
              </div>
            </div>
          </section>
        </>
      ),
    },

    {
      path: '/homeSlider/list',
      exaxt: true,
      element: (
        <>
          <section className='main'>
            <Header />
            <div className='contentMain flex'>
              <div className={`overflow-hidden sidebarWrapper ${isSidebarOpen === true ? 'w-[18%]' : 'w-[0%] opacity-0'} transition-all duration-300`}>
                <Sidebar />
              </div>
              <div className={`contentRight py-4 px-5 ${isSidebarOpen === false ? 'w-[100%]' : 'w-[82%]'} transition-all duration-300`}>
                <HomeSliderBanners />
              </div>
            </div>
          </section>
        </>
      ),
    },

    {
      path: '/category/list',
      exaxt: true,
      element: (
        <>
          <section className='main'>
            <Header />
            <div className='contentMain flex'>
              <div className={`overflow-hidden sidebarWrapper ${isSidebarOpen === true ? 'w-[18%]' : 'w-[0%] opacity-0'} transition-all duration-300`}>
                <Sidebar />
              </div>
              <div className={`contentRight py-4 px-5 ${isSidebarOpen === false ? 'w-[100%]' : 'w-[82%]'} transition-all duration-300`}>
                <CategoryList />
              </div>
            </div>
          </section>
        </>
      ),
    },

    {
      path: '/subCategory/list',
      exaxt: true,
      element: (
        <>
          <section className='main'>
            <Header />
            <div className='contentMain flex'>
              <div className={`overflow-hidden sidebarWrapper ${isSidebarOpen === true ? 'w-[18%]' : 'w-[0%] opacity-0'} transition-all duration-300`}>
                <Sidebar />
              </div>
              <div className={`contentRight py-4 px-5 ${isSidebarOpen === false ? 'w-[100%]' : 'w-[82%]'} transition-all duration-300`}>
                <SubCategoryList />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: '/users',
      exaxt: true,
      element: (
        <>
          <section className='main'>
            <Header />
            <div className='contentMain flex'>
              <div className={`overflow-hidden sidebarWrapper ${isSidebarOpen === true ? 'w-[18%]' : 'w-[0%] opacity-0'} transition-all duration-300`}>
                <Sidebar />
              </div>
              <div className={`contentRight py-4 px-5 ${isSidebarOpen === false ? 'w-[100%]' : 'w-[82%]'} transition-all duration-300`}>
                <Users />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: '/orders',
      exaxt: true,
      element: (
        <>
          <section className='main'>
            <Header />
            <div className='contentMain flex'>
              <div className={`overflow-hidden sidebarWrapper ${isSidebarOpen === true ? 'w-[18%]' : 'w-[0%] opacity-0'} transition-all duration-300`}>
                <Sidebar />
              </div>
              <div className={`contentRight py-4 px-5 ${isSidebarOpen === false ? 'w-[100%]' : 'w-[82%]'} transition-all duration-300`}>
                <Orders />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: '/profile',
      exaxt: true,
      element: (
        <>
          <section className='main'>
            <Header />
            <div className='contentMain flex'>
              <div className={`overflow-hidden sidebarWrapper ${isSidebarOpen === true ? 'w-[18%]' : 'w-[0%] opacity-0'} transition-all duration-300`}>
                <Sidebar />
              </div>
              <div className={`contentRight py-4 px-5 ${isSidebarOpen === false ? 'w-[100%]' : 'w-[82%]'} transition-all duration-300`}>
                <Profile />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: '/product/:id',
      exaxt: true,
      element: (
        <>
          <section className='main'>
            <Header />
            <div className='contentMain flex'>
              <div className={`overflow-hidden sidebarWrapper ${isSidebarOpen === true ? 'w-[18%]' : 'w-[0%] opacity-0'} transition-all duration-300`}>
                <Sidebar />
              </div>
              <div className={`contentRight py-4 px-5 ${isSidebarOpen === false ? 'w-[100%]' : 'w-[82%]'} transition-all duration-300`}>
                <ProductDetails />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: '/product/addRams',
      exaxt: true,
      element: (
        <> 
          <section className='main'>
            <Header />
            <div className='contentMain flex'>
              <div className={`overflow-hidden sidebarWrapper ${isSidebarOpen === true ? 'w-[18%]' : 'w-[0%] opacity-0'} transition-all duration-300`}>
                <Sidebar />
              </div>
              <div className={`contentRight py-4 px-5 ${isSidebarOpen === false ? 'w-[100%]' : 'w-[82%]'} transition-all duration-300`}>
                <AddRAMS />
              </div>
            </div>
          </section>
        </>
      ),
    },
  ])

  const value = {
    isSidebarOpen,
    setisSidebarOpen,
    isLogin,
    setIsLogin,
    isOpenFullScreenPanel,
    setIsOpenFullScreenPanel,
    alertBox,
    userData,
    setUserData,
    setAddress,
    address,
    catData,
    setCatData,
    getCat
  };

  return (
    <>
      <MyContext.Provider value={value}>
        <RouterProvider router={router} />

        <Toaster />

        

      </MyContext.Provider>
    </>
  )
}

export default App;
export { MyContext };