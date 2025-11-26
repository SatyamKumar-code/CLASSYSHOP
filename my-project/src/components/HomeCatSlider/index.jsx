import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';

import { Navigation } from 'swiper/modules';

const HomeCatSlider = () => {
  return (
    <div className='homeCatSlider'>
      <div className='container py-4'>
        <Swiper
          slidesPerView={8}
          spaceBetween={10}
          modules={[Navigation]}
          className='mySwiper'
        >
          <SwiperSlide>
            <Link to="/">
              <div className='item py-7 px-3 bg-white rounded-sm text-center items-center flex justify-center flex-col'>
                <img src="https://serviceapi.spicezgold.com/download/1763965324754_4819.png" alt="Category Slide"
                  className='w-[60px] transition-all' />
                <h3 className='text-[15px] font-[500] mt-3'>Fashion</h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className='item py-7 px-3 bg-white rounded-sm text-center items-center flex justify-center flex-col'>
                <img src="https://serviceapi.spicezgold.com/download/1761905929738_file_1734525218436_ele.png" alt="Category Slide"
                  className='w-[60px] transition-all' />
                <h3 className='text-[15px] font-[500] mt-3'>Electronics</h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className='item py-7 px-3 bg-white rounded-sm text-center items-center flex justify-center flex-col'>
                <img src="https://serviceapi.spicezgold.com/download/1761905971086_file_1734525231018_bag.png" alt="Category Slide"
                  className='w-[60px] transition-all' />
                <h3 className='text-[15px] font-[500] mt-3'>Bags</h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className='item py-7 px-3 bg-white rounded-sm text-center items-center flex justify-center flex-col'>
                <img src="https://serviceapi.spicezgold.com/download/1761905982766_file_1734525239704_foot.png" alt="Category Slide"
                  className='w-[60px] transition-all' />
                <h3 className='text-[15px] font-[500] mt-3'>Footwear</h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className='item py-7 px-3 bg-white rounded-sm text-center items-center flex justify-center flex-col'>
                <img src="https://serviceapi.spicezgold.com/download/1761905996339_file_1734525248057_gro.png" alt="Category Slide"
                  className='w-[60px] transition-all' />
                <h3 className='text-[15px] font-[500] mt-3'>Groceries</h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className='item py-7 px-3 bg-white rounded-sm text-center items-center flex justify-center flex-col'>
                <img src="https://serviceapi.spicezgold.com/download/1761906005923_file_1734525255799_beauty(1).png" alt="Category Slide"
                  className='w-[60px] transition-all' />
                <h3 className='text-[15px] font-[500] mt-3'>Beauty</h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className='item py-7 px-3 bg-white rounded-sm text-center items-center flex justify-center flex-col'>
                <img src="https://serviceapi.spicezgold.com/download/1761906015678_file_1734525275367_well.png" alt="Category Slide"
                  className='w-[60px] transition-all' />
                <h3 className='text-[15px] font-[500] mt-3'>Wellness</h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className='item py-7 px-3 bg-white rounded-sm text-center items-center flex justify-center flex-col'>
                <img src="https://serviceapi.spicezgold.com/download/1761906025549_file_1734525286186_jw.png" alt="Category Slide"
                  className='w-[60px] transition-all' />
                <h3 className='text-[15px] font-[500] mt-3'>Jewelry</h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div className='item py-7 px-3 bg-white rounded-sm text-center items-center flex justify-center flex-col'>
                <img src="https://serviceapi.spicezgold.com/download/1753712430060_fireboltt-ninja-call-pro-plus-smart-watch-with-bluetooth-calling-black-digital-o493664720-p597671841-0-202501041659.webp" alt="Category Slide"
                  className='w-[60px] transition-all' />
                <h3 className='text-[15px] font-[500] mt-3'>Watches</h3>
              </div>
            </Link>
          </SwiperSlide>

        </Swiper>
      </div>
    </div>
  )
}
export default HomeCatSlider;