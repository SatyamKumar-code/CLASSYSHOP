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
import HomeSliderSkeleton from '../../components/skeleton/BannerLoading';

const Home = () => {

  const [value, setValue] = useState(0);
  const [homeSlidesData, setHomeSlidesData] = useState([]);
  const [popularProductsData, setPopularProductsData] = useState([]);
  const [productData, setAllProductData] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [bannerV1Data, setBannerV1Data] = useState([]);
  const [blogData, setBlogData] = useState([]);
  
  const [popularLoading, setPopularLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);
  const [featuredLoading, setFeaturedLoading] = useState(true);

  const context = useContext(MyContext);

  useEffect(() => {

    window.scrollTo(0, 0);

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

    fetchDataFromApi("/api/bannerV1").then((res) => {
      setBannerV1Data(res?.banners);
    });
    fetchDataFromApi("/api/blog").then((res) => {
      setBlogData(res?.blogs);
    })
    
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
      <div className='min-h-[13vh]! sm:min-h-[30vh]! md:min-h-[50vh] lg:min-w-[65vh] relative'>
        {
          homeSlidesData?.length !== 0 ? <HomeSlider data={homeSlidesData} /> :  <HomeSliderSkeleton data={homeSlidesData} />
        }
       
        
      </div>

    {
      context?.catData?.length !== 0 && <HomeCatSlider data={context?.catData} />
    }

    <section className='bg-white py-8 pb-1'>
      <div className='container'>
        <div className='flex items-center justify-between flex-col lg:flex-row'>
          <div className='leftSec w-full lg:w-[40%]'>
            <h2 className='text-[14px] sm:text-[14px] md:text-[16px] lg:text-[20px] font-semibold'>Popular Products</h2>
            <p className='text-[12px] sm:text-[12px] md:text-[14px] lg:text-[14px] font-normal mb-0! mt-0!'>Do not miss the current offers until the end of March.</p>
          </div>

            <div className='rightSec w-full lg:w-[60%]'>
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

    <section className='py-2 lg:py-6 pt-0 bg-white'>
      <div className='container flex flex-col lg:flex-row gap-5'>
        <div className='part1 w-full  lg:w-[70%]'>
          {
            productData?.length!== 0 && <HomeBannerV2 data={productData} />
          }
        </div>

        <div className='part2 w-full scrollableBox lg:w-[30%] flex flex-row lg:flex-col items-center gap-5 justify-between'>
          <BannerBoxV2 info={bannerV1Data[bannerV1Data?.length - 1]?.alignInfo} image={bannerV1Data[bannerV1Data?.length - 1]?.images[0]} item={bannerV1Data[bannerV1Data?.length - 1]} />
          <BannerBoxV2 info={bannerV1Data[bannerV1Data?.length - 2]?.alignInfo} image={bannerV1Data[bannerV1Data?.length - 2]?.images[0]} item={bannerV1Data[bannerV1Data?.length - 2]} />
        </div>
      </div>
    </section>

    <section className='py-0 lg:py-4 pt-0 lg:pt-2 bg-white'>
      <div className='container'>
        <div className='freeShipping w-full md:w-[80%] m-auto p-2! lg:p-4 border-2 border-[#ff5252] flex items-center justify-center lg:justify-between rounded-md mb-2 lg:mb-3 flex-col lg:flex-row'>
          <div className='col1 flex items-center gap-0 lg:gap-4'>
            <LiaShippingFastSolid className='text-[30px] lg:text-[50px]' />
            <span className='text-[16px] lg:text-[20px] font-[600] uppercase'>Free Shipping</span>
          </div>
          
          <div className='col2'>
            <p className='font-[500] text-[12px]! lg:text-[20px] -mt-[3px]! lg:mt-3! text-center'>Free Delivery Now On Your First Order and over $200</p>
          </div>
          <p className='font-bold text-[20px] lg:text-[25px] -mt-[15px]! -mb-[5px]! lg:mb-5! lg:mt-5!'>- Only $200</p>
        </div>

        {
          bannerV1Data?.length !== 0 && <AdsBannerSliderV2 items={4} data={bannerV1Data} />
        }
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

  {
    blogData?.length !== 0 && 
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
          {
            blogData?.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <BlogItem item={item} />
                </SwiperSlide>
              )
            })
          }
        </Swiper>
      </div>
    </section>
  }
    



    </>
  )
}

export default Home;