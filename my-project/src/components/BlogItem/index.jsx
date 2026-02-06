import React from 'react'
import { IoMdTime } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';

const BlogItem = (props) => {
  return (
    <div className='blogItem group'>
        <div className='imgWrapper w-full overflow-hidden rounded-md cursor-pointer relative'>
            <img src={props?.item?.images?.[0]} 
            className='w-full transition-all group-hover:scale-105 group-hover:rotate-1' 
            alt='blog image' />
            <span className='flex items-center justify-center text-white absolute bottom-[15px] right-[15px] z-50 bg-[#ff5252] rounded-md p-1 text-[11px] font-[500] gap-1'>
                <IoMdTime className='text-[16px]' /> {props?.item?.createdAt?.split("T")?.[0]}
            </span>
        </div>

        <div className='info py-4'>
            <h2 className='text-[15px] font-[600] text-black mb-3'>
                <Link to="/" className='link'>{props?.item?.title}</Link>
            </h2>
            <div dangerouslySetInnerHTML={{ __html: props?.item?.description?.substr(0,100)+'...'}}></div>

                <Link className='link font-[500] text-[14px] flex items-center gap-1'>Read More <IoIosArrowForward /></Link>
        </div>
    </div>
  )
}

export default BlogItem