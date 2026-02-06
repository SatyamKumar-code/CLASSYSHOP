import React from 'react';
import './style.css';

const ProductItemSkeleton = () => {
  return (
    <div className='productItem skeleton-item shadow-lg rounded-md overflow-hidden border-1 border-[rgba(0,0,0,0.1)]'>
      <div className="imgWrapper w-[100%] overflow-hidden rounded-md relative">
        <div className='skeleton-img h-[220px] bg-gray-200 animate-pulse'></div>
      </div>

      <div className='info p-3'>
        <div className='skeleton-brand h-[14px] w-[60px] bg-gray-200 rounded animate-pulse mb-2'></div>
        <div className='skeleton-title h-[16px] w-[90%] bg-gray-200 rounded animate-pulse mb-2'></div>
        <div className='skeleton-rating h-[18px] w-[100px] bg-gray-200 rounded animate-pulse mb-2'></div>
        <div className='flex items-center gap-4'>
          <div className='skeleton-price h-[18px] w-[60px] bg-gray-200 rounded animate-pulse'></div>
          <div className='skeleton-price h-[18px] w-[70px] bg-gray-200 rounded animate-pulse'></div>
        </div>
      </div>
    </div>
  );
};

const ProductItemListSkeleton = () => {
  return (
    <div className='productItem skeleton-item shadow-lg rounded-md overflow-hidden border-1 border-[rgba(0,0,0,0.1)] flex flex-row'>
      <div className="imgWrapper w-[250px] overflow-hidden rounded-md relative">
        <div className='skeleton-img h-[220px] bg-gray-200 animate-pulse'></div>
      </div>

      <div className='info p-4 flex-1'>
        <div className='skeleton-brand h-[14px] w-[80px] bg-gray-200 rounded animate-pulse mb-3'></div>
        <div className='skeleton-title h-[18px] w-[70%] bg-gray-200 rounded animate-pulse mb-3'></div>
        <div className='skeleton-rating h-[18px] w-[120px] bg-gray-200 rounded animate-pulse mb-3'></div>
        <div className='skeleton-desc h-[14px] w-[90%] bg-gray-200 rounded animate-pulse mb-2'></div>
        <div className='skeleton-desc h-[14px] w-[80%] bg-gray-200 rounded animate-pulse mb-4'></div>
        <div className='flex items-center gap-4'>
          <div className='skeleton-price h-[20px] w-[80px] bg-gray-200 rounded animate-pulse'></div>
          <div className='skeleton-price h-[20px] w-[90px] bg-gray-200 rounded animate-pulse'></div>
        </div>
      </div>
    </div>
  );
};

const ProductLoadingGrid = ({ view = 'grid', items = 8 }) => {
  return (
    <>
      {
        [...Array(items)].map((_, index) => (
          view === 'grid' ? (
            <ProductItemSkeleton key={index} />
          ) : (
            <ProductItemListSkeleton key={index} />
          )
        ))
      }
    </>
  );
};

export default ProductLoadingGrid;
