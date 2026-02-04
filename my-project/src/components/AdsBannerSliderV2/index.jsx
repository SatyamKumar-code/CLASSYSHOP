import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';
import BannerBoxV2 from '../bannerBoxV2';

const AdsBannerSlider = (props) => {
  return (
    <>
    <Swiper slidesPerView={props.items} spaceBetween={10} navigation={true} modules={[Navigation]} className="smalBtn">
        {
            props?.data?.map((item, index) => {
                return (
                    <SwiperSlide key={index}> 
                        <BannerBoxV2 info={item?.alignInfo} item={item} image={item.images[0]} link={item.link} />
                    </SwiperSlide>
                )
            })
        }
      </Swiper>
    </>
  )
}


export default AdsBannerSlider;