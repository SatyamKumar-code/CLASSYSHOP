import React from 'react'
import { IoMdClose } from 'react-icons/io';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import UploadBox from '../../Components/UploadBox';
import Button from '@mui/material/Button';
import { FaCloudUploadAlt } from 'react-icons/fa';

const AddCategory = () => {
    return (
        <div className='p-5 bg-gray-50'>
            <form className='form py-3 p-8'>
                <div className='scroll max-h-[72vh] overflow-y-scroll pr-4 pt-4'>

                    <div className='grid grid-cols-4 mb-3'>
                        <div className='col'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Category Name</h3>
                            <input type='text' className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm bg-white' />
                        </div>
                    </div>

                    <br />
                    <h3 className='text-[18px] font-[500] mb-1 text-black'>Category Image</h3>

                    <br />
                    
                    <div className='grid grid-cols-7 gap-4'>
                        <div className='uploadBoxWrapper relative'>
                            <span className='absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] -right-[5px] flex items-center justify-center z-50 cursor-pointer'><IoMdClose className='text-white text-[17px]' /></span>
                            <div className='uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative'>
                                <LazyLoadImage
                                    alt={"image"}
                                    effect="blur"
                                    wrapperProps={{
                                        style: { transitionDelay: "1s" }
                                    }}
                                    src={'https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/15.webp'}
                                />
                            </div>
                        </div>


                        <UploadBox multiple={true} />
                    </div>
                </div>
                <br />
                <br />
                <div className='w-[250px]'>
                    <Button type='button' className='btn-blue btn-lg w-full flext gap-2'> <FaCloudUploadAlt className='text-[25px] text-white' /> Publish & View</Button>
                </div>
            </form>
        </div >
    )
}

export default AddCategory;