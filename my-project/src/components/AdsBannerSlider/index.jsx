import React, { useContext } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

import { Navigation, FreeMode } from 'swiper/modules';
import BannerBox from '../BannerBox';
import { MyContext } from '../../App';

const AdsBannerSlider = (props) => {

    const context = useContext(MyContext);

    
  return (
    <>
    <Swiper 
        slidesPerView={props.items} 
        spaceBetween={10} 
        navigation={context?.windowWidth > 922 ? true : false} 
        modules={[Navigation, FreeMode]}
          className="smalBtn"
          freeMode={true}
          breakpoints={{
            300: {
              slidesPerView: 1,
              spaceBetween: 5,
            },
            450: {
              slidesPerView: 2,
              spaceBetween: 5,
            },
            750: {
              slidesPerView: 3,
              spaceBetween: 5,
            },
            1100: {
              slidesPerView: 4,
              spaceBetween: 5,
            },
          }}
        >
        <SwiperSlide>
            <BannerBox  img={'https://serviceapi.spicezgold.com/download/1741669037986_banner2.webp'} link={'/'} />
        </SwiperSlide>
        <SwiperSlide>
            <BannerBox  img={'https://serviceapi.spicezgold.com/download/1741669057847_banner5.webp'} link={'/'} />
        </SwiperSlide>
        <SwiperSlide>
            <BannerBox  img={'https://serviceapi.spicezgold.com/download/1742453755529_1741669087880_banner6.webp'} link={'/'} />
        </SwiperSlide>
        <SwiperSlide>
            <BannerBox  img={'https://serviceapi.spicezgold.com/download/1763693112742_banner1.webp'} link={'/'} />
        </SwiperSlide>
        <SwiperSlide>
            <BannerBox  img={'https://serviceapi.spicezgold.com/download/1741669037986_banner2.webp'} link={'/'} />
        </SwiperSlide>
        <SwiperSlide>
            <BannerBox  img={'https://serviceapi.spicezgold.com/download/1741669037986_banner2.webp'} link={'/'} />
        </SwiperSlide>
      </Swiper>
    </>
  )
}


export default AdsBannerSlider;