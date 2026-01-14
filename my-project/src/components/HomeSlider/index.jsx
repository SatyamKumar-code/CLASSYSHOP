import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation, Autoplay } from 'swiper/modules';

const HomeSlider = (props) => {
    return (
        <div className='homeSlider py-5'>
            <div className='container'>
                <Swiper 
                loop={true}
                spaceBetween={10} 
                navigation={true} 
                modules={[Navigation, Autoplay]} 
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                className="sliderHome">
                    {
                        props?.data?.length!==0 && props?.data?.map((item, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <div className='item rounded-[17px] overflow-hidden'>
                                        <img src={item?.images[0]} alt="slide image"
                                            className='w-full' />
                                    </div>
                                </SwiperSlide>
                            )
                        })
                    }
                    

                </Swiper>
            </div>
        </div>
    )
}

export default HomeSlider;