import Button from '@mui/material/Button'
import React from 'react'
import { BsBagCheck } from 'react-icons/bs'
import { FiUser } from 'react-icons/fi'
import { IoHomeOutline, IoSearch } from 'react-icons/io5'
import { LuHeart } from 'react-icons/lu'
import { NavLink } from 'react-router-dom'

const MobileNav = () => {
  return (
    <div className='mobileNav bg-white p-1 px-3 w-full grid grid-cols-5 fixed bottom-0 left-0 place-items-center gap-5 border-t-[1px] border-gray-300 lg:hidden z-51'>
        <NavLink to="/" className={({ isActive }) => "nav-link"}>
            {({ isActive }) => (
                <Button className={`flex-col w-10! min-w-10! capitalize! ${isActive ? 'text-[#ff5252]!' : 'text-gray-700!'}`}>
                    <IoHomeOutline size={18} />
                    <span className='text-[12px]'>Home</span>
                </Button>
            )}
        </NavLink>

        <Button className='flex-col w-10! min-w-10! capitalize! text-gray-700!'>
            <IoSearch size={18} />
            <span className='text-[12px]'>Search</span>
        </Button>

        <NavLink to="/my-list" className={({ isActive }) => "nav-link"}>
            {({ isActive }) => (
                <Button className={`flex-col w-10! min-w-10! capitalize! ${isActive ? 'text-[#ff5252]!' : 'text-gray-700!'}`}>
                    <LuHeart size={18} />
                    <span className='text-[12px]'>Wishlists</span>
                </Button>
            )}
        </NavLink>

        <NavLink to="/my-orders" className={({ isActive }) => "nav-link"}>
            {({ isActive }) => (
                <Button className={`flex-col w-10! min-w-10! capitalize! ${isActive ? 'text-[#ff5252]!' : 'text-gray-700!'}`}>
                    <BsBagCheck size={18} />
                    <span className='text-[12px]'>Orders</span>
                </Button>
            )}
        </NavLink>

        <NavLink to="/my-account" className={({ isActive }) => "nav-link"}>
            {({ isActive }) => (
                <Button className={`flex-col w-10! min-w-10! capitalize! ${isActive ? 'text-[#ff5252]!' : 'text-gray-700!'}`}>
                    <FiUser size={18} />
                    <span className='text-[12px]'>Account</span>
                </Button>
            )}
        </NavLink>

    </div >
  )
}

export default MobileNav