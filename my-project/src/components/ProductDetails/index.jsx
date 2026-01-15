import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { QtyBox } from '../../components/Qt;yBox';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { FaRegHeart } from "react-icons/fa6";
import { IoGitCompareOutline } from "react-icons/io5";
import Rating from '@mui/material/Rating';

export const ProductDetailsComponent = (prpos) => {

    const [productActionIndex, setProductActionIndex] = useState(null);
  return (
    <>
    <h1 className='text-[24px] font-[600] mb-2'>{prpos.item?.name}</h1>
            <div className='flex items-center gap-3'>
              <span className='text-gray-400 text-[13px]'>
                Brand : <span className='font-[500] text-black opacity-75'>{prpos.item?.brand}</span>
              </span>

              <Rating name='size-small' defaultValue={4} size='small' readOnly />
              <span className='text-[13px] cursor-pointer'>Review (5)</span>
            </div>

            <div className='flex items-center gap-4 mt-4'>
              <span className='oldPrice line-through text-gray-500 text-[20px] font-[500]'> &#x20b9; {prpos.item?.oldPrice}</span>
              <span className='price text-[#ff5252] text-[20px] font-[600]'> &#x20b9; {prpos.item?.price}</span>
              <span className='text-[14px]'>Available In Stock: <span className='text-green-600 text-[14px] font-bold'>{prpos.item?.countInStock} Items</span></span>
            </div>

            <p className='mt-3 pr-10 mb-5'>{prpos.item?.description}</p>

            {
              prpos?.item?.productRam?.length !== 0 &&
              <div className='flex items-center gap-3'>
                <span className='text-[16px]'>RAM: </span>
                <div className='flex items-center gap-1 actions'>
                  {
                    prpos?.item?.productRam?.map((item, index) => {
                      return (
                        <Button key={index} className={`${productActionIndex === index ? 'bg-primary text-white' : ''}`} onClick={() => setProductActionIndex(index)}>{item}</Button>
                      )
                    })
                  }
                </div>
              </div>
            }

            {
              prpos?.item?.size?.length !== 0 &&
              <div className='flex items-center gap-3 py-1'>
                <span className='text-[16px]'>Size: </span>
                <div className='flex items-center gap-1 actions'>
                  {
                    prpos?.item?.size?.map((item, index) => {
                      return (
                        <Button key={index} className={`${productActionIndex === index ? 'bg-primary text-white' : ''}`} onClick={() => setProductActionIndex(index)}>{item}</Button>
                      )
                    })
                  }
                </div>
              </div>
            }

            {
              prpos?.item?.productWeight?.length !== 0 &&
              <div className='flex items-center gap-3'>
                <span className='text-[16px]'>Weight: </span>
                <div className='flex items-center gap-1 actions'>
                  {
                    prpos?.item?.productWeight?.map((item, index) => {
                      return (
                        <Button key={index} className={`${productActionIndex === index ? 'bg-primary text-white' : ''}`} onClick={() => setProductActionIndex(index)}>{item}</Button>
                      )
                    })
                  }
                </div>
              </div>
            }
            

            <p className='text-[14px] mt-5 mb-2 text-[#000]'>Free Shipping (Est. Delivery Time 2-3 Days)</p>
            <div className='flex items-center gap-4 py-4'>
              <div className='qtyBoxWrapper w-[70px]'>
                <QtyBox />
              </div>

              <Button variant='contained' className='btn-org flex gap-2'>
                <MdOutlineShoppingCart className='text-[22px]' /> Add to Cart</Button>

            </div>

            <div className='flex items-center gap-4 mt-4'>
              <span className='flex items-center gap-2 text-[15px] link cursor-pointer font-[500]'>
                <FaRegHeart className='text-[18px]' /> Add to Wishlist
              </span>
              <span className='flex items-center gap-2 text-[15px] link cursor-pointer font-[500]'>
                <IoGitCompareOutline className='text-[18px]' /> Add to Compare
              </span>
            </div>
    </>
  )
}
