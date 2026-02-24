import React, { useContext } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';
import 'swiper/css/free-mode';

import { FreeMode, Navigation } from 'swiper/modules';
import { MyContext } from '../../App';

const HomeCatSlider = ( props ) => {

  const context = useContext(MyContext);
  return (
    <div className='homeCatSlider pt-0! py-4 lg:py-8 lg:pt-4'>
      <div className='container'>
        <Swiper
          slidesPerView={8}
          spaceBetween={10}
          navigation={context?.windowWidth > 922 ? true : false}
          modules={[Navigation, FreeMode]}  
          freeMode={true}
          breakpoints={{
            300 : {
                slidesPerView: 4.6,
                spaceBetween: 5,
            },
            550 : {
                slidesPerView: 5.6,
                spaceBetween: 5,
            },
            968 : {
                slidesPerView: 6.6,
                spaceBetween: 5,
            },
            1100 : {
                slidesPerView: 8.6,
                spaceBetween: 5,
            },
        }}
          className='mySwiper '
        >
          {
            props?.data?.map((cat, index) => {
              return (
                <SwiperSlide>
                  <Link to={`/products?catId=${cat?._id}`} key={index} className='h-full'>
                    <div className='item py-4 lg:py-7 px-3 bg-white rounded-sm text-center items-center flex justify-center flex-col'>
                      <img src={cat?.images[0]} alt="Category Slide"
                        className='w-[40%] lg:w-[60px] transition-all' />
                      <h3 className='text-[12px] lg:text-[15px] font-[500] mt-3'>{cat?.name}</h3>
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