import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import './style.css';
import {Collapse} from 'react-collapse';
import { FaAngleDown } from 'react-icons/fa6';
import Button from '@mui/material/Button';
import { FaAngleUp } from 'react-icons/fa6';

export const Sidebar = () => {

  const [isOpenCategoryFilter, setIsOpenCategoryFilter] = React.useState(true);

  return (
    <aside className='sidebar py-5'>
        <div className='box'>
            <h3 className=' w-full mb-3 text-[16px] font-[600] flex items-center pr-5'>Shop by Category
              <Button className='!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !ml-auto !text-[#000]' onClick={()=> setIsOpenCategoryFilter(!isOpenCategoryFilter)} >
                {isOpenCategoryFilter ? <FaAngleUp /> : <FaAngleDown />}
              </Button>
            </h3>
            <Collapse isOpened={isOpenCategoryFilter}>
            <div className='scroll px-4 relative -left-[13px]'>
                <FormControlLabel control={<Checkbox size='small' />} label="Fashion" className='w-full' />
                <FormControlLabel control={<Checkbox size='small' />} label="Electronic" className='w-full' />
                <FormControlLabel control={<Checkbox size='small' />} label="Bags" className='w-full' />
                <FormControlLabel control={<Checkbox size='small' />} label="Footwear" className='w-full' />
                <FormControlLabel control={<Checkbox size='small' />} label="Groceries" className='w-full' />
                <FormControlLabel control={<Checkbox size='small' />} label="Beauty" className='w-full' />
                <FormControlLabel control={<Checkbox size='small' />} label="Wellnes" className='w-full' />
                <FormControlLabel control={<Checkbox size='small' />} label="Jewellery" className='w-full' />
            </div>
            </Collapse>
            
        </div>
    </aside>
  )
}
