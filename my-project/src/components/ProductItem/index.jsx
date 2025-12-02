import React from 'react'
import './style.css';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { FaRegHeart } from 'react-icons/fa';
import { IoGitCompareOutline } from 'react-icons/io5';
import { MdZoomOutMap } from 'react-icons/md';
import Tooltip from '@mui/material/Tooltip';

const ProductItem = () => {
  return (
    <div className='productItem shadow-lg rounded-md overflow-hidden border-1 border-[rgba(0,0,0,0.1)]'>
        <div className="group imgWrapper w-[100%] overflow-hidden rounded-md relative">
        <Link to="/">
          <div className='img h-[220px] overflow-hidden'>
            <img src="https://serviceapi.spicezgold.com/download/1753711304615_zoom_0-1677748187.jpg" alt="items" className='w-full' />
            <img src="https://serviceapi.spicezgold.com/download/1753711304616_zoom_1-1677748187.jpg" alt="items" 
            className='w-full transition-all duration-700 absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:scale-105' />
          </div>
        </Link>
            <span className='discount flex items-center absolute top-[10px] left-[10px] z-50 bg-[#ff5252] text-white rounded-lg px-2 py-1 text-[12px] font-[600] p-1 text-[12px] font-[500]'>10%</span>

            <div className='actions absolute top-[-200px] right-[5px] z-50 flex items-center gap-2 flex-col w-[50px] transition-all duration-300 group-hover:top-[15px] opacity-0 group-hover:opacity-100'>
              <Tooltip title="View" placement='left-start'>
                <Button className='!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !bg-white !text-black hover:!bg-[#ff5252] hover:!text-white'>
                  <MdZoomOutMap className='text-[18px] !text-black group-hover:text-white' />
                  </Button>
                  </Tooltip>
                  <Tooltip title="Compare" placement='left-start'>
                  <Button className='!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !bg-white !text-black hover:!bg-[#ff5252] hover:!text-white'>
                  <IoGitCompareOutline className='text-[18px] !text-black group-hover:text-white' />
                  </Button>
                  </Tooltip>
                  <Tooltip title="Wishlist" placement='left-start'>
                  <Button className='!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !bg-white !text-black hover:!bg-[#ff5252] hover:!text-white'>
                  <FaRegHeart className='text-[18px] !text-black group-hover:text-white' />
                  </Button>
                  </Tooltip>
            </div>
        </div>

        <div className='info p-3 py-5'>
            <h6 className='text-[13px] !font-[400]'><Link to="/" className='link transition-all'>ftDiva</Link></h6>
            <h3 className='text-[13px] title mt-1 font-[500] mb-1 text-[#000]'><Link to="/" className='link transition-all'>mandarin collar printed anarkali kurta</Link></h3>

            <Rating name='size-small' defaultValue={4} size="small" readOnly />

            <div className='flex items-center gap-4'>
                <span className='oldPrice line-through text-gray-500 text-[15px] font-[500]'>$58.00</span>
                <span className='price text-[#ff5252] text-[15px] font-[600]'>$58.00</span>
            </div>
        </div>

    </div>
  )
}

export default ProductItem;