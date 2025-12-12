import React, { useState } from 'react'
import { IoCloseSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';

const MyListItems = (props) => {


  return (
    <div className='cartItem w-full p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)]'>
                        <div className='img w-[15%] rounded-md overflow-hidden'>
                            <Link to="/product/1" className='group'>
                            <img src="https://www.jiomart.com/images/product/original/rvzv96iwuq/tnw-dark-blue-fabric-men-and-women-messenger-bag-15-l-product-images-rvzv96iwuq-0-202212062013.jpg" 
                            className='w-full group-hover:scale-105 transition-all' />
                            </Link>
                        </div>

                        <div className='info w-[85%] relative'>
                            <IoCloseSharp className='cursor-pointer absolute top-[0px] right-[0px] text-[22px] link transition-all'/>
                            <span className='text-[13px]'>Sangria</span>
                            <h3 className='text-[16px]'><Link to="/product/1" className='link'>Dark Blue Fabric Messenger Bag</Link></h3>

                            <Rating name='size-small' defaultValue={4} size='small' readOnly />
                            

                            <div className='flex items-center gap-4 mt-2 mb-2'>
                                <span className='price text-black text-[14px] font-[600]'>
                                    $45.00
                                </span>
                                <span className='oldPrice line-through text-gray-500 text-[14px] font-[500]'>
                                    $58.00
                                </span>
                                <span className='price text-primary text-[14px] font-[600]'>
                                    55% OFF
                                </span>
                            </div>


                            <Button className='btn-org btn-sm'>Add to Cart</Button>
                        </div>
                    </div>
  )
}

export default MyListItems;