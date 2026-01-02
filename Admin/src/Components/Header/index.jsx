import React, { useContext, useState } from 'react'
import Button from '@mui/material/Button'
import { RiMenu2Line } from "react-icons/ri";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { FaRegBell } from 'react-icons/fa';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import { FaRegUser } from 'react-icons/fa6';
import { IoMdLogOut } from 'react-icons/io';
import { MyContext } from '../../App';
import { Link } from 'react-router-dom';
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

  const [anchorMyAcc, setAnchorMyAcc] = useState(null);
  const openMyAcc = Boolean(anchorMyAcc);
  const handleClickMyAcc = (event) => {
    setAnchorMyAcc(event.currentTarget);
  };
  const handleCloseMyAcc = () => {
    setAnchorMyAcc(null);
  };

  const context = useContext(MyContext);

  const logout = () => {
    // setAnchorEl(null);
    setAnchorMyAcc(null);
    fetchDataFromApi(`/api/user/logout?token=${localStorage.getItem('accesstoken')}`, { withCredentials: true }).then((res) => {
      if (res?.error === false) {
        localStorage.removeItem("accesstoken");
        localStorage.removeItem("refreshToken");
        context.alertBox("Success", res?.message);
        context.setIsLogin(false);
      }
    })
  }

  return (
    <header className={`w-full h-auto py-2 shadow-md pr-7 bg-white flex items-center justify-between ${context.isSidebarOpen===true ? 'pl-80' : 'pl-5'} transition-all duration-300`}>
      <div className='part1'>
        <Button className='w-10! min-w-10! h-10! rounded-full! text-[rgba(0,0,0,0.7)]!'
          onClick={() => context.setisSidebarOpen(!context.isSidebarOpen)} >
          <RiMenu2Line className='text-[18px] text-[rgba(0,0,0,0.7)]'/>
        </Button>
      </div> 


      <div className='part2 w-[40%] flex items-center justify-end gap-5'>
        <IconButton aria-label="cart">
          <StyledBadge badgeContent={4} color="secondary">
            <FaRegBell />
          </StyledBadge>
        </IconButton>

        {
          context.isLogin === true ? (
            <div className='relative'>
          <div className='rounded-full w-[35px] h-[35px] overflow-hidden cursor-pointer'
            onClick={handleClickMyAcc}
          >
            <img src="https://up.yimg.com/ib/th/id/OIP.Kk4i-k-7bOfsgPv0SJtj5AHaHa?pid=Api&rs=1&c=1&qlt=95&w=121&h=121"
              className='w-full h-full object-cover' />
          </div>

          <Menu
            anchorEl={anchorMyAcc}
            id="account-menu"
            open={openMyAcc}
            onClose={handleCloseMyAcc}
            onClick={handleCloseMyAcc}
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
          >
            <MenuItem onClick={handleCloseMyAcc} className='bg-white!'>
              <div className='flex items-center gap-3'>
                <div className='rounded-full w-[35px] h-[35px] overflow-hidden cursor-pointer'                
                >
                  <img src="https://up.yimg.com/ib/th/id/OIP.Kk4i-k-7bOfsgPv0SJtj5AHaHa?pid=Api&rs=1&c=1&qlt=95&w=121&h=121"
                    className='w-full h-full object-cover' />
                </div>

                <div className='info'>
                  <h3 className='text-[15px] font-[500] leading-5'>{context?.userData?.name}</h3>
                  <p className='text-[12px] font-[400] opacity-70'>{context?.userData?.email}</p>
                </div>
              </div>
            </MenuItem>
            <Divider />

            <Link to="/profile">
              <MenuItem onClick={handleCloseMyAcc} className='flex itrems-center gap-3'>
                <FaRegUser className='text-[16px]' />
                <span className='text-[14px]'>My Profile</span>
              </MenuItem>
            </Link>

            <MenuItem onClick={() => { logout(); handleCloseMyAcc(); }} className='flex itrems-center gap-3'>
              <IoMdLogOut className='text-[18px]' />
              <span className='text-[14px]'>Sign Out</span>
            </MenuItem>
            
          </Menu>
        </div>
          )
          : (
            <Button className='btn-blue btn-sm rounded-full!'
            >
              <Link to="/login">Sign In</Link>
            </Button>
          )
        }
      </div>
    </header>
  )
}

export default Header;