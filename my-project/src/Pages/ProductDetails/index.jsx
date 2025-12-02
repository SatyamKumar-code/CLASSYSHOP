import React from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import { ProductZoom } from '../../components/ProductZoom';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { QtyBox } from '../../components/Qt;yBox';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { FaRegHeart } from "react-icons/fa6";
import { IoGitCompareOutline } from "react-icons/io5";

export const ProductDetails = () => {

  const [productActionIndex, setProductActionIndex] = React.useState(null);
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
        <div className='container flex gap-8 items-center'>
          <div className='productZoomContainer w-[40%]'>
            <ProductZoom />
          </div>

      <div className='productContent w-[60%] pr-10'>
         <h1 className='text-[24px] font-[600] mb-2'>LIVE FASHION Black Women Printed PU Sling Bag</h1>
         <div className='flex items-center gap-3'>
          <span className='text-gray-400 text-[13px]'>
            Brand : <span className='font-[500] text-black opacity-75'>LIVE FASHION</span>
          </span>

          <Rating name='size-small' defaultValue={4} size='small' readOnly />
          <span className='text-[13px] cursor-pointer'>Review (5)</span>
         </div>

         <div className='flex items-center gap-4 mt-4'>
                <span className='oldPrice line-through text-gray-500 text-[20px] font-[500]'>$58.00</span>
                <span className='price text-[#ff5252] text-[20px] font-[600]'>$58.00</span>
                <span className='text-[14px]'>Available In Stock: <span className='text-green-600 text-[14px] font-bold'>147 Items</span></span>
            </div>
          
            <p className='mt-3 pr-10 mb-5'>This Sling Bag Is Made From The House Of LIVE FASHION. It's made from PU leather material.Very poor quality which will be available at road side. Already the stitches have gotten loose. The handle of the bag is secured with a stapler pin which is disappointing. the inside of the bag might poke which is dangerous</p>

            <div className='flex items-center gap-3'>
              <span className='text-[16px]'>Size: </span>
              <div className='flex items-center gap-1 actions'>
                <Button className={`${productActionIndex === 0 ? 'bg-primary text-white' : ''}`} onClick={()=> setProductActionIndex(0)}>S</Button>
                <Button className={`${productActionIndex === 1 ? 'bg-primary text-white' : ''}`} onClick={()=> setProductActionIndex(1)}>M</Button>
                <Button className={`${productActionIndex === 2 ? 'bg-primary text-white' : ''}`} onClick={()=> setProductActionIndex(2)}>L</Button>
                <Button className={`${productActionIndex === 3 ? 'bg-primary text-white' : ''}`} onClick={()=> setProductActionIndex(3)}>XL</Button>
              
              </div>
            </div>

            <p className='text-[14px] mt-4 mb-2'>Free Shipping (Est. Delivery Time 2-3 Days)</p>
            <div className='flex items-center gap-4'>
              <div className='qtyBoxWrapper w-[70px]'>
                <QtyBox />
              </div>
              
                <Button variant='contained' className='btn-org flex gap-2'>
                  <MdOutlineShoppingCart className='text-[22px]' /> Add to Cart</Button>
              
            </div>

            <div className='flex items-center gap-4 mt-6'>
                        <span className='flex items-center gap-2 text-[15px] link cursor-pointer font-[500]'>
                            <FaRegHeart className='text-[18px]' /> Add to Wishlist
                        </span>
                        <span className='flex items-center gap-2 text-[15px] link cursor-pointer font-[500]'>
                            <IoGitCompareOutline className='text-[18px]' /> Add to Compare
                        </span>
                    </div>
      </div>
        </div>
      </section>
    </>
  )
}
