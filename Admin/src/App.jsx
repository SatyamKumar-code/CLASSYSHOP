import React, {useEffect, useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Header from './Components/Header'
import Sidebar from './Components/Sidebar'
import Dashboard from './Pages/Dashboard'
import { createContext } from 'react'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import Products from './Pages/Products'
import AddProduct from './Pages/Products/addProduct'


import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { IoMdClose } from 'react-icons/io'
import Slide from '@mui/material/Slide';
import HomeSliderBanners from './Pages/HomeSliderBanners'
import AddHomeSlide from './Pages/HomeSliderBanners/addHomeSlide'
import CategoryList from './Pages/Categegory'
import AddCategory from './Pages/Categegory/addCategory'
import SubCategoryList from './Pages/Categegory/subCatList'
import AddSubCategory from './Pages/Categegory/addSubCategory'
import Users from './Pages/Users'
import Orders from './Pages/Orders'
import ForgotPassword from './Pages/ForgotPassword'
import VerifyAccount from './Pages/VerifyAccount'
import ChangePassword from './Pages/ChangePassword'
import { fetchDataFromApi } from '../../my-project/src/utils/api'
import toast, { Toaster } from 'react-hot-toast';
import Profile from './Pages/Profile'
import AddAddress from './Pages/Address/addAddress'



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



const MyContext = createContext();


function App() {

  const [isSidebarOpen, setisSidebarOpen] = useState(true);
  const [ isLogin, setIsLogin ] = useState(false);
  const [userData, setUserData] = useState(null);

  const [ isOpenFullScreenPanel, setIsOpenFullScreenPanel ] = useState({
    open: false,
    Modal:''
  });


  useEffect(() => {
    const token = localStorage.getItem("accesstoken");

    if(token !== undefined && token !== null && token !== ""){
      setIsLogin(true);

      fetchDataFromApi(`/api/user/user-details`).then((res) => {
        setUserData(res.data);
        if(res?.response?.data?.error === true){
          if(res?.response?.data?.message === "You have not login"){
            localStorage.removeItem("accesstoken");
            localStorage.removeItem("refreshtoken");

            alertBox("error", "Session expired. Please login again.");

            window.location.href = '/login';

            setIsLogin(false);
            
          }
        }
      })

    }else{
      setIsLogin(false);
    }
  }, [isLogin]);

  const alertBox = (type, msg) => {
    if(type === "Success"){
      toast.success(msg)
    }
    if(type === "error"){
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
            <div className={`overflow-hidden sidebarWrapper ${isSidebarOpen===true ? 'w-[18%]' : 'w-[0%] opacity-0'} transition-all duration-300`}>
              <Sidebar />
            </div>
            <div className={`contentRight py-4 px-5 ${isSidebarOpen===false ? 'w-[100%]' : 'w-[82%]'} transition-all duration-300`}>
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
            <div className={`overflow-hidden sidebarWrapper ${isSidebarOpen===true ? 'w-[18%]' : 'w-[0%] opacity-0'} transition-all duration-300`}>
              <Sidebar />
            </div>
            <div className={`contentRight py-4 px-5 ${isSidebarOpen===false ? 'w-[100%]' : 'w-[82%]'} transition-all duration-300`}>
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
            <div className={`overflow-hidden sidebarWrapper ${isSidebarOpen===true ? 'w-[18%]' : 'w-[0%] opacity-0'} transition-all duration-300`}>
              <Sidebar />
            </div>
            <div className={`contentRight py-4 px-5 ${isSidebarOpen===false ? 'w-[100%]' : 'w-[82%]'} transition-all duration-300`}>
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
            <div className={`overflow-hidden sidebarWrapper ${isSidebarOpen===true ? 'w-[18%]' : 'w-[0%] opacity-0'} transition-all duration-300`}>
              <Sidebar />
            </div>
            <div className={`contentRight py-4 px-5 ${isSidebarOpen===false ? 'w-[100%]' : 'w-[82%]'} transition-all duration-300`}>
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
            <div className={`overflow-hidden sidebarWrapper ${isSidebarOpen===true ? 'w-[18%]' : 'w-[0%] opacity-0'} transition-all duration-300`}>
              <Sidebar />
            </div>
            <div className={`contentRight py-4 px-5 ${isSidebarOpen===false ? 'w-[100%]' : 'w-[82%]'} transition-all duration-300`}>
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
            <div className={`overflow-hidden sidebarWrapper ${isSidebarOpen===true ? 'w-[18%]' : 'w-[0%] opacity-0'} transition-all duration-300`}>
              <Sidebar />
            </div>
            <div className={`contentRight py-4 px-5 ${isSidebarOpen===false ? 'w-[100%]' : 'w-[82%]'} transition-all duration-300`}>
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
            <div className={`overflow-hidden sidebarWrapper ${isSidebarOpen===true ? 'w-[18%]' : 'w-[0%] opacity-0'} transition-all duration-300`}>
              <Sidebar />
            </div>
            <div className={`contentRight py-4 px-5 ${isSidebarOpen===false ? 'w-[100%]' : 'w-[82%]'} transition-all duration-300`}>
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
            <div className={`overflow-hidden sidebarWrapper ${isSidebarOpen===true ? 'w-[18%]' : 'w-[0%] opacity-0'} transition-all duration-300`}>
              <Sidebar />
            </div>
            <div className={`contentRight py-4 px-5 ${isSidebarOpen===false ? 'w-[100%]' : 'w-[82%]'} transition-all duration-300`}>
              <Profile />
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
    setUserData
  };

  return (
    <>
    <MyContext.Provider value={value}>
      <RouterProvider router={router} />

      <Toaster />

      <Dialog
        fullScreen
        open={isOpenFullScreenPanel.open}
        onClose={() => setIsOpenFullScreenPanel({
          open: false,
        })}
        slots={{
          transition: Transition,
        }}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setIsOpenFullScreenPanel({
                open: false,
              })}
              aria-label="close"
            >
              <IoMdClose className='text-gray-800' />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              <span className='text-gray-800'>{isOpenFullScreenPanel?.model}</span>
            </Typography>
            
          </Toolbar>
        </AppBar>
        
        {
          isOpenFullScreenPanel?.model === 'Add Product' && <AddProduct />
        }
        
        {
          isOpenFullScreenPanel?.model === 'Add Home Slide' && <AddHomeSlide/>
        }
        {
          isOpenFullScreenPanel?.model === 'Add New Category' && <AddCategory/>
        }
        {
          isOpenFullScreenPanel?.model === 'Add New Sub Category' && <AddSubCategory/>
        }
        {
          isOpenFullScreenPanel?.model === 'Add New Address' && <AddAddress/>
        }

      </Dialog>

    </MyContext.Provider>
    </>
  )
}

export default App;
export { MyContext };