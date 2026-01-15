import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import ProductItem from '../ProductItem';

const ProductsSlider = (props) => {
  return (
    <div className='productsSlider py-3'>
        <Swiper
            slidesPerView={props.items}
            spaceBetween={10}
            navigation={true}
            modules={[Navigation]}
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