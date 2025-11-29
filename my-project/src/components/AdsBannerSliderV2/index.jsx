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
        <SwiperSlide>
            <BannerBoxV2  info="right" image={"https://serviceapi.spicezgold.com/download/1760160666204_1737020916820_New_Project_52.jpg"} link={'/'} />
        </SwiperSlide>
        <SwiperSlide>
            <BannerBoxV2  info="right" image={"https://serviceapi.spicezgold.com/download/1760160666204_1737020916820_New_Project_52.jpg"} link={'/'} />
        </SwiperSlide>
        <SwiperSlide>
            <BannerBoxV2  info="right" image={"https://serviceapi.spicezgold.com/download/1760160666204_1737020916820_New_Project_52.jpg"} link={'/'} />
        </SwiperSlide>
        <SwiperSlide>
            <BannerBoxV2  info="right" image={"https://serviceapi.spicezgold.com/download/1760160666204_1737020916820_New_Project_52.jpg"} link={'/'} />
        </SwiperSlide>
        <SwiperSlide>
            <BannerBoxV2  info="right" image={"https://serviceapi.spicezgold.com/download/1760160666204_1737020916820_New_Project_52.jpg"} link={'/'} />
        </SwiperSlide>
        <SwiperSlide>
            <BannerBoxV2  info="right" image={"https://serviceapi.spicezgold.com/download/1760160666204_1737020916820_New_Project_52.jpg"} link={'/'} />
        </SwiperSlide>
      </Swiper>
    </>
  )
}


export default AdsBannerSlider;