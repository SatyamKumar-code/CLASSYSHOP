import React from 'react'
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/styles.min.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

export const ProductZoom = () => {

    const [ slideIndex, setSlideIndex ] = React.useState(0);
    const zoomSliderBig = React.useRef();
    const zoomSliderSmal = React.useRef();

    const goto = (index) => {
        setSlideIndex(index);
        zoomSliderSmal.current.swiper.slideTo(index);
        zoomSliderBig.current.swiper.slideTo(index);
    }
  return (
    <>
    <div className='flex gap-3'>

        <div className='slider w-[15%]'>
            <Swiper
            ref={zoomSliderSmal}
            direction={'vertical'}
            slidesPerView={4}
            spaceBetween={0}
            navigation={true}
            modules={[Navigation]}
            className='zoomProductSliderThumbs link h-[500px] overflow-hidden'
            >
            <SwiperSlide>
                <div className={`item rounded-md overflow-hidden cursor-pointer group ${slideIndex === 0 ? 'opacity-100' : 'opacity-30' }`}
                onClick={() => goto(0)}>
                    <img src='https://www.jiomart.com/images/product/original/rvvtluazsa/live-fashion-black-women-printed-pu-sling-bag-product-images-rvvtluazsa-0-202409201509.jpg?im=Resize=(600,750)' alt='product'
                    className='w-full transition-all group-hover:scale-105' />
                </div>
            </SwiperSlide>

            <SwiperSlide>
                <div className={`item rounded-md overflow-hidden cursor-pointer group ${slideIndex === 1 ? 'opacity-100' : 'opacity-30' }`}
                onClick={() => goto(1)}>
                    <img src='https://www.jiomart.com/images/product/original/rvvtluazsa/live-fashion-black-women-printed-pu-sling-bag-product-images-rvvtluazsa-1-202409201509.jpg?im=Resize=(75,94)' alt='product'
                    className='w-full transition-all group-hover:scale-105' />
                </div>
            </SwiperSlide>

            <SwiperSlide>
                <div className={`item rounded-md overflow-hidden cursor-pointer group ${slideIndex === 2 ? 'opacity-100' : 'opacity-30' }`}
                onClick={() => goto(2)}>
                    <img src='https://www.jiomart.com/images/product/original/rvvtluazsa/live-fashion-black-women-printed-pu-sling-bag-product-images-rvvtluazsa-2-202409201509.jpg?im=Resize=(75,94)' alt='product'
                    className='w-full transition-all group-hover:scale-105' />
                </div>
            </SwiperSlide>

            <SwiperSlide>
                <div className={`item rounded-md overflow-hidden cursor-pointer group ${slideIndex === 3 ? 'opacity-100' : 'opacity-30' }`}
                onClick={() => goto(3)}>
                    <img src='https://www.jiomart.com/images/product/original/rvvtluazsa/live-fashion-black-women-printed-pu-sling-bag-product-images-rvvtluazsa-3-202409201509.jpg?im=Resize=(75,94)' alt='product'
                    className='w-full transition-all group-hover:scale-105' />
                </div>
            </SwiperSlide>
            
            <SwiperSlide>
                <div className={`item rounded-md overflow-hidden cursor-pointer group ${slideIndex === 4 ? 'opacity-100' : 'opacity-30' }`}
                onClick={() => goto(4)}>
                    <img src='https://www.jiomart.com/images/product/original/rviph6xygj/live-fashion-grey-women-printed-pu-sling-bag-product-images-rviph6xygj-0-202409201509.jpg?im=Resize=(75,94)' alt='product'
                    className='w-full transition-all group-hover:scale-105' />
                </div>
            </SwiperSlide>
            

            <SwiperSlide>
                <div className={`item rounded-md overflow-hidden cursor-pointer group ${slideIndex === 5 ? 'opacity-100' : 'opacity-30' }`}
                onClick={() => goto(5)}>
                    <img src='https://www.jiomart.com/images/product/original/rviph6xygj/live-fashion-grey-women-printed-pu-sling-bag-product-images-rviph6xygj-0-202409201509.jpg?im=Resize=(75,94)' alt='product'
                    className='w-full transition-all group-hover:scale-105' />
                </div>
            </SwiperSlide>
            <SwiperSlide></SwiperSlide>
            </Swiper>
            
        </div>

              <div className='zoomContainer w-[85%] h-[500px] overflow-hidden'>
                  <Swiper
                      ref={zoomSliderBig}
                      slidesPerView={1}
                      spaceBetween={0}
                      navigation={false}
                  >
                      <SwiperSlide>
                          <InnerImageZoom
                              zoomType='hover'
                              zoomScale={1}
                              src={'https://www.jiomart.com/images/product/original/rvvtluazsa/live-fashion-black-women-printed-pu-sling-bag-product-images-rvvtluazsa-0-202409201509.jpg?im=Resize=(600,750)'} />
                      </SwiperSlide>

                      <SwiperSlide>
                          <InnerImageZoom
                              zoomType='hover'
                              zoomScale={1}
                              src={'https://www.jiomart.com/images/product/original/rvvtluazsa/live-fashion-black-women-printed-pu-sling-bag-product-images-rvvtluazsa-1-202409201509.jpg?im=Resize=(600,750)'} />
                      </SwiperSlide>

                      <SwiperSlide>
                          <InnerImageZoom
                              zoomType='hover'
                              zoomScale={1}
                              src={'https://www.jiomart.com/images/product/original/rvvtluazsa/live-fashion-black-women-printed-pu-sling-bag-product-images-rvvtluazsa-2-202409201509.jpg?im=Resize=(600,750)'} />
                      </SwiperSlide>

                      <SwiperSlide>
                          <InnerImageZoom
                              zoomType='hover'
                              zoomScale={1}
                              src={'https://www.jiomart.com/images/product/original/rvvtluazsa/live-fashion-black-women-printed-pu-sling-bag-product-images-rvvtluazsa-3-202409201509.jpg?im=Resize=(600,750)'} />
                      </SwiperSlide>

                      <SwiperSlide>
                          <InnerImageZoom
                              zoomType='hover'
                              zoomScale={1}
                              src={'https://www.jiomart.com/images/product/original/rviph6xygj/live-fashion-grey-women-printed-pu-sling-bag-product-images-rviph6xygj-0-202409201509.jpg?im=Resize=(600,750)'} />
                      </SwiperSlide>

                      <SwiperSlide>
                          <InnerImageZoom
                              zoomType='hover'
                              zoomScale={1}
                              src={'https://www.jiomart.com/images/product/original/rviph6xygj/live-fashion-grey-women-printed-pu-sling-bag-product-images-rviph6xygj-0-202409201509.jpg?im=Resize=(600,750)'} />
                      </SwiperSlide>

                  </Swiper>
              </div>
    </div>
    </>
  )
}
