import React, { useState } from 'react'
import { IoCloseSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { GoTriangleDown } from 'react-icons/go';
import Rating from '@mui/material/Rating';

const CartItems = (props) => {


    const [sizeanchorEl, setSizeAnchorEl] = useState(null);
    const [selectedSize, setCartItems] = useState(props.size) ;
    const openSize = Boolean(sizeanchorEl);

    const [qtyanchorEl, setQtyAnchorEl] = useState(null);
    const [selectedQty, setSelectedQty] = useState(props.qty) ;
    const openQty = Boolean(qtyanchorEl);

    const handleClickSize = (event) => {
        setSizeAnchorEl(event.currentTarget);
    };
    const handleCloseSize = (value) => {
        setSizeAnchorEl(null);
        if(value){
            setCartItems(value);
        }
    };

    const handleClickQty = (event) => {
        setQtyAnchorEl(event.currentTarget);
    };
    const handleCloseQty = (value) => {
        setQtyAnchorEl(null);
        if(value){
            setSelectedQty(value);
        }
    };

  return (
    <div className='cartItem w-full p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)]'>
                        <div className='img w-[15%] rounded-md overflow-hidden'>
                            <Link to={`/product/${props?.item?._id}`} className='group'>
                            <img src={props?.item?.image} 
                            className='w-full group-hover:scale-105 transition-all' />
                            </Link>
                        </div>

                        <div className='info w-[85%] relative'>
                            <IoCloseSharp className='cursor-pointer absolute top-[0px] right-[0px] text-[22px] link transition-all'/>
                            <span className='text-[13px]'>{props?.item?.brand}</span>
                            <h3 className='text-[16px]'><Link to={`/product/${props?.item?._id}`} className='link'>{props?.item?.productTitle}</Link></h3>

                            <Rating name='size-small' value={props?.item?.rating} size='small' readOnly />
                            <div className='flex items-center gap-4 mt-2'>
                                <div className='relative'>
                                    <span className='flex items-center justify-center bg-[#f1f1f1] text-[11px] font-[600] py-1 px-2 rounded-md cursor-pointer'
                                    onClick={handleClickSize}
                                    >
                                    Size: {selectedSize}<GoTriangleDown />
                                    </span>
                                    <Menu
                                    id="size-menu"
                                    anchorEl={sizeanchorEl}
                                    open={openSize}
                                    onClose={() => handleCloseSize(null)}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                    >
                                        {
                                            props?.productSizeData?.map((item, index) => {
                                                return (
                                                    <MenuItem 
                                                        key={index}  
                                                        className={`${item?.name === selectedSize ? "bg-primary text-white" : ""}`}  
                                                        onClick={() => handleCloseSize(item?.name)}
                                                    >{item?.name}</MenuItem>
                                                )
                                            })
                                        }
                                    </Menu>
                                </div>
                                
                                <div className='relative'>
                                    <span className='flex items-center justify-center bg-[#f1f1f1] text-[11px] font-[600] py-1 px-2 rounded-md cursor-pointer'
                                    onClick={handleClickQty}
                                    >
                                    Qty:  {selectedQty} <GoTriangleDown />
                                    </span>

                                    <Menu
                                    id="size-menu"
                                    anchorEl={qtyanchorEl}
                                    open={openQty}
                                    onClose={() => handleCloseQty(null)}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                    >
                                        {
                                            props?.productSizeData?.map((item, index) => {
                                                return (
                                                    <MenuItem 
                                                        key={index}  
                                                        className={`${item?.name === selectedSize ? "bg-primary text-white" : ""}`}  
                                                        onClick={() => handleCloseQty(1)}
                                                    >{item?.name}</MenuItem>
                                                )
                                            })
                                        }
                                    
                                    
                                    </Menu>
                                </div>
                            </div>

                            <div className='flex items-center gap-4 mt-2'>
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
                        </div>
                    </div>
  )
}

export default CartItems;