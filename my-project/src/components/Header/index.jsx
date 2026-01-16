import React, { useContext, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Search from '../Search';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { IoBagCheckOutline, IoGitCompareSharp } from "react-icons/io5";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import Tooltip from '@mui/material/Tooltip';
import Navigation from './Navigation';
import { MyContext } from '../../App';
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { IoIosLogOut, IoMdHeartEmpty } from 'react-icons/io';
import { fetchDataFromApi } from '../../utils/api';


const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
        padding: '0 4px',
    },
}));


const Header = () => {

    const context = useContext(MyContext);
    const history = useNavigate(); 

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        setAnchorEl(null);
        fetchDataFromApi(`/api/user/logout?token=${localStorage.getItem('accesstoken')}`, { withCredentials: true }).then((res) => {

            if(res?.error===false){
                localStorage.removeItem("accesstoken");
                localStorage.removeItem("refreshToken");
                context.alertBox("Success", res?.message);
                context.setIsLogin(false);
                history("/")
            }
        })
    }
    

    return (
        <header className='bg-white sticky -top-[150px] z-100'>
            <div className='top-strip py-2  border-t-[1px] border-gray-250 border-b-[1px]'>
                <div className='container'>
                    <div className='flex items-center justify-between'>
                        <div className='col1 w-[50%]' >
                            <p className='text-[12px] font-medium'>Get up to 50% off new season styles, limited time only</p>
                        </div>

                        <div className='col2 flex items-center justify-end'>
                            <ul className='flex items-center gap-3'>
                                <li className='list-none'>
                                    <Link to="/help-center" className='text-[13px] link font-medium transition'>Help Center</Link>
                                </li>
                                <li className='list-none'>
                                    <Link to="/order-tracking" className='text-[13px] link font-medium transition'>Order Tracking</Link>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>

            <div className='header py-4 border-t-[1px] border-gray-250 border-b-[1px] '>
                <div className='container flex items-center justify-between'>
                    <div className='col1 w-[25%]'>
                        <Link to={"/"}><img src='/logo.jpg' /></Link>
                    </div>

                    <div className='col2 w-[40%]'>
                        <Search />
                    </div>

                    <div className='col3 w-[35%] flex items-center pl-7'>
                        <ul className='flex items-center justify-end gap-3 w-full'>

                            {
                                context.isLogin=== false ? (
                                <li className='list-none'>
                                <Link to={"/login"} className='link transition text-[15px] font-[500]'>Login</Link> |
                                <Link to={"/register"} className='link transition text-[15px] font-[500]'>Register</Link>
                            </li>
                            ): (
                                <>
                                <Button className='myAccountWrap !text-[#000] flex items-center gap-3 cursor-pointer'
                                    onClick={handleClick}>
                                    <Button
                                        className='!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !bg-[#f1f1f1]'>
                                        <FaRegUser className='text-[16px] text-[rgba(0,0,0,0.7)]' />
                                    </Button>

                                    <div className='info flex flex-col'>
                                        <h4  className='text-[14px] leading-3 text-[rgba(0,0,0,0.6)] mb-0 font-[500] capitalize text-left justify-start'>{context?.userData?.name}</h4>
                                        <span className='text-[13px] text-[rgba(0,0,0,0.6)] font-[400] capitalize text-left justify-start'>{context?.userData?.email}</span>
                                    </div>
                                </Button>

                                            <Menu
                                                anchorEl={anchorEl}
                                                id="account-menu"
                                                open={open}
                                                onClose={handleClose}
                                                onClick={handleClose}
                                                slotProps={{
                                                    paper: {
                                                        elevation: 0,
                                                        sx: {
                                                            overflow: 'visible',
                                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                            mt: 1.5,
                                                            '& .MuiAvatar-root': {
                                                                width: 32,
                                                                height: 32,
                                                                ml: -0.5,
                                                                mr: 1,
                                                            },
                                                            '&::before': {
                                                                content: '""',
                                                                display: 'block',
                                                                position: 'absolute',
                                                                top: 0,
                                                                right: 14,
                                                                width: 10,
                                                                height: 10,
                                                                bgcolor: 'background.paper',
                                                                transform: 'translateY(-50%) rotate(45deg)',
                                                                zIndex: 0,
                                                            },
                                                        },
                                                    },
                                                }}
                                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                            >   <Link to="/my-account" className='w-full block'>
                                                    <MenuItem onClick={handleClose} className='flex gap-2 !py-2'>
                                                        <FaRegUser className='text-[18px]' /> <span className='text-[14px]'>My account</span>
                                                    </MenuItem>
                                                </Link>
                                                <Link to="/my-orders" className='w-full block'>
                                                    <MenuItem onClick={handleClose} className='flex gap-2 !py-2'>
                                                        <IoBagCheckOutline className='text-[18px]' /> <span className='text-[14px]'>Orders</span>
                                                    </MenuItem>
                                                </Link>
                                                <Link to="/my-list" className='w-full block'>
                                                    <MenuItem onClick={handleClose} className='flex gap-2 !py-2'>
                                                        <IoMdHeartEmpty className='text-[18px]' /> <span className='text-[14px]'>My Wishlist</span>
                                                    </MenuItem>
                                                </Link>
                                                
                                                    <MenuItem onClick={logout} className='flex gap-2 !py-2'>
                                                        <IoIosLogOut className='text-[18px]' /> <span className='text-[14px]'>Logout</span>
                                                    </MenuItem>
                                                
                                            </Menu>
                                </>
                            )
                            }
                            

                            <li>
                                <Tooltip title="Compare">
                                <IconButton aria-label="cart">
                                    <StyledBadge badgeContent={4} color="secondary">
                                        <IoGitCompareSharp />
                                    </StyledBadge>
                                </IconButton>
                                </Tooltip>
                            </li>

                            <li>
                                <Tooltip title="Wish List">
                                <IconButton aria-label="cart">
                                    <StyledBadge badgeContent={4} color="secondary">
                                        <FaRegHeart />
                                    </StyledBadge>
                                </IconButton>
                                </Tooltip>
                            </li>

                            <li>
                                <Tooltip title="Cart">
                                <IconButton aria-label="cart" onClick={() => context.setOpenCartPanel(true)}>
                                    <StyledBadge badgeContent={4} color="secondary">
                                        <ShoppingCartIcon />
                                    </StyledBadge>
                                </IconButton>
                                </Tooltip>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <Navigation />
        </header>
    )
}

export default Header;