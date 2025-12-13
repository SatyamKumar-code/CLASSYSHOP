import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Header from './Components/Header'
import Sidebar from './Components/Sidebar'


function App() {
  
  const router = createBrowserRouter([
    {
      path: '/',
      exaxt: true,
      element: <>
        <section className='main'>
          <Header />
          <div className='contentMain flex'>
            <div className='sidebarWrapper w-[18%]'>
              <Sidebar />
            </div>
          </div>
        </section>
      </>
    },
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
