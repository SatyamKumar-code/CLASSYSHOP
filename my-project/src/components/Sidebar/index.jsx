import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import './style.css';
import {Collapse} from 'react-collapse';
import { FaAngleDown } from 'react-icons/fa6';
import Button from '@mui/material/Button';
import { FaAngleUp } from 'react-icons/fa6';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import Rating from '@mui/material/Rating';
import { useState } from 'react';
import { useContext } from 'react';
import { MyContext } from '../../App';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { postData } from '../../utils/api';
import { MdOutlineFilterAlt } from 'react-icons/md';

export const Sidebar = (props) => {

  const [isOpenCategoryFilter, setIsOpenCategoryFilter] = React.useState(true);

  const [filters, setFilters] = useState({
    catId: [],
    subCatId: [],
    thirdsubCatId: [],
    minPrice:'',
    maxPrice:'',
    rating: '',
    page: 1,
    limit: 25
  })

  const [price, setPrice] = useState([0, 600000]);

  const context = useContext(MyContext);
  
  const location = useLocation();

  const handleCheckboxChange = (field, value) => {

    context?.setSearchData([]) // to reset search data when we apply any filter from sidebar
    const currentValues = filters[field] || []
    const updatedValues = currentValues.includes(value) ?
      currentValues.filter((item) => item !== value) :
      [...currentValues, value]

    setFilters((prev) => ({
      ...prev,
      [field]: updatedValues
    })) 
    
    

    if(field === "catId"){
      setFilters((prev) => ({
      ...prev,
      subCatId: [],
      thirdsubCatId: []
    })) 
    }
  }

  useEffect(() => {
    const url = window.location.href;

    const queryParameters = new URLSearchParams(window.location.search);

    if(url.includes('catId')) {
      const catgegoryId = queryParameters.get('catId');
      const catArr = [];
      catArr.push(catgegoryId);
      filters.catId = catArr;
      filters.subCatId = [];
      filters.thirdsubCatId = [];
      filters.rating = [];
      context?.setSearchData([]) // to reset search data when we apply any filter from sidebar or when we visit category page by clicking on category from homepage
    }

    if(url.includes('subCatId')) {
      const subcatgegoryId = queryParameters.get('subCatId');
      const subcatArr = [];
      subcatArr.push(subcatgegoryId);
      filters.subCatId = subcatArr;
      filters.catId = [];
      filters.thirdsubCatId = [];
      filters.rating = [];
      context?.setSearchData([]) // to reset search data when we apply any filter from sidebar or when we visit category page by clicking on category from homepage
    }

    if(url.includes('thirdsubCatId')) {
      const thirdsubCatId = queryParameters.get('thirdsubCatId');
      const thirdsubCatArr = [];
      thirdsubCatArr.push(thirdsubCatId);
      filters.thirdsubCatId = thirdsubCatArr;
      filters.catId = [];
      filters.subCatId = [];
      filters.rating = [];
      context?.setSearchData([]) // to reset search data when we apply any filter from sidebar or when we visit category page by clicking on category from homepage
    }

    filters.page = 1;

    setTimeout(() => {
      filtesData();
    }, 200);


  }, [location])

  const filtesData = () => {
    props.setIsLoading(true);

    if (context?.searchData?.products?.length > 0) {
      props?.setProductsData(context?.searchData);
      props?.setIsLoading(false);
      props?.setTotalPages(context?.searchData?.totalPages);
      window.scrollTo(0, 0);
    } else {
      postData(`/api/product/filters`, filters).then((res) => {
        props.setProductsData(res);
        props.setIsLoading(false);
        props.setTotalPages(res?.totalPages);
        window.scrollTo(0, 0);
      })
    }
  }

  useEffect(() => {
    filters.page = props.page;
    filtesData();
  }, [ filters, props.page])

  useEffect(() => {
    setFilters((prev => ({
      ...prev,
      minPrice: price[0],
      maxPrice: price[1]
    })))
  },[price])

  return (
    <aside className='sidebar y-3 lg:py-5 static lg:sticky top-[130px] z-50'>
      <div className='max-h-[60vh] overflow-auto lg:overflow-hidden w-full'>
        <div className='box'>
            <h3 className=' w-full mb-3 text-[16px] font-[600] flex items-center pr-5'>Shop by Category
              <Button className='!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto !text-[#000]' onClick={()=> setIsOpenCategoryFilter(!isOpenCategoryFilter)} >
                {isOpenCategoryFilter ? <FaAngleUp /> : <FaAngleDown />}
              </Button>
            </h3>
            <Collapse isOpened={isOpenCategoryFilter}>
            <div className='scroll px-4 relative -left-[13px] mb-3'>
              {
                context?.catData?.length !== 0 && context?.catData?.map((item, index) => {
                  return (  
                    <FormControlLabel 
                      key={index}
                      value={item?._id}
                      control={<Checkbox />} 
                      checked={filters.catId.includes(item?._id)}
                      onChange={() => handleCheckboxChange('catId', item?._id)}
                      label={item.name}
                      className='w-full' 
                    />
                  )
                })
              }
                
            </div>
            </Collapse>
            
        </div>


        <div className='box '>
            <h3 className=' w-full mb-3 text-[16px] font-[600] flex items-center pr-5'>
              Filter By Price
            </h3>

            <RangeSlider
              value={price}
              onInput={setPrice}
              min={100}
              max={600000}
              step={5}
            />
            <div className='flex pt-4 pb-2 priceRange'>
              <span className='text-[13px]'>
                From: <strong className='text-dark'>Rs: {price[0]}</strong>
              </span>
              <span className='ml-auto text-[13px]'>
                From: <strong className='text-dark'>Rs: {price[1]}</strong>
              </span>
            </div>
          </div>

      <div className='box'>
        <h3 className=' w-full mb-3 text-[16px] font-[600] flex items-center pr-5'>
          Filter By Rating
        </h3>
        <div className='flex items-center pl-2 lg:pl-1'>
          <FormControlLabel 
            value={5}
            control={<Checkbox />} 
            checked={filters.rating.includes(5)}
            onChange={() => handleCheckboxChange('rating', 5)} 
          />
          <Rating name="rating" value={5} readOnly size='small' />
        </div>

        <div className='flex items-center pl-2 lg:pl-1'>
          <FormControlLabel 
            value={4}
            control={<Checkbox />} 
            checked={filters.rating.includes(4)}
            onChange={() => handleCheckboxChange('rating', 4)} 
          />
          <Rating name="rating" value={4} readOnly size='small' />
        </div>
        <div className='flex items-center pl-2 lg:pl-1'>
          <FormControlLabel 
            value={3}
            control={<Checkbox />} 
            checked={filters.rating.includes(3)}
            onChange={() => handleCheckboxChange('rating', 3)} 
          />
          <Rating name="rating" value={3} readOnly size='small' />
        </div>
        <div className='flex items-center pl-2 lg:pl-1'>
          <FormControlLabel 
            value={2}
            control={<Checkbox />} 
            checked={filters.rating.includes(2)}
            onChange={() => handleCheckboxChange('rating', 2)} 
          />
          <Rating name="rating" value={2} readOnly size='small' />
        </div>
        <div className='flex items-center pl-2 lg:pl-1'>
          <FormControlLabel 
            value={1}
            control={<Checkbox />} 
            checked={filters.rating.includes(1)}
            onChange={() => handleCheckboxChange('rating', 1)} 
          />
          <Rating name="rating" value={1} readOnly size='small' />
        </div>
        
      </div>
      </div>
      <br />
        <Button className='btn-org w-full flex! lg:hidden!'
          onClick={() => context?.setOpenFilter(false)}
        >
          <MdOutlineFilterAlt size={20} /> Filter
        </Button>
      

    </aside>
  )
}
