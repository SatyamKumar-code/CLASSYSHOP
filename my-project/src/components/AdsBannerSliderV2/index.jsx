import React, { useContext } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

import { Navigation, FreeMode } from 'swiper/modules';
import BannerBoxV2 from '../bannerBoxV2';
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
            slidesPerView: 4.6,
            spaceBetween: 5,
          },
          550: {
            slidesPerView: 5.6,
            spaceBetween: 5,
          },
          900: {
            slidesPerView: 6.6,
            spaceBetween: 5,
          },
          1100: {
            slidesPerView: 8.6,
            spaceBetween: 5,
          },
        }}
      >
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