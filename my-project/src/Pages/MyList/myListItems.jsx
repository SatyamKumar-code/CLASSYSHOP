import React, { useContext, useState } from 'react'
import { IoCloseSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { MyContext } from '../../App';
import { deleteData } from '../../utils/api';

const MyListItems = (props) => {

    const context = useContext(MyContext);

    const title = props?.item?.productTitle || '';
    const length = context?.windowWidth < 667 ? 60 : 120;
    const displayTitle = title.length > length ? `${title.slice(0, length - 3)}...` : title;


    const removeItem = (id) => {
        deleteData(`/api/myList/${id}`).then((res) => {
            if(res?.error === false) {
                context?.alertBox("Success", res?.message);
                context?.getMyListData();
            }else {
                context?.alertBox("error", res?.message);
            }
        })
    }


    return (
    <div className='cartItem w-full p-3 flex items-center gap-2 border-b border-[rgba(0,0,0,0.1)]'>
                        <div className='img w-[140px] lg:w-[120px] h-[100px] lg:h-[110px] flex items-center! justify-center rounded-md overflow-hidden'>
                            <Link to={`/product/${props?.item?.productId}`} className='group'>
                            <img src={props?.item?.image} alt=""
                            className='group-hover:scale-105 w-full h-full transition-all' />
                            </Link>
                        </div>

                        <div className='info w-full h-30 lg:w-[85%] relative'>
                            <IoCloseSharp className='cursor-pointer absolute top-[0px] right-[0px] text-[22px] link transition-all' onClick={() => removeItem(props?.item?._id)}/>
                            <span className='text-[13px] font-mono'>{props?.item?.brand}</span>
                            <h3 className='text-[13px] md:text-[15                               px]'><Link to={`/product/${props?.item?.productId}`} className='link'>{displayTitle}</Link></h3>

                            <Rating name='size-small' value={props?.item?.rating} size='small' readOnly />
                            

                            <div className='flex items-center gap-4 mt-2 mb-2'>
                                <span className='price text-black text-[14px] font-[600]'>
                                    &#x20b9;{props?.item?.price}
                                </span>
                                <span className='oldPrice line-through text-gray-500 text-[14px] font-[500]'>
                                    &#x20b9;{props?.item?.oldPrice}
                                </span>
                                <span className='price text-primary text-[14px] font-[600]'>
                                    {props?.item?.discount}% OFF
                                </span>
                            </div>
                        </div>
                    </div>
  )
}

export default MyListItems;