
import React from 'react';
import './style.css';

const HomeSliderSkeleton = () => {
    return (
        <div className='homeSlider pb-2 pt-3 lg:pt-5 lg:pb-5 absolute top-0 left-0 z-50 w-full'>
            <div className='container'>
                <div className='flex  min-h-[10vh] sm:min-h-[25vh] md:min-h-[25vh] lg:min-w-[65vh] items-center gap-2 animate-pulse relative'>
                    <img src="/homeBannerPlaceholder.jpg" className='opacity-0' />
                    <div className='flex items-center mb-3 justify-center w-full h-full bg-gray-300 rounded-lg dark:bg-gray-700 absolute top-0 left-0 z-50'>
                        <svg className='w-10 lg:w-20 lg:h-20 h-10 text-gray-400 dark:text-gray-600' aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M18 2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2zm-2 0v14H4V2h12zm-3 4a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm-8 10l3-4 2.25 3 3-4 3.75 5H4z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
  );
};

export default HomeSliderSkeleton;
