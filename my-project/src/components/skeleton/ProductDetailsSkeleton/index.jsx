import React from 'react';
import './style.css';

const ProductDetailsSkeleton = () => {
  return (
    <div role="status" aria-busy="true" aria-label="Loading product details">
      <div className="container flex gap-8 items-center product-details-skeleton-mobile">
        {/* Product Zoom Skeleton */}
        <div className="productZoomContainer w-[40%] zoom-mobile">
          <div className="flex gap-3 zoom-flex-mobile">
            {/* Thumbnail Slider - Left Side */}
            <div className="slider w-[15%] slider-mobile">
              <div className="flex flex-col gap-2 h-[500px] slider-list-mobile">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="skeleton-thumb w-full h-[100px] bg-gray-200 rounded-md animate-pulse thumb-mobile"></div>
                ))}
              </div>
            </div>
            {/* Main Image - Right Side */}
            <div className="zoomContainer w-[85%] h-[500px] overflow-hidden rounded-md zoom-img-mobile">
              <div className="skeleton-main-image w-full h-full bg-gray-200 rounded-md animate-pulse main-img-mobile"></div>
            </div>
          </div>
        </div>
        {/* Product Content Skeleton */}
        <div className="productContent w-[60%] pr-10 pl-10 content-mobile">
          {/* Brand */}
          <div className="skeleton-brand h-[14px] w-[80px] bg-gray-200 rounded animate-pulse mb-3"></div>
          {/* Title */}
          <div className="skeleton-title h-[28px] w-[90%] bg-gray-200 rounded animate-pulse mb-3"></div>
          {/* Rating */}
          <div className="skeleton-rating h-[20px] w-[150px] bg-gray-200 rounded animate-pulse mb-4"></div>
          {/* Price */}
          <div className="flex items-center gap-4 mb-4">
            <div className="skeleton-price h-[28px] w-[100px] bg-gray-200 rounded animate-pulse"></div>
            <div className="skeleton-price h-[20px] w-[80px] bg-gray-200 rounded animate-pulse"></div>
            <div className="skeleton-discount h-[24px] w-[60px] bg-gray-200 rounded animate-pulse"></div>
          </div>
          {/* Description */}
          <div className="skeleton-desc h-[14px] w-[100%] bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="skeleton-desc h-[14px] w-[95%] bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="skeleton-desc h-[14px] w-[85%] bg-gray-200 rounded animate-pulse mb-5"></div>
          {/* Size Options */}
          <div className="skeleton-label h-[16px] w-[60px] bg-gray-200 rounded animate-pulse mb-3"></div>
          <div className="flex gap-2 mb-5">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="skeleton-option w-[40px] h-[40px] bg-gray-200 rounded-md animate-pulse"></div>
            ))}
          </div>
          {/* Color Options */}
          <div className="skeleton-label h-[16px] w-[50px] bg-gray-200 rounded animate-pulse mb-3"></div>
          <div className="flex gap-2 mb-5">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="skeleton-color w-[30px] h-[30px] bg-gray-200 rounded-full animate-pulse"></div>
            ))}
          </div>
          {/* Quantity & Buttons */}
          <div className="flex items-center gap-4 mb-5">
            <div className="skeleton-qty w-[120px] h-[45px] bg-gray-200 rounded-md animate-pulse"></div>
            <div className="skeleton-btn w-[150px] h-[45px] bg-gray-200 rounded-md animate-pulse"></div>
            <div className="skeleton-btn w-[45px] h-[45px] bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
      {/* Tabs Skeleton */}
      <div className="container pt-10 tabs-mobile">
        {/* Tab Headers */}
        <div className="flex items-center gap-8 mb-5 tab-header-mobile">
          <div className="skeleton-tab h-[20px] w-[100px] bg-gray-200 rounded animate-pulse"></div>
          <div className="skeleton-tab h-[20px] w-[80px] bg-gray-200 rounded animate-pulse"></div>
          <div className="skeleton-tab h-[20px] w-[90px] bg-gray-200 rounded animate-pulse"></div>
        </div>
        {/* Tab Content */}
        <div className="shadow-md w-full px-8 py-5 rounded-md tab-content-mobile">
          <div className="skeleton-desc h-[16px] w-[100%] bg-gray-200 rounded animate-pulse mb-3"></div>
          <div className="skeleton-desc h-[16px] w-[95%] bg-gray-200 rounded animate-pulse mb-3"></div>
          <div className="skeleton-desc h-[16px] w-[90%] bg-gray-200 rounded animate-pulse mb-5"></div>
          <div className="skeleton-heading h-[20px] w-[150px] bg-gray-200 rounded animate-pulse mb-3"></div>
          <div className="skeleton-desc h-[16px] w-[100%] bg-gray-200 rounded animate-pulse mb-3"></div>
          <div className="skeleton-desc h-[16px] w-[85%] bg-gray-200 rounded animate-pulse mb-5"></div>
          <div className="skeleton-heading h-[20px] w-[180px] bg-gray-200 rounded animate-pulse mb-3"></div>
          <div className="skeleton-desc h-[16px] w-[100%] bg-gray-200 rounded animate-pulse mb-3"></div>
          <div className="skeleton-desc h-[16px] w-[80%] bg-gray-200 rounded animate-pulse mb-5"></div>
          <div className="skeleton-heading h-[20px] w-[160px] bg-gray-200 rounded animate-pulse mb-3"></div>
          <div className="skeleton-desc h-[16px] w-[100%] bg-gray-200 rounded animate-pulse mb-3"></div>
          <div className="skeleton-desc h-[16px] w-[75%] bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
