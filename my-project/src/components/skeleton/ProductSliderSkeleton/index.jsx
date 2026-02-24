import React from 'react';
import './style.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const ProductItemSkeleton = () => {
  return (
    <div className='productItem skeleton-item shadow-lg rounded-md overflow-hidden border-1 border-[rgba(0,0,0,0.1)]'>
      <div className="imgWrapper w-[100%] overflow-hidden rounded-md relative">
        <div className='skeleton-img h-[220px] bg-gray-200 animate-pulse'></div>
      </div>

      <div className='info p-3'>
        <div className='skeleton-brand h-[14px] w-[60px] bg-gray-200 rounded animate-pulse mb-2'></div>
        <div className='skeleton-title h-[16px] w-[90%] bg-gray-200 rounded animate-pulse mb-2'></div>
        <div className='skeleton-rating h-[18px] w-[100px] bg-gray-200 rounded animate-pulse mb-2'></div>
        <div className='flex items-center gap-4'>
          <div className='skeleton-price h-[18px] w-[60px] bg-gray-200 rounded animate-pulse'></div>
          <div className='skeleton-price h-[18px] w-[70px] bg-gray-200 rounded animate-pulse'></div>
        </div>
      </div>
    </div>
  );
};

const ProductSliderSkeleton = ({ items = 6 }) => {
  return (
    <div className='productsSlider py-3'>
      <Swiper
        slidesPerView={items}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
        breakpoints={{
          300: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          650: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          922: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1025: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
          1222: {
            slidesPerView: 6,
            spaceBetween: 10,
          },
        }}
      >
        {
          [...Array(items)].map((_, index) => (
            <SwiperSlide key={index}>
              <ProductItemSkeleton />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  );
};

export default ProductSliderSkeleton;
