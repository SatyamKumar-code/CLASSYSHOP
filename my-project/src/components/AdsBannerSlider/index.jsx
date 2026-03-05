import React, { useContext, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

import { Navigation, FreeMode } from 'swiper/modules';
import BannerBox from '../BannerBox';
import { MyContext } from '../../App';
import { fetchDataFromApi } from '../../utils/api';
import { Link } from 'react-router-dom';

const AdsBannerSlider = (props) => {

  const [productsBanner, setProductsBanner] = useState([]);

  const context = useContext(MyContext);

  useEffect(() => {
    // If banners are passed as props, use them; otherwise fetch from API
    if (props.data && props.data.length > 0) {
      setProductsBanner(props.data);
    } else if (!props.data) {
      fetchDataFromApi("/api/product/getAllProductsBanner").then((res) => {
        setProductsBanner(res?.banners);
      });
    }
  }, [props.data]);

  if (!productsBanner || productsBanner.length === 0) return null;

  return (
    <>
    <Swiper 
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
        {
          productsBanner?.length !== 0 &&
          productsBanner?.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <BannerBox img={item?.bannerImage} link={`/product/${item?._id}`} />
              </SwiperSlide>
            )
          })
        }
        
        
      </Swiper>
    </>
  )
}


export default AdsBannerSlider;