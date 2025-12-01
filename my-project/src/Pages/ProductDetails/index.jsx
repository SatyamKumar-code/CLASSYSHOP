import React from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import { ProductZoom } from '../../components/ProductZoom';
import Rating from '@mui/material/Rating';

export const ProductDetails = () => {
  return (
    <>
      <div className='py-5'>

        <div className='container'>
          <Breadcrumbs aria-label="breadcrumb">
            <Link to="/"
              underline="hover"
              color="inherit"
              className='link transition !text-[14px]'>
              Home
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="/"
              className='link transition !text-[14px]'
            >
              Fashion
            </Link>
            <Link
              underline="hover"
              color="inherit"
              className='link transition !text-[14px]'
            >
              Cropped Satin Bomber Jacket
            </Link>
          </Breadcrumbs>
        </div>
      </div>

      <section className='bg-white py-5'>
        <div className='container flex gap-8'>
          <div className='productZoomContainer w-[40%]'>
            <ProductZoom />
          </div>

      <div className='productContent w-[60%]'>
         <h1 className='text-[22px] font-[600] mb-2'>LIVE FASHION Black Women Printed PU Sling Bag</h1>
         <div className='flex items-center gap-3'>
          <span className='text-gray-400 text-[13px]'>
            Brand : <span className='font-[500] text-black opacity-75'>LIVE FASHION</span>
          </span>

          <Rating name='size-small' defaultValue={4} size='small' readOnly />
          <span className='text-[13px] cursor-pointer'>Review (5)</span>
         </div>

         <div className='flex items-center gap-4 mt-4'>
                <span className='oldPrice line-through text-gray-500 text-[18px] font-[500]'>$58.00</span>
                <span className='price text-[#ff5252] text-[18px] font-[600]'>$58.00</span>
            </div>
          <br />
            <p>This Sling Bag Is Made From The House Of LIVE FASHION. It's made from PU leather material.Very poor quality which will be available at road side. Already the stitches have gotten loose. The handle of the bag is secured with a stapler pin which is disappointing. the inside of the bag might poke which is dangerous</p>
      </div>
        </div>
      </section>
    </>
  )
}
