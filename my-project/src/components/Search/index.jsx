import React from 'react';
import '../Search/style.css';
import Button from '@mui/material/Button';
import { IoSearch } from "react-icons/io5";
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { MyContext } from '../../App';
import { postData } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const Search = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [isloading, setIsLoading] = useState(false);

  const context = useContext(MyContext);
  const history = useNavigate();

  const onChangeInput = (e) => {
    setSearchQuery(e.target.value);
  }

  // useEffect(() => {
  //   const delayDebounceFn = setTimeout(() => {

  //     const obj = {
  //       page: 1,
  //       limit: 3,
  //       query: searchQuery
  //     }
  //     if (searchQuery !== "") {
  //       postData(`/api/product/get/search`, obj).then((res) => {
  //         context?.setSearchData(res);
  //         history('/search');
  //       })
  //     }
  //   }, 500);

  //   return () => clearTimeout(delayDebounceFn);
  // }, [searchQuery])

  const search = () => {
    const delayDebounceFn = setTimeout(() => {

      const obj = {
        page: 1,
        limit: 3,
        query: searchQuery
      }
      if (searchQuery !== "") {
        setIsLoading(true);
        postData(`/api/product/get/search`, obj).then((res) => {
          context?.setSearchData(res);
          setIsLoading(false);
          context?.setOpenSearchPanel(false);
          history('/search');
        })
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
    
  }

  return (
    <div className='searchBox w-[100%] h-[50%] bg-[#e5e5e5] rounded-[5px] relative p-2'>
        <input 
          type='text' 
          placeholder='Search for products...' 
          className='w-full h-[35px] focus:outline-none bg-inherit p-2 text-[15px]'
          value={searchQuery}
          onChange={onChangeInput}
          />
      <Button className='!absolute top-[8px] right-[5px] z-50 !w-[37px] !min-w-[37px] h-[37px] !rounded-full !text-black' onClick={search}>

        {isloading === true ?
          <CircularProgress size={20} className='text-primary' />
          :
          <IoSearch className='text-black text-[22px]' />}
      </Button>
        
    </div>
  )
}

export default Search;