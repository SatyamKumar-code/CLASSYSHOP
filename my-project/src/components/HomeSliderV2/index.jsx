import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

import { Navigation, Autoplay, EffectFade, Pagination } from 'swiper/modules';
import Button from '@mui/material/Button';

const HomeBannerV2 = (props) => {
  return (
      <Swiper
          loop={true}
          spaceBetween={30}
          navigation={true}
          effect={'fade'}
          pagination= {{
            clickable: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[ EffectFade, Navigation, Pagination, Autoplay]}
          className="HomeSliderV2">
          
          {
            props?.data?.map((item, index) => {
                if(item?.isDisplayOnHomeBanner !== true){
                    return null;
                }
                return (
                    <SwiperSlide>
                        <div className='item w-full rounded-md overflow-hidden relative'>
                            <img src={item?.bannerImage[0]} alt="" />
                            <div className='info absolute top-0 -right-[100%] opacity-0 w-[50%] h-[100%] z-50 p-8 flex items-center flex-col justify-center transition-all'>
                                <h4 className='text-[18px] font-[500] w-full text-left mb-3 relative -right-[100%] opacity-0'>{item?.bannerTitlename}</h4>
                                <h2 className='text-[35px] font-[700] w-full relative -right-[100%] opacity-0'>{item?.name}</h2>

                                <h3 className='flex items-center gap-3 text-[18px] font-[500] w-full text-left mt-3 mb-3 relative -right-[100%] opacity-0'>Starting At Only <span className='text-primary text-[30px]'>&#x20b9;{item?.price}</span></h3>

                                <div className='w-full btn relative -right-[100%] opacity-0'>
                                    <Button className='btn-org'>Shop Now</Button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                )
            })
          }

      </Swiper>
  )
}

export default HomeBannerV2;