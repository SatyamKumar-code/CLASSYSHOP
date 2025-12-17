import React, { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Header from './Components/Header'
import Sidebar from './Components/Sidebar'
import Dashboard from './Pages/Dashboard'
import { createContext } from 'react'

const MyContext = createContext();


function App() {

  const [isSidebarOpen, setisSidebarOpen] = useState(true);

  
  
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
  ])

  const value = {
    isSidebarOpen,
    setisSidebarOpen
  };

  return (
    <>
    <MyContext.Provider value={value}>
      <RouterProvider router={router} />
    </MyContext.Provider>
    </>
  )
}

export default App;
export { MyContext };