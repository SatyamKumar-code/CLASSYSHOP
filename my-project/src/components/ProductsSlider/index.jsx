import React, { useContext } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

import ProductItem from '../ProductItem';
import { MyContext } from '../../App';

const ProductsSlider = (props) => {

    const context = useContext(MyContext);
  return (
    <div className='productsSlider py-3'>
        <Swiper
            slidesPerView={props.items}
            spaceBetween={10}
            navigation={context?.windowWidth > 922 ? true : false}
            modules={[Navigation, FreeMode]}
            freeMode={true}
            breakpoints={{
                250: {
                    slidesPerView: 1.1,
                    spaceBetween: 10,
                },
                350: {
                    slidesPerView: 2.13,
                    spaceBetween: 10,
                },
                400: {
                    slidesPerView: 2.1,
                    spaceBetween: 10,
                },
                768: {
                    slidesPerView: 4.1,
                    spaceBetween: 10,
                },
                922: {
                    slidesPerView: 4.1,
                    spaceBetween: 10,
                },
                1025: {
                    slidesPerView: 5.12,
                    spaceBetween: 10,
                },
                1222: {
                    slidesPerView: 6.09,
                    spaceBetween: 10,
                },
            }}
            className="mySwiper"
        >
            {
                props?.data?.map((item, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <ProductItem item={item} />
                        </SwiperSlide>
                    )
                })
            }
            
            
        </Swiper>
    </div>
  )
}

export default ProductsSlider;