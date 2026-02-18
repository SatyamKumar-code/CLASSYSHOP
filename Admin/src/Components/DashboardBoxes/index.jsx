import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';
import { FiPieChart } from "react-icons/fi";
import { IoStatsChartSharp } from 'react-icons/io5';
import { MdOutlineReviews } from 'react-icons/md';
import { RiProductHuntLine } from 'react-icons/ri';
import { GoGift } from "react-icons/go";

const DashboardBoxes = (props) => {
  return (
    <>
    <Swiper
        slidesPerView={4}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="dashboardBoxesSlider"
    >
        <SwiperSlide>
            <div className='box bg-[#3872fa] p-5 cursor-pointer hover:bg-[#3d6dde] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4'>
                <FiPieChart className='text-[50px] text-white' />
                <div className='info w-[70%]'>
                    <h3 className='text-white'>Total Users</h3>
                    <b className='text-white text-[20px]'>{props?.users}</b>
                </div>
                <IoStatsChartSharp className='text-[50px] ml-auto text-white' />
            </div>
        </SwiperSlide>

         <SwiperSlide>
            <div className='box bg-[#16c003] p-5 cursor-pointer hover:bg-[#08a600] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4'>
                <GoGift className='text-[40px] text-white' />
                <div className='info w-[70%]'>
                    <h3 className='text-white'>Total Orders</h3>
                    <b className='text-white text-[20px]'>{props?.orders}</b>
                </div>
                <IoStatsChartSharp className='text-[50px] ml-auto text-white' />
            </div>
        </SwiperSlide>

        <SwiperSlide>
            <div className='box bg-[#312be1d8] p-5 cursor-pointer hover:bg-[#2a27c1] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4'>
                <RiProductHuntLine className='text-[40px] text-white' />
                <div className='info w-[70%]'>
                    <h3 className='text-white'>Total Product</h3>
                    <b className='text-white text-[20px]'>{props?.products}</b>
                </div>
                <IoStatsChartSharp className='text-[50px] ml-auto text-white' />
            </div>
        </SwiperSlide>

        <SwiperSlide>
            <div className='box bg-[#16c003] p-5 cursor-pointer hover:bg-[#08a600] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4'>
                <MdOutlineReviews className='text-[40px] text-white' />
                <div className='info w-[70%]'>
                    <h3 className='text-white'>Total Category</h3>
                    <b className='text-white text-[20px]'>{props?.category}</b>
                </div>
                <IoStatsChartSharp className='text-[50px] ml-auto text-white' />
            </div>
        </SwiperSlide>

        <SwiperSlide>
            <div className='box bg-[#f90d0d] p-5 cursor-pointer hover:bg-[#bd0000] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4'>
                <MdOutlineReviews className='text-[40px] text-white' />
                <div className='info w-[70%]'>
                    <h3 className='text-white'>Total Reviews</h3>
                    <b className='text-white text-[20px]'>{props?.reviews}</b>
                </div>
                <IoStatsChartSharp className='text-[50px] ml-auto text-white' />
            </div>
        </SwiperSlide>

    </Swiper>
    </>
  )
}

export default DashboardBoxes;