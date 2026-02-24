import React, { useContext } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

import { Navigation, Autoplay, EffectFade, Pagination } from 'swiper/modules';
import Button from '@mui/material/Button';
import { MyContext } from '../../App';
import { Link } from 'react-router-dom';

const HomeBannerV2 = (props) => {

    const context = useContext(MyContext);

  return (
      <Swiper
          loop={true}
          spaceBetween={30}
          navigation={context?.windowWidth > 922 ? true : false}
          effect={'fade'}
          pagination= {{
            clickable: true,
          }}
        //   autoplay={{
        //     delay: 2500,
        //     disableOnInteraction: false,
        //   }}
          modules={[ EffectFade, Navigation, Pagination, Autoplay]}
          className="HomeSliderV2">
          
          {
            props?.data?.map((item, index) => {
                if(item?.isDisplayOnHomeBanner !== true){
                    return null;
                }
                return (
                    <SwiperSlide>
                        <div className='item w-full rounded-md overflow-hidden relative'>
                            <img src={item?.bannerImage[0]} alt="" />
                            <div className='info absolute top-0 -right-[100%] opacity-0 w-[50%] h-[100%] z-50 p-8 flex items-center flex-col justify-center transition-all'>
                                <h4 className='text-[12px] lg:text-[18px] font-[500] w-full text-left mb-3 relative -right-[100%] opacity-0 hidden lg:block'>{item?.bannerTitlename}</h4>
                                
                                {
                                    context?.windowWidth < 922 && 
                                    <h2 className='text-[15px] lg:text-[30px] font-[700] w-full relative -right-[100%] opacity-0'>{item?.name?.length > 30 ? item?.name.substr(0, 30) + '...' : item?.name}</h2>
                                }
                                {
                                    context?.windowWidth > 922 &&
                                    <h2 className='text-[18px] sm:text-[20px] md:text-[25px] lg:text-[30px] font-[700] w-full relative -right-[100%] opacity-0'>{item?.name?.length > 70 ? item?.name.substr(0, 70) + '...' : item?.name}</h2>
                                }

                                <h3 className='flex items-center gap-0 lg:gap-3 text-[12px] lg:text-[18px] font-[500] w-full text-left mt-3 mb-0 lg:mb-3 relative -right-[100%] opacity-0 flex-col lg:flex-row'>
                                    <span className='w-full lg:w-max hidden lg:block'>Starting At Only</span> <span className='text-primary text-[16px] lg:text-[30px] block lg:inline w-full lg:w-max'>&#x20b9;{item?.price}</span></h3>

                                <div className='w-full btn relative -right-full opacity-0'>
                                    <Link to={`/product/${item?._id}`}>
                                        <Button className='btn btn-org'>Shop Now</Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                )
            })
          }

      </Swiper>
  )
}

export default HomeBannerV2;