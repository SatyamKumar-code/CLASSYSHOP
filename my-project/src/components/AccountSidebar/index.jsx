import Button from '@mui/material/Button';
import React from 'react'
import { FaCloudUploadAlt, FaRegUser } from 'react-icons/fa';
import { IoIosLogOut, IoMdHeartEmpty } from 'react-icons/io';
import { IoBagCheckOutline } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';

const AccountSidebar  = () => {
  return (
    <div className='card bg-white shadow-md rounded-m sticky top-[10px]'>
                    <div className='w-full p-5 flex items-center justify-center flex-col'>
                        <div className='w-[110px] h-[110px] rounded-full overflow-hidden mb-4 relative group'>
                            <img src="https://www.w3schools.com/howto/img_avatar.png" alt="user avatar" className='w-full h-full object-cover' />

                            <div className='overlay w-[100%] h-[100%] absolute top-0 left-0 z-50 bg-[rgba(0,0,0,0.7)] flex items-center justify-center cursor-pointer opacity-0 transition-all group-hover:opacity-100'>
                                <FaCloudUploadAlt className='text-[#fff] text-[25px]'/>
                                <input type="file" className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer' />
                            </div>
                        </div>

                        <h3>Satyam kumar</h3>
                        <h6 className='!text-[13px] !font-[500]'>satyamkumar@example.com</h6>
                    </div>

                    <ul className='list-none pb-5 bg-[#f1f1f1] myAccountTabs'>
                        <li className='w-full'>
                            <NavLink to="/my-account" exact={true} activeClassName="isActive"
                            className="relative">
                            <Button className='w-full !text-left !px-5 !py-2 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2'>
                                <FaRegUser className='text-[15px]' /> 
                                My Profile
                            </Button>
                            </NavLink>
                        </li>

                        <li className='w-full'>
                            <NavLink to="/my-list" exact={true} activeClassName="isActive"
                            className="relative">
                            <Button className='w-full !text-left !px-5 !py-2 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2'>
                                <IoMdHeartEmpty className='text-[17px]' /> 
                                My List
                            </Button>
                            </NavLink>
                        </li>

                        <li className='w-full'>
                            <NavLink to="/my-orders" exact={true} activeClassName="isActive"
                            className="relative">
                            <Button className='w-full !text-left !px-5 !py-2 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2'>
                                <IoBagCheckOutline className='text-[17px]' /> 
                                My Orders
                            </Button>
                            </NavLink>
                        </li>

                        <li className='w-full'>
                            <NavLink to="/logout" exact={true} activeClassName="isActive"
                            className="relative">
                            <Button className='w-full !text-left !px-5 !py-2 !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2'>
                                <IoIosLogOut className='text-[18px]' /> 
                                Logout
                            </Button>
                            </NavLink>
                        </li>

                       
                    </ul>
                </div>
  )
}

export default AccountSidebar;