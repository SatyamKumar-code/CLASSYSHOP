import React, { useContext, useRef, useState } from 'react'
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/styles.min.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../App';

export const ProductZoom = (props) => {

    const [ slideIndex, setSlideIndex ] = useState(0);
    const zoomSliderBig = useRef();
    const zoomSliderSmal = useRef();

    const context = useContext(MyContext);

    const goto = (index) => {
        setSlideIndex(index);
        zoomSliderSmal.current.swiper.slideTo(index);
        zoomSliderBig.current.swiper.slideTo(index);
    }
  return (
    <>
    <div className='flex flex-col lg:flex-row gap-3'>

    {
        context?.windowWidth > 1024 && (
            <div className='slider w-full lg:w-[15%] order-2 lg:order-1'>
                <Swiper
                    ref={zoomSliderSmal}
                    direction={context?.windowWidth < 922 ? "horizontal" : "vertical"}
                    slidesPerView={5}
                    spaceBetween={10}
                    navigation={context?.windowWidth > 922 ? true : false}
                    modules={[Navigation]}
                    className={`zoomProductSliderThumbs link h-auto lg:h-[420px] overflow-hidden ${props?.images?.length > 5 && 'space'}`}
                >
                    {
                        props?.images?.map((item, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <div className={`item rounded-md overflow-hidden cursor-pointer group h-full ${slideIndex === index ? 'opacity-100' : 'opacity-30'}`}
                                        onClick={() => goto(index)}>
                                        <img src={item} alt='product'
                                            className='w-full transition-all group-hover:scale-105' />
                                    </div>
                                </SwiperSlide>
                            )
                        })
                    }

                </Swiper>

            </div>
        )
    }
        

        <div className='zoomContainer w-full lg:w-[85%] h-auto lg:h-[500px] overflow-hidden rounded-md order-1 lg:order-2 '>
            <Swiper
                ref={zoomSliderBig}
                slidesPerView={1}
                spaceBetween={0}
                navigation={false}
            >
            {
                props?.images?.map((item, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <InnerImageZoom
                                zoomType='hover'
                                zoomScale={1}
                                src={item} />
                        </SwiperSlide>
                    )
                })
            }

            </Swiper>
        </div>
    </div>
    </>
  )
}
