import Button from '@mui/material/Button';
import React, { useContext, useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import TooltipMUI from '@mui/material/Tooltip';
import { GoTrash } from 'react-icons/go';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { FaRegEye } from 'react-icons/fa';
import { MyContext } from '../../App';
import { deleteData, fetchDataFromApi } from '../../utils/api';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import "react-lazy-load-image-component/src/effects/blur.css";




const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const columns = [
    { id: 'image', label: 'IMAGE', minWidth: 150 },
    { id: 'catName', label: 'CATEGORY NAME', minWidth: 150 },
    { id: 'action', label: 'Action', minWidth: 100 },

];

const CategoryList = () => {

    const [categoryFilterVal, setCategoryFilterVal] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);


    const context = useContext(MyContext);

    useEffect(() => {
        fetchDataFromApi("/api/category").then((res) => {
            context?.setCatData(res?.categories);
        })
    }, [context?.isOpenFullScreenPanel?.open])


    const handleChangeCatFilter = (event, newPage) => {
        setCategoryFilterVal(event.target.value);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const deleteCat = (id) => {
        deleteData(`/api/category/${id}`).then((res) => {
            if (res?.data?.success === true) {
                context.alertBox("Success", "Category deleted successfully.");
                fetchDataFromApi("/api/category").then((res) => {
                    context?.setCatData(res?.categories);
                })
            } else {
                context.alertBox("error", res?.message || "Failed to delete category.");
            }
        })
    }


    return (
        <>

            <div className='flex items-center justify-between px-2 py-0 mt-3'>
                <h2 className='text-[18px] font-[600]'>Category List <span className='font-[400] text-[14px]'> (Material Ui Table)</span></h2>

                <div className='col w-[30%] ml-auto flex items-center gap-3 justify-end'>
                    <Button className='btn bg-green-600! text-white! btn-sm'>
                        Export
                    </Button>
                    <Button className='btn-blue text-white! btn-sm '
                        onClick={() => context.setIsOpenFullScreenPanel({
                            open: true,
                            model: 'Add New Category'
                        })}
                    >Add New Category</Button>
                </div>
            </div>


            <div className='card my-4 pt-5 shadow-md sm:rounded-lg bg-white'>


                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell width={60}>
                                    <Checkbox {...label} size='small' />
                                </TableCell>

                                {columns.map((column) => (
                                    <TableCell
                                        width={column.minWidth}
                                        key={column.id}
                                        align={column.align}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {
                                context?.catData?.length !== 0 && context?.catData?.map((item, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell >
                                                <Checkbox {...label} size='small' />
                                            </TableCell>

                                            <TableCell width={100} >
                                                <div className='flex items-center gap-4 w-[80px]'>
                                                    <div className='img w-full rounded-md overflow-hidden group'>
                                                        <Link to="/product/45745">
                                                            <LazyLoadImage
                                                                alt={"image"}
                                                                effect='blur'
                                                                className='w-full group-hover:scale-105 transition-all'
                                                                src={item.images[0]}
                                                            />
                                                        </Link>
                                                    </div>


                                                </div>
                                            </TableCell>

                                            <TableCell width={100} >
                                                {item?.name}
                                            </TableCell>

                                            <TableCell width={100} >
                                                <div className='flex items-center gap-3'>
                                                    <TooltipMUI title="Edit Product" placement='top'>
                                                        <Button className='w-[35px]! h-[35px]! min-w-[35px]! bg-[#f1f1f1] border! border-[rgba(0,0,0,0.2)]! rounded-full! hover:bg-[#f1f1f1]!'
                                                            onClick={() => context.setIsOpenFullScreenPanel({
                                                                open: true,
                                                                model: 'Edit Category',
                                                                id: item?._id
                                                            })}
                                                        >
                                                            <AiOutlineEdit className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                                                        </Button>
                                                    </TooltipMUI>

                                                    <TooltipMUI title="Remove Product" placement='top'>
                                                        <Button className='w-[35px]! h-[35px]! min-w-[35px]! bg-[#f1f1f1] border! border-[rgba(0,0,0,0.2)]! rounded-full! hover:bg-[#f1f1f1]!'
                                                            onClick={() => deleteCat(item?._id)}
                                                        >
                                                            <GoTrash className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                                                        </Button>
                                                    </TooltipMUI>



                                                </div>
                                            </TableCell>



                                        </TableRow>
                                    )
                                })
                            }


                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={10}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />

            </div>

        </>
    )
}

export default CategoryList;