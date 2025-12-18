import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';
import { FiPieChart } from "react-icons/fi";
import { IoStatsChartSharp } from 'react-icons/io5';
import { BsBank } from 'react-icons/bs';
import { RiProductHuntLine } from 'react-icons/ri';
import { GoGift } from "react-icons/go";

const DashboardBoxes = () => {
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
                <GoGift className='text-[40px] text-white' />
                <div className='info w-[70%]'>
                    <h3>New Orders</h3>
                    <b>1,390</b>
                </div>
                <IoStatsChartSharp className='text-[50px] ml-auto text-white' />
            </div>
        </SwiperSlide>

         <SwiperSlide>
            <div className='box bg-[#10b981] p-5 cursor-pointer hover:bg-[#1fab7c] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4'>
                <FiPieChart className='text-[40px] text-white' />
                <div className='info w-[70%]'>
                    <h3>Sales</h3>
                    <b>$57,890</b>
                </div>
                <IoStatsChartSharp className='text-[50px] ml-auto text-white' />
            </div>
        </SwiperSlide>

         <SwiperSlide>
            <div className='box bg-[#ca289f] p-5 cursor-pointer hover:bg-[#bb3698] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4'>
                <BsBank className='text-[30px] text-white' />
                <div className='info w-[70%]'>
                    <h3>Revenue</h3>
                    <b>$12,390</b>
                </div>
                <IoStatsChartSharp className='text-[50px] ml-auto text-white' />
            </div>
        </SwiperSlide>

         <SwiperSlide>
            <div className='box bg-[#312be1d8] p-5 cursor-pointer hover:bg-[#2a27c1] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4'>
                <RiProductHuntLine className='text-[40px] text-white' />
                <div className='info w-[70%]'>
                    <h3>Total Product</h3>
                    <b>1,390</b>
                </div>
                <IoStatsChartSharp className='text-[50px] ml-auto text-white' />
            </div>
        </SwiperSlide>


    </Swiper>
    </>
  )
}

export default DashboardBoxes;