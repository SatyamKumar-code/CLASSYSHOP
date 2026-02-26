import React, { useEffect, useState } from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link, useParams } from 'react-router-dom';
import { ProductZoom } from '../../components/ProductZoom';
import ProductsSlider from '../../components/ProductsSlider';
import { ProductDetailsComponent } from '../../components/ProductDetails';
import { fetchDataFromApi } from '../../utils/api';
import ProductDetailsSkeleton from '../../components/skeleton/ProductDetailsSkeleton';
import { Reviews } from './reviews';
import { useRef } from 'react';

export const ProductDetails = () => {

  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [relatedProductData, setRelatedProductData] = useState([]);

  const reviewSec = useRef();

  useEffect(() => {
    fetchDataFromApi(`/api/user/getReviews?productId=${id}`).then((res) => {
      if (res?.error === false) {
        setReviewsCount(res?.reviews?.length);
      }
    });
  }, [id]);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    
    fetchDataFromApi(`/api/product/${id}`)
      .then((res) => {
        if (isMounted) {
          if (res?.error === false) {
            setProductData(res?.product);
            fetchDataFromApi(`/api/product/getAllProductsBySubCatId/${res?.product?.subCatId}`).then((res) => {
              if(isMounted && res?.error === false) {
                const filteredData = res?.products?.filter((item) => item?._id !== id);
                setRelatedProductData(filteredData);
              }
              
            }).catch((error) => {
              console.error('Error fetching related products:', error);
            });          }
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
        if (isMounted) {
          setIsLoading(false);
        }
      });
    
    window.scrollTo(0, 0);
    
    return () => {
      isMounted = false;
    };
  }, [id])

  const gotoReviews = () => {
    window.scrollTo({
      top: reviewSec?.current?.offsetTop - 80,
      behavior: 'smooth'
    })
    setActiveTab(1);
  }

  
  const [activeTab, setActiveTab] = React.useState(0);
  return (
    <>
      <section className='bg-white py-5'>
        {isLoading ? (
          <ProductDetailsSkeleton />
        ) : (
          <>
            <div className='container flex flex-col lg:flex-row gap-0 lg:gap-8 items-start lg:items-center'>
              <div className='productZoomContainer w-full lg:w-[40%]'>
                <ProductZoom images={productData?.images} />
              </div>

              <div className='productContent w-full lg:w-[60%] pr-2 pl-2 lg:pr-10 lg:pl-10'>
                <ProductDetailsComponent item={productData} reviewsCount={reviewsCount} gotoReviews={gotoReviews} />
              </div>
            </div>

            <div className='container pt-10'>
              <div className='flex gap-8 mb-5'>
                <span className={`link text-[17px] cursor-pointer font-medium ${activeTab === 0 ? 'text-primary border-b-2 border-[#ff5252]' : ''}`}
                  onClick={() => setActiveTab(0)}>
                  Description
                </span>
                <span className={`link text-[17px] cursor-pointer font-medium ${activeTab === 1 ? 'text-primary border-b-2 border-[#ff5252]' : ''}`}
                  onClick={() => setActiveTab(1)}
                  ref={reviewSec}
                >
                  Reviews ({reviewsCount})
                </span>
              </div>

          {
            activeTab === 0 && (
              <div className='shadow-md w-full pl-2 pr-0 sm:px-8 py-0 lg:py-5 rounded-md text-[14px] sm:text-[15px] lg:text-[16px] leading-6'>
              {
                productData?.description
              }
              </div>
            )
          }

          {
            activeTab === 1 && (
              <div className='shadow-none lg:shadow-md w-full sm:w-[80%] pl-2 pr-0 sm:pr-0 sm:pl-2 lg:py-5 rounded-md'>
                {
                  productData?.length!==0 && <Reviews productId={productData?._id} setReviewsCount={setReviewsCount} /> 
                }
              </div>
            )
          }


            </div>
          </>
        )}

        {
          relatedProductData?.length !== 0 &&
          <div className='container pt-8'>
            <h2 className='text-[20px] font-[600] pb-0'>Related Products</h2>
            <ProductsSlider items={6} data={relatedProductData} />
          </div>
        }
        
      </section>
    </>
  )
}
