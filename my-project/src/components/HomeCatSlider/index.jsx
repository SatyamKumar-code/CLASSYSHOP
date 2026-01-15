import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';

import { Navigation } from 'swiper/modules';

const HomeCatSlider = ( props ) => {
  return (
    <div className='homeCatSlider py-8 pt-4'>
      <div className='container'>
        <Swiper
          slidesPerView={8}
          spaceBetween={10}
          navigation={true}
          modules={[Navigation]}  
          className='mySwiper '
        >
          {
            props?.data?.map((cat, index) => {
              return (
                <SwiperSlide>
                  <Link to="/">
                    <div className='item py-7 px-3 bg-white rounded-sm text-center items-center flex justify-center flex-col'>
                      <img src={cat?.images[0]} alt="Category Slide"
                        className='w-[60px] transition-all' />
                      <h3 className='text-[15px] font-[500] mt-3'>{cat?.name}</h3>
                    </div>
                  </Link>
                </SwiperSlide>
              )
            })
          }
        </Swiper>
      </div>
    </div>
  )
}
export default HomeCatSlider;