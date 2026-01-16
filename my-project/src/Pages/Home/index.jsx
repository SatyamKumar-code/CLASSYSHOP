import React, { useContext, useEffect, useState } from 'react'
import HomeSlider from '../../components/HomeSlider';
import HomeCatSlider from '../../components/HomeCatSlider';
import { LiaShippingFastSolid } from 'react-icons/lia';
import AdsBannerSlider from '../../components/AdsBannerSlider';
import AdsBannerSliderV2 from '../../components/AdsBannerSliderV2';
import ProductSliderSkeleton from '../../components/skeleton/ProductSliderSkeleton';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ProductsSlider from '../../components/ProductsSlider';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import BlogItem from '../../components/BlogItem';
import HomeBannerV2 from '../../components/HomeSliderV2';
import BannerBoxV2 from '../../components/bannerBoxV2';
import { fetchDataFromApi } from '../../utils/api';
import { MyContext } from '../../App';

const Home = () => {

  const [value, setValue] = useState(0);
  const [homeSlidesData, setHomeSlidesData] = useState([]);
  const [popularProductsData, setPopularProductsData] = useState([]);
  const [productData, setAllProductData] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  
  const [popularLoading, setPopularLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);
  const [featuredLoading, setFeaturedLoading] = useState(true);

  const context = useContext(MyContext);

  useEffect(() => {
    fetchDataFromApi("/api/homeSlides").then((res) => {
      setHomeSlidesData(res?.data);
    });
    fetchDataFromApi("/api/product/getAllProducts").then((res) => {
      setAllProductData(res?.products);
      setProductsLoading(false);
    });
    fetchDataFromApi("/api/product/getAllFeaturedProducts").then((res) => {
      setFeaturedProducts(res?.products);
      setFeaturedLoading(false);
    });
    
  }, []);

  useEffect(() => {
    setPopularLoading(true);
    fetchDataFromApi(`/api/product/getAllProductsByCatId/${ context?.catData[0]?._id}`).then((res) => {
      if(res?.error === false){
        setPopularProductsData(res?.products);
      }
      setPopularLoading(false);
    });
  }, [context?.catData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const filterByCatId = (Id) => {
    setPopularLoading(true);
    fetchDataFromApi(`/api/product/getAllProductsByCatId/${Id}`).then((res) => {
      if(res?.error === false){
        setPopularProductsData(res?.products);
      }
      setPopularLoading(false);
    }); 
  };

  return (
    <>
    {
      homeSlidesData?.length !== 0 && <HomeSlider data={homeSlidesData} />
    }

    {
      context?.catData?.length !== 0 && <HomeCatSlider data={context?.catData} />
    }

    <section className='bg-white py-8 pb-1'>
      <div className='container'>
        <div className='flex items-center justify-between'>
          <div className='leftSec'>
            <h2 className='text-[20px] font-[600]'>Popular Products</h2>
            <p className='text-[14px] font-[400] mb-0! mt-0!'>Do not miss the current offers until the end of March.</p>
          </div>

            <div className='rightSec w-[60%]'>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              >
                {
                  context?.catData?.length !== 0 && context?.catData?.map((cat, index) => {
                    return (
                      <Tab label={cat?.name} key={index} onClick={() => filterByCatId(cat?._id)} />
                    )
                  })
                }
              </Tabs>
            </div>
        </div>

        {
          popularLoading ? <ProductSliderSkeleton items={6} /> :
          popularProductsData?.length !== 0 && <ProductsSlider items={6} data={popularProductsData} />
        }


      </div>
    </section>

    <section className='py-6'>
      <div className='container flex gap-5'>
        <div className='part1 w-[70%]'>
          <HomeBannerV2 />
        </div>

        <div className='part2 w-[30%] flex flex-col items-center gap-5 justify-between'>
          <BannerBoxV2  />
          <BannerBoxV2 info="right" image={"https://serviceapi.spicezgold.com/download/1741664665391_1741497254110_New_Project_50.jpg"}/>
        </div>
      </div>
    </section>

    <section className='py-4 pt-2 bg-white'>
      <div className='container'>
        <div className='freeShipping w-[80%] m-auto p-4 py-4 border-2 border-[#ff5252] flex items-center justify-between rounded-md mb-7'>
          <div className='col1 flex items-center gap-4'>
            <LiaShippingFastSolid className='text-[50px]' />
            <span className='text-[20px] font-[600] uppercase'>Free Shipping</span>
          </div>
          
          <div className='col2'>
            <p className='font-[500]'>Free Delivery Now On Your First Order and over $200</p>
          </div>
          <p className='font-bold text-[25px]'>- Only $200</p>
        </div>

        <AdsBannerSliderV2 items={4} />
      </div>
    </section>

    <section className='py-5 pt-0 bg-white'>
      <div className='container'>
        <h2 className='text-[20px] font-[600]'>Latest Products</h2>
        {
          productsLoading ? <ProductSliderSkeleton items={6} /> :
          productData?.length !== 0 && <ProductsSlider items={6} data={productData} />
        }

        <AdsBannerSlider items={4} />
      </div>
    </section>

    <section className='py-5 pt-0 bg-white'>
      <div className='container'>
        <h2 className='text-[20px] font-[600]'>Featured Products</h2>
        {
          featuredLoading ? <ProductSliderSkeleton items={6} /> :
          featuredProducts?.length !== 0 && <ProductsSlider items={6} data={featuredProducts} />
        }

        <AdsBannerSlider items={4} />
      </div>
    </section>

    <section className='py-5 pb-8 pt-0 bg-white blogSection'>
      <div className='container'>
        <h2 className='text-[20px] font-[600] mb-4'>From The Blog</h2>
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          navigation={true}
          modules={[Navigation]}
          className="blogSlider"
        >
          <SwiperSlide>
            <BlogItem />
          </SwiperSlide>

          <SwiperSlide>
            <BlogItem />
          </SwiperSlide>

          <SwiperSlide>
            <BlogItem />
          </SwiperSlide>

          <SwiperSlide>
            <BlogItem />
          </SwiperSlide>

          <SwiperSlide>
            <BlogItem />
          </SwiperSlide>

          <SwiperSlide>
            <BlogItem />
          </SwiperSlide>

          <SwiperSlide>
            <BlogItem />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>



    </>
  )
}

export default Home;