import React, { useEffect, useRef, useState } from 'react'
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/styles.min.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useParams } from 'react-router-dom';
import { fetchDataFromApi } from '../../utils/api';
import { MdBrandingWatermark } from 'react-icons/md';
import { BiSolidCategoryAlt } from 'react-icons/bi';
import { MdFilterVintage } from 'react-icons/md';
import { MdRateReview } from 'react-icons/md';
import { BsPatchCheckFill } from 'react-icons/bs';
import Rating from '@mui/material/Rating';

const ProductDetails = () => {

    const [slideIndex, setSlideIndex] = useState(0);
    const [product, setProduct] = useState();
    const zoomSliderBig = useRef();
    const zoomSliderSmal = useRef();

    const { id } = useParams();

    const goto = (index) => {
        setSlideIndex(index);
        zoomSliderSmal.current.swiper.slideTo(index);
        zoomSliderBig.current.swiper.slideTo(index);
    }

    useEffect(() => {
        fetchDataFromApi(`/api/product/${id}`).then((res) => {
            if (res?.error === false) {
                setTimeout(() => {
                    setProduct(res?.product);
                }, 1500);
            }
        })
    }, [id]);

    return (
        <>
            <div className='flex items-center justify-between px-2 py-0 mt-3'>
                <h2 className='text-[18px] font-[600]'>Products Details</h2>
            </div>

            <br />

            {
                product?._id !== "" && product?._id !== undefined && product?._id !== null ?

                    <>
                        <div className='productDetails flex gap-8'>
                            <div className="w-[40%]">
                                {
                                    product?.images?.length !== 0 &&
                                    <div className='flex gap-3'>

                                        <div className={`slider w-[15%] `}>
                                            <Swiper
                                                ref={zoomSliderSmal}
                                                direction={'vertical'}
                                                slidesPerView={5}
                                                spaceBetween={10}
                                                navigation={true}
                                                modules={[Navigation]}
                                                className={`zoomProductSliderThumbs link h-[400px] overflow-hidden ${product?.images?.length > 5 && 'space'}`}
                                            >
                                                {
                                                    product?.images?.map((item, index) => {
                                                        return (
                                                            <SwiperSlide key={index}>
                                                                <div className={`item rounded-md overflow-hidden cursor-pointer group ${slideIndex === index ? 'opacity-100' : 'opacity-30'}`}
                                                                    onClick={() => goto(index)}>
                                                                    <img src={item} alt='product'
                                                                        className='w-full transition-all group-hover:scale-105' />
                                                                </div>
                                                            </SwiperSlide>
                                                        )
                                                    })
                                                }
                                                <SwiperSlide></SwiperSlide>
                                            </Swiper>

                                        </div>

                                        <div className='zoomContainer w-[85%] h-[400px]!   overflow-hidden rounded-md'>
                                            <Swiper
                                                ref={zoomSliderBig}
                                                slidesPerView={1}
                                                spaceBetween={0}
                                                navigation={false}
                                            >
                                                {
                                                    product?.images?.map((item, index) => {
                                                        return (
                                                            <SwiperSlide key={index}>
                                                                <InnerImageZoom
                                                                    zoomType='hover'
                                                                    zoomScale={1}
                                                                    src={item} />

                                                            </SwiperSlide>
                                                        )
                                                    })
                                                }
                                            </Swiper>
                                        </div>
                                    </div>
                                }

                            </div>

                            <div className="w-[60%]">
                                <h1 className='text-[25px] font-[500] mb-4'>{product?.name}</h1>

                                <div className='flex items-center py-1'>
                                    <span className='w-[20%] font-medium flex items-center gap-2 text-[14px]'>
                                        <MdBrandingWatermark className='opacity-65' />
                                        Brand :
                                    </span>
                                    <span className='text-[14px]'>{product?.brand}</span>
                                </div>

                                <div className='flex items-center py-1'>
                                    <span className='w-[20%] font-medium flex items-center gap-2 text-[14px]'>
                                        <BiSolidCategoryAlt className='opacity-65' />
                                        Category :
                                    </span>
                                    <span className='text-[14px]'>{product?.catName}</span>
                                </div>

                                {
                                    product?.productRam?.length !== 0 &&
                                    <div className='flex items-center py-1'>
                                        <span className='w-[20%] font-medium flex items-center gap-2 text-[14px]'>
                                            <MdFilterVintage className='opacity-65' />
                                            RAM :
                                        </span>

                                        <div className='flex items-center gap-2'>
                                            {
                                                product?.productRam?.map((ram, index) => {
                                                    return (
                                                        <span className='text-[12px] inline-block p-1 shadow-sm bg-[#fff] font-[500] ' key={index}>{ram}</span>
                                                    )
                                                })
                                            }
                                        </div>

                                    </div>
                                }

                                {
                                    product?.size?.length !== 0 &&
                                    <div className='flex items-center py-1'>
                                        <span className='w-[20%] font-medium flex items-center gap-2 text-[14px]'>
                                            <MdFilterVintage className='opacity-65' />
                                            SIZE :
                                        </span>

                                        <div className='flex items-center gap-2'>
                                            {
                                                product?.size?.map((size, index) => {
                                                    return (
                                                        <span className='text-[12px] inline-block p-1 shadow-sm bg-[#fff] font-[500] ' key={index}>{size}</span>
                                                    )
                                                })
                                            }
                                        </div>

                                    </div>
                                }

                                {
                                    product?.productWeight?.length !== 0 &&
                                    <div className='flex items-center py-1'>
                                        <span className='w-[20%] font-medium flex items-center gap-2 text-[14px]'>
                                            <MdFilterVintage className='opacity-65' />
                                            Weight :
                                        </span>

                                        <div className='flex items-center gap-2'>
                                            {
                                                product?.productWeight?.map((weight, index) => {
                                                    return (
                                                        <span className='text-[12px] inline-block p-1 shadow-sm bg-[#fff] font-[500] ' key={index}>{weight}</span>
                                                    )
                                                })
                                            }
                                        </div>

                                    </div>
                                }

                                <div className='flex items-center py-1'>
                                    <span className='w-[20%] font-medium flex items-center gap-2 text-[14px]'>
                                        <MdRateReview className='opacity-65' />
                                        Review :
                                    </span>
                                    <span className='text-[14px]'>({product?.review?.length > 0 ? product?.review?.length : 0}) Review</span>
                                </div>

                                <div className='flex items-center py-1'>
                                    <span className='w-[20%] font-medium flex items-center gap-2 text-[14px]'>
                                        <BsPatchCheckFill className='opacity-65' />
                                        Published :
                                    </span>
                                    <span className='text-[14px]'>{product?.createdAt?.split('T')[0]}</span>
                                </div>

                                <br />

                                <h2 className="text-[25px] font-[500]">Product Decription</h2>
                                {
                                    product?.description && <p className="text-[14px]">{product.description}</p>
                                }

                            </div>
                        </div>

                        <br />

                        <h2 className='text-[20px] font-medium'>Customer Reviews</h2>


                        <div className="reviewsWrap mt-3">
                            <div className="reviews w-full h-auto mb-3 p-4 bg-white rounded-sm shadow-md flex items-center justify-between">
                                <div className="flex items-center gap-8">
                                    <div className="img w-[85px] h-[85px] rounded-full overflow-hidden">
                                        <img src="https://up.yimg.com/ib/th/id/OIP.kf9TvsuxepBOhAV4cTHEoAHaHa?pid=Api&rs=1&c=1&qlt=95&w=121&h=121"
                                            className='h-full object-cover' />
                                    </div>

                                    <div className="info w-[80%]">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-[16px] font-medium">Naveen kumar</h4>
                                            <Rating name="read-only" value={4} readOnly size="small" />
                                        </div>
                                        <span className='text-[13px]'>2025-01-11</span>
                                        <p className="text-[13px] mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum consequatur laborum sapiente aut aperiam harum, velit qui porro aliquam, consequuntur, consectetur debitis labore reiciendis hic nisi doloribus tempore alias autem!
                                            Voluptate eligendi repellat! </p>
                                    </div>
                                </div>
                            </div>

                            <div className="reviews w-full h-auto mb-3 p-4 bg-white rounded-sm shadow-md flex items-center justify-between">
                                <div className="flex items-center gap-8">
                                    <div className="img w-[85px] h-[85px] rounded-full overflow-hidden">
                                        <img src="https://up.yimg.com/ib/th/id/OIP.kf9TvsuxepBOhAV4cTHEoAHaHa?pid=Api&rs=1&c=1&qlt=95&w=121&h=121"
                                            className='h-full object-cover' />
                                    </div>

                                    <div className="info w-[80%]">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-[16px] font-medium">Naveen kumar</h4>
                                            <Rating name="read-only" value={4} readOnly size="small" />
                                        </div>
                                        <span className='text-[13px]'>2025-01-11</span>
                                        <p className="text-[13px] mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum consequatur laborum sapiente aut aperiam harum, velit qui porro aliquam, consequuntur, consectetur debitis labore reiciendis hic nisi doloribus tempore alias autem!
                                            Voluptate eligendi repellat! </p>
                                    </div>
                                </div>
                            </div>



                            <div className="reviews w-full h-auto mb-3 p-4 bg-white rounded-sm shadow-md flex items-center justify-between">
                                <div className="flex items-center gap-8">
                                    <div className="img w-[85px] h-[85px] rounded-full overflow-hidden">
                                        <img src="https://up.yimg.com/ib/th/id/OIP.kf9TvsuxepBOhAV4cTHEoAHaHa?pid=Api&rs=1&c=1&qlt=95&w=121&h=121"
                                            className='h-full object-cover' />
                                    </div>

                                    <div className="info w-[80%]">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-[16px] font-medium">Naveen kumar</h4>
                                            <Rating name="read-only" value={4} readOnly size="small" />
                                        </div>
                                        <span className='text-[13px]'>2025-01-11</span>
                                        <p className="text-[13px] mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum consequatur laborum sapiente aut aperiam harum, velit qui porro aliquam, consequuntur, consectetur debitis labore reiciendis hic nisi doloribus tempore alias autem!
                                            Voluptate eligendi repellat! </p>
                                    </div>
                                </div>
                            </div>



                            <div className="reviews w-full h-auto mb-3 p-4 bg-white rounded-sm shadow-md flex items-center justify-between">
                                <div className="flex items-center gap-8">
                                    <div className="img w-[85px] h-[85px] rounded-full overflow-hidden">
                                        <img src="https://up.yimg.com/ib/th/id/OIP.kf9TvsuxepBOhAV4cTHEoAHaHa?pid=Api&rs=1&c=1&qlt=95&w=121&h=121"
                                            className='h-full object-cover' />
                                    </div>

                                    <div className="info w-[80%]">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-[16px] font-medium">Naveen kumar</h4>
                                            <Rating name="read-only" value={4} readOnly size="small" />
                                        </div>
                                        <span className='text-[13px]'>2025-01-11</span>
                                        <p className="text-[13px] mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum consequatur laborum sapiente aut aperiam harum, velit qui porro aliquam, consequuntur, consectetur debitis labore reiciendis hic nisi doloribus tempore alias autem!
                                            Voluptate eligendi repellat! </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                    :

                    <>
                        {/* Skeleton Loading */}
                        <div className='productDetails flex gap-8 animate-pulse'>
                            <div className="w-[40%]">
                                <div className='flex gap-3'>
                                    <div className='slider w-[15%] flex flex-col gap-2'>
                                        {[...Array(5)].map((_, index) => (
                                            <div key={index} className='w-full h-[70px] bg-gray-300 rounded-md'></div>
                                        ))}
                                    </div>
                                    <div className='w-[85%] h-[400px] bg-gray-300 rounded-md'></div>
                                </div>
                            </div>

                            <div className="w-[60%]">
                                <div className='h-[30px] w-[70%] bg-gray-300 rounded mb-4'></div>

                                <div className='flex items-center py-2'>
                                    <div className='w-[20%] h-[20px] bg-gray-300 rounded'></div>
                                    <div className='w-[30%] h-[20px] bg-gray-300 rounded ml-2'></div>
                                </div>

                                <div className='flex items-center py-2'>
                                    <div className='w-[20%] h-[20px] bg-gray-300 rounded'></div>
                                    <div className='w-[25%] h-[20px] bg-gray-300 rounded ml-2'></div>
                                </div>

                                <div className='flex items-center py-2'>
                                    <div className='w-[20%] h-[20px] bg-gray-300 rounded'></div>
                                    <div className='flex gap-2 ml-2'>
                                        <div className='w-[40px] h-[25px] bg-gray-300 rounded'></div>
                                        <div className='w-[40px] h-[25px] bg-gray-300 rounded'></div>
                                        <div className='w-[40px] h-[25px] bg-gray-300 rounded'></div>
                                    </div>
                                </div>

                                <div className='flex items-center py-2'>
                                    <div className='w-[20%] h-[20px] bg-gray-300 rounded'></div>
                                    <div className='w-[20%] h-[20px] bg-gray-300 rounded ml-2'></div>
                                </div>

                                <div className='flex items-center py-2'>
                                    <div className='w-[20%] h-[20px] bg-gray-300 rounded'></div>
                                    <div className='w-[25%] h-[20px] bg-gray-300 rounded ml-2'></div>
                                </div>

                                <br />

                                <div className='h-[25px] w-[50%] bg-gray-300 rounded mb-3'></div>
                                <div className='h-[15px] w-[100%] bg-gray-300 rounded mb-2'></div>
                                <div className='h-[15px] w-[90%] bg-gray-300 rounded mb-2'></div>
                                <div className='h-[15px] w-[80%] bg-gray-300 rounded'></div>
                            </div>
                        </div>

                        <br />

                        <div className='h-[25px] w-[200px] bg-gray-300 rounded animate-pulse'></div>

                        <div className="reviewsWrap mt-3">
                            {[...Array(3)].map((_, index) => (
                                <div key={index} className="reviews w-full h-auto mb-3 p-4 bg-white rounded-sm shadow-md flex items-center animate-pulse">
                                    <div className="flex items-center gap-8 w-full">
                                        <div className="w-[85px] h-[85px] rounded-full bg-gray-300"></div>
                                        <div className="info w-[80%]">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className='h-[18px] w-[120px] bg-gray-300 rounded'></div>
                                                <div className='h-[18px] w-[100px] bg-gray-300 rounded'></div>
                                            </div>
                                            <div className='h-[14px] w-[80px] bg-gray-300 rounded mb-2'></div>
                                            <div className='h-[14px] w-[100%] bg-gray-300 rounded mb-1'></div>
                                            <div className='h-[14px] w-[90%] bg-gray-300 rounded mb-1'></div>
                                            <div className='h-[14px] w-[70%] bg-gray-300 rounded'></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>

            }




        </>
    )
}

export default ProductDetails