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
                setProduct(res?.product);
            }
        })
    }, [id]);

    return (
        <>
            <div className='flex items-center justify-between px-2 py-0 mt-3'>
                <h2 className='text-[18px] font-[600]'>Products Details</h2>
            </div>

            <br />

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
                                    className={`zoomProductSliderThumbs link h-[500px] overflow-hidden ${product?.images?.length > 5 && 'space'}`}
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

                            <div className='zoomContainer w-[85%] h-[500px] overflow-hidden rounded-md'>
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
                        <span className='text-[14px]'>({product?.review?.length>0 ? product?.review?.length : 0}) Review</span>
                    </div>

                    <div className='flex items-center py-1'>
                        <span className='w-[20%] font-medium flex items-center gap-2 text-[14px]'>
                            <BsPatchCheckFill className='opacity-65' />
                            Published :
                        </span>
                        <span className='text-[14px]'>{product?.createdAt?.split('T')[0]}</span>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ProductDetails