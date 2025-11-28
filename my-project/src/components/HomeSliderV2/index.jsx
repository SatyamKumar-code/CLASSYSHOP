import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

import { Navigation, Autoplay, EffectFade, Pagination } from 'swiper/modules';
import Button from '@mui/material/Button';

const HomeBannerV2 = () => {
  return (
      <Swiper
          loop={true}
          spaceBetween={30}
          navigation={true}
          effect={'fade'}
          pagination= {{
            clickable: true,
          }}
          modules={[ EffectFade, Navigation, Pagination]}
          className="HomeSliderV2">
          <SwiperSlide>
              <div className='item w-full rounded-md overflow-hidden relative'>
                <img src="https://serviceapi.spicezgold.com/download/1756273096312_1737036773579_sample-1.jpg" alt="" />
                <div className='info absolute top-0 -right-[100%] opacity-0 w-[50%] h-[100%] z-50 p-8 flex items-center flex-col justify-center transition-all'>
                    <h4 className='text-[18px] font-[500] w-full text-left mb-3 relative -right-[100%] opacity-0'>Big Saving Days Sale</h4>
                    <h2 className='text-[35px] font-[700] w-full relative -right-[100%] opacity-0'>Women Solid Round Green T-Shirt</h2>

                    <h3 className='flex items-center gap-3 text-[18px] font-[500] w-full text-left mt-3 mb-3 relative -right-[100%] opacity-0'>Starting At Only <span className='text-primary text-[30px]'>$59.99</span></h3>

                    <div className='w-full btn relative -right-[100%] opacity-0'>
                        <Button className='btn-org'>Shop Now</Button>
                    </div>
                </div>
              </div>
          </SwiperSlide>
          <SwiperSlide>
              <div className='item w-full rounded-md overflow-hidden'>
                <img src="https://serviceapi.spicezgold.com/download/1742441193376_1737037654953_New_Project_45.jpg" alt="" />
                <div className='info absolute top-0 -right-[100%] opacity-0 w-[50%] h-[100%] z-50 p-8 flex items-center flex-col justify-center transition-all duration-700'>
                    <h4 className='text-[18px] font-[500] w-full text-left mb-3 relative -right-[100%] opacity-0'>Big Saving Day Sale</h4>
                    <h2 className='text-[35px] font-[700] w-full relative -right-[100%] opacity-0'>By Modern Mobile In Oreng Color</h2>

                    <h3 className='flex items-center gap-3 text-[18px] font-[500] w-full text-left mt-3 mb-3 relative -right-[100%] opacity-0'>Starting At Only <span className='text-primary text-[30px]'>$99.99</span></h3>

                    <div className='w-full btn relative -right-[100%] opacity-0'>
                        <Button className='btn-org'>Shop Now</Button>
                    </div>
                </div>
              </div>
          </SwiperSlide>

      </Swiper>
  )
}

export default HomeBannerV2;