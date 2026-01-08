import Button from '@mui/material/Button';
import React, { useContext, useEffect, useState } from 'react'
import { IoMdAdd } from 'react-icons/io';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Progress from '../../Components/ProgressBar';
import { AiOutlineEdit } from 'react-icons/ai';
import TooltipMUI from '@mui/material/Tooltip';
import { GoTrash } from 'react-icons/go';
import Chip from '@mui/material/Chip';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FaAngleDown, FaRegEye } from 'react-icons/fa';
import SearchBox from '../../Components/SearchBox';
import { MyContext } from '../../App';
import { fetchDataFromApi } from '../../utils/api';
import EditSubCatBox from './EditSubCatBox';




const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const columns = [
    { id: 'image', label: 'CATEGORY IMAGE', minWidth: 250 },
    { id: 'catName', label: 'CATEGORY NAME', minWidth: 250 },
    { id: 'subCatName', label: 'SUB CATEGORY NAME', minWidth: 400 },
    { id: 'action', label: 'Action', minWidth: 100 },

];

const SubCategoryList = () => {

    const [isOpen, setIsOpen] = useState(0);
    const context = useContext(MyContext);

    const expend = (index) => {
        if (isOpen === index) {
            setIsOpen(!isOpen);
        }else {
            setIsOpen(index);
        }
    }


    return (
        <>

            <div className='flex items-center justify-between px-2 py-0 mt-3'>
                <h2 className='text-[18px] font-[600]'>Sub Category List <span className='font-[400] text-[14px]'> (Material Ui Table)</span></h2>

                <div className='col w-[30%] ml-auto flex items-center gap-3 justify-end'>
                    {/* <Button className='btn bg-green-600! text-white! btn-sm'>
                        Export
                    </Button> */}
                    <Button className='btn-blue text-white! btn-sm '
                        onClick={() => context.setIsOpenFullScreenPanel({
                            open: true,
                            model: 'Add New Sub Category'
                        })}
                    >Add New Sub Category</Button>
                </div>
            </div>


            <div className='card my-4 pt-5 shadow-md sm:rounded-lg bg-white'>
                {
                    context?.catData?.length !== 0 && 
                    <ul className='w-full'>
                        { 
                            
                            context?.catData?.map((fristLavelCat, index) => {
                                return (
                                    
                                    <li className='w-full mb-1' key={index}>
                                        <div className="flex items-center w-full p-2 bg-[#f1f1f1] rounded-sm px-4">
                                            <span className=" font-[500] flex items-center gap-4 text-[14px]">
                                                {fristLavelCat?.name}
                                            </span>

                                            <Button 
                                                onClick={() => expend(index)}
                                                className='!min-w-[35px] !w-[35px] !h-[35px] !rounded-full text-black! ml-auto!'>
                                                <FaAngleDown />
                                            </Button>
                                        </div>

                                        {
                                            isOpen === index &&
                                            <>
                                            {
                                                fristLavelCat?.Children?.length !== 0 &&
                                                <ul className='w-full ml-4 mt-2'>
                                                    {fristLavelCat?.Children?.map((subCat, index_) => {
                                                        return(
                                                            <li className='w-full pl-1' key={index_}>
                                                                <EditSubCatBox 
                                                                    name={subCat?.name}
                                                                    id={subCat?._id}
                                                                    catData={context?.catData}
                                                                    index={index}
                                                                    selectedCat={subCat?.parentId}
                                                                    selectedCatName={subCat?.parentCatName} />

                                                                {
                                                                    subCat?.Children?.length!== 0 && 
                                                                    <ul className='pl-4'>
                                                                        {
                                                                            subCat?.Children?.map((thirdLevel, index__ )=> {
                                                                                return (
                                                                                    <li className='w-full hover:bg-[#f1f1f1]' key={index__}>
                                                                                       <EditSubCatBox
                                                                                            name={thirdLevel.name}
                                                                                            catData={fristLavelCat?.Children}
                                                                                            index={index_}
                                                                                            selectedCat={thirdLevel?.parentId}
                                                                                            selectedCatName={thirdLevel?.parentCatName}
                                                                                            id={thirdLevel?._id}
                                                                                        />
                                                                                    </li>
                                                                                )
                                                                            })
                                                                        }
                                                                    </ul>
                                                                }
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
                                            }
                                            </>
                                        }

                                        
                                    </li>
                                )
                            })
                        }
                    </ul>
                }

            </div>

        </>
    )
}

export default SubCategoryList;