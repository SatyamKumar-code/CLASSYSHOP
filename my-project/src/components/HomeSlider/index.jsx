import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';

const HomeSlider = () => {
    return (
        <div className='homeSlider py-4'>
            <div className='container'>
                <Swiper spaceBetween={10} navigation={true} modules={[Navigation]} className="sliderHome">
                    <SwiperSlide>
                        <div className='item rounded-[17px] overflow-hidden'>
                            <img src="https://serviceapi.spicezgold.com/download/1763824421574_homeslide5.jpg" alt="Banner slide"
                            className='w-full' />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='item rounded-[17px] overflow-hidden'>
                        <img src="https://serviceapi.spicezgold.com/download/1763051442252_34296.jpg" alt="Banner slide"
                            className='w-full' />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='item rounded-[17px] overflow-hidden'>
                        <img src="https://serviceapi.spicezgold.com/download/1763812170460_homeslides2.jpg" alt="Banner slide"
                            className='w-full' />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='item rounded-[17px] overflow-hidden'>
                        <img src="https://serviceapi.spicezgold.com/download/1759938751802_30744.jpg" alt="Banner slide"
                            className='w-full' />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='item rounded-[17px] overflow-hidden'>
                        <img src="https://serviceapi.spicezgold.com/download/1751685130717_NewProject(8).jpg" alt="Banner slide"
                            className='w-full' />
                        </div>
                    </SwiperSlide>

                </Swiper>
            </div>
        </div>
    )
}

export default HomeSlider;