import Button from '@mui/material/Button'
import React, { useContext, useEffect } from 'react'
import { BsBagCheck } from 'react-icons/bs'
import { FiUser } from 'react-icons/fi'
import { IoHomeOutline, IoSearch } from 'react-icons/io5'
import { LuHeart } from 'react-icons/lu'
import { NavLink } from 'react-router-dom'
import { MdOutlineFilterAlt } from 'react-icons/md'
import { MyContext } from '../../../App'
import { useLocation } from 'react-router-dom'

const MobileNav = () => {

  const context = useContext(MyContext);

  const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/products") {
            context?.setIsFilterBtnShow(true);
        } else {
            context?.setIsFilterBtnShow(false);
        } 
        if (location.pathname === "/search") {
            context?.setOpenSearchPanel(true);
        }else {
            context?.setOpenSearchPanel(false);
        }
 
    }, [location]);

    const openFilters = () => {
        context?.setOpenFilter(true);
    }
  return (
    <div className='mobileNav bg-white p-1 px-3 w-full flex items-center justify-between fixed bottom-0 left-0 gap-0 border-t border-gray-300 lg:hidden z-51'>
        <NavLink to="/" className={({ isActive }) => "nav-link"}>
            {({ isActive }) => (
                <Button className={`flex-col w-10! min-w-10! capitalize! ${isActive ? 'text-[#ff5252]!' : 'text-gray-700!'}`}>
                    <IoHomeOutline size={18} />
                    <span className='text-[12px]'>Home</span>
                </Button>
            )}
        </NavLink>

        {
            context?.isFilterBtnShow === true && 
            <Button className={`flex-col w-10! h-10! min-w-10! capitalize! text-gray-700! bg-primary rounded-full!`}
                onClick={openFilters}
            >
                <MdOutlineFilterAlt size={18} className='text-white' />
            </Button>
        }

        <Button className='flex-col w-10! min-w-10! capitalize! text-gray-700!'
            onClick={() => context?.setOpenSearchPanel(true)}
        >
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