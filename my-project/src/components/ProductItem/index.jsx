import React, { useContext } from 'react'
import './style.css';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { FaRegHeart } from 'react-icons/fa';
import { IoGitCompareOutline } from 'react-icons/io5';
import { MdZoomOutMap } from 'react-icons/md';
import Tooltip from '@mui/material/Tooltip';
import { MyContext } from '../../App';

const ProductItem = (props) => {

  const context = useContext(MyContext);
  
  return (
    <div className='productItem shadow-lg rounded-md overflow-hidden border-1 border-[rgba(0,0,0,0.1)]'>
        <div className="group imgWrapper w-[100%] overflow-hidden rounded-md relative">
        <Link to={`/product/${props?.item?._id}`}>
          <div className='img h-[220px] overflow-hidden'>
            <img src={props?.item?.images?.[0]} alt="items" className='w-full' />
            <img src={props?.item?.images?.[1]} alt="items" 
            className='w-full transition-all duration-700 absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:scale-105' />
          </div>
        </Link>
            <span className='discount flex items-center absolute top-[10px] left-[10px] z-50 bg-[#ff5252] text-white rounded-lg px-2 py-1 text-[12px] font-[600] p-1 text-[12px] font-[500]'>{props?.item?.discount}%</span>

            <div className='actions absolute top-[-200px] right-[5px] z-50 flex items-center gap-2 flex-col w-[50px] transition-all duration-300 group-hover:top-[15px] opacity-0 group-hover:opacity-100'>
              <Tooltip title="View" placement='left-start'>
                <Button className='!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !bg-white !text-black hover:!bg-[#ff5252] hover:!text-white group'
                onClick={() => context.handleOpenProductDetailModel(true, props?.item)}>
                  <MdZoomOutMap className='text-[18px] !text-black group-hover:text-white' />
                  </Button>
                  </Tooltip>
                  <Tooltip title="Compare" placement='left-start'>
                  <Button className='!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !bg-white !text-black hover:!bg-[#ff5252] hover:!text-white group'>
                  <IoGitCompareOutline className='text-[18px] !text-black group-hover:text-white' />
                  </Button>
                  </Tooltip>
                  <Tooltip title="Wishlist" placement='left-start'>
                  <Button className='!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !bg-white !text-black hover:!bg-[#ff5252] hover:!text-white group'>
                  <FaRegHeart className='text-[18px] !text-black group-hover:text-white' />
                  </Button>
                  </Tooltip>
            </div>
        </div>

        <div className='info p-3'>
            <h6 className='text-[13px] !font-[400]'>{props?.item?.brand}</h6>
            <h3 className='text-[13px] title mt-1 font-[500] mb-1 text-[#000]'>
              <Link to={`/product/${props?.item?._id}`} 
                className='link transition-all'>{props?.item?.name?.substr(0,40)+"..."}
              </Link></h3>

            <Rating name='size-small' defaultValue={props?.item?.rating} size="small" readOnly />

            <div className='flex items-center gap-4'>
                <span className='oldPrice line-through text-gray-500 text-[15px] font-[500]'>&#x20b9; {props?.item?.oldPrice}</span>
                <span className='price text-[#ff5252] text-[15px] font-[600]'>&#x20b9; {props?.item?.price}</span>
            </div>
        </div>

    </div>
  )
}

export default ProductItem;