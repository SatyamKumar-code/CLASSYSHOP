import Button from '@mui/material/Button';
import React, { useContext, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
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
import { MyContext } from '../../App';
import { useEffect } from 'react';
import { deleteData, deleteMultipleData, fetchDataFromApi } from '../../utils/api';




const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const columns = [
    { id: 'image', label: 'IMAGE', minWidth: 250 },
    { id: 'action', label: 'Action', minWidth: 100 },
   
];

const HomeSliderBanners = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [slidesData, setSlidesData] = useState([]);
    const [sortedIds, setSortedIds] = useState([]);

    const context = useContext(MyContext);

    useEffect(() => {
        getData();
    }, [context?.isOpenFullScreenPanel]);

    // Handle to toggle all checkboxes
    const handleSelectAll = (e) => {
        const isChecked = e.target.checked;

        // Update all items' checked status
        const updatedItems = slidesData.map((item) => ({
            ...item,
            checked: isChecked,
        }));
        setSlidesData(updatedItems);
        // Update the sorted IDS satate
        if (isChecked) {
            const ids = updatedItems.map((item) => item._id).sort((a, b) => a - b);
            setSortedIds(ids);
            
        }else {
            setSortedIds([])
        }
    }

    
    const handleCheckboxChange = (e, id, index) => {
        const updatedItems = slidesData.map((item) => 
            item._id === id ? { ...item, checked: e.target.checked } : item
        );
        setSlidesData(updatedItems);

        // Update the sorted IDS satate
        const selectedIds = updatedItems
            .filter((item) => item.checked)
            .map((item) => item._id)
            .sort((a, b) => a - b);
        setSortedIds(selectedIds);
    };

    const getData = () => {
        fetchDataFromApi("/api/homeSlides").then((res) => {
            let arr = [];
            if (res?.error === false) {
                for(let i =0; i< res?.data?.length; i++) {
                    arr[i] = res?.data[i];
                    arr[i].checked = false;
                    
                }
                setTimeout(() => {
                    setSlidesData(arr);
                    setIsLoading(false);
                }, 300);
            }
            
        })
    }


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const deleteSlides = (id) => {
        deleteData(`/api/homeSlides/${id}`).then((res) => {
            if (res?.data?.error === false) {
                context.alertBox("Success", res?.data?.message || "Slide deleted successfully.");
                getData();
            } else {
                context.alertBox("error", res?.data?.message || "Failed to delete slide.");
            }


        })
    }

    const deleteMultipleSlides = () => {
        if (sortedIds.length === 0) {
            context.alertBox("error", "Please select items to delete.");
            return;
        }

        try {
            deleteMultipleData(`/api/homeSlides/deleteMultiple`, {
                data: { ids: sortedIds }
            }).then((res) => {
                getData();
                context.alertBox("Success", "Slides deleted")
                setSortedIds([]);
            })
        } catch (error) {
            context.alertBox("error", "Error deleting items.");
        }
    }


    return (
        <>

            <div className='flex items-center justify-between px-2 py-0 mt-3'>
                <h2 className='text-[18px] font-[600]'>Home Slider Banners </h2>
                
                <div className='col w-[45%] ml-auto flex items-center gap-3 justify-end'>
                    {
                        sortedIds?.length !== 0 && <Button variant='contained' className='btn-sm px-3!' size='small' color='error'
                            onClick={deleteMultipleSlides}
                        >
                            Delete({sortedIds?.length})
                        </Button>
                    }
                        <Button className='btn-blue text-white! btn-sm w-[180px]! min-w-[180px]!'
                        onClick={()=>context.setIsOpenFullScreenPanel({
                            open:true,
                            model:'Add Home Slide'
                        })}
                        >Add Home Slide</Button>
                    </div>
            </div> 


            <div className='card my-4 pt-5 shadow-md sm:rounded-lg bg-white'>


                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell width={60}>
                                    <Checkbox {...label} size='small'
                                        onChange={handleSelectAll}
                                        checked={slidesData?.length > 0 ? slidesData?.every((item) => item?.checked) : false}
                                    />
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
                                slidesData?.length !== 0 && slidesData?.map((item, index) => {
                                    return (
                                        <TableRow>
                                            <TableCell >
                                                <Checkbox {...label} size='small'
                                                    checked={item?.checked === true ? true : false} 
                                                    onChange={(e) => handleCheckboxChange(e, item._id, index)}
                                                />
                                            </TableCell>

                                            <TableCell width={300} >
                                                <div className='flex items-center gap-4 w-[300px]'>
                                                    <div className='img w-full rounded-md overflow-hidden group'>
                                                        <img src={item?.images[0]} alt="product image"
                                                            className='w-full group-hover:scale-105 transition-all'
                                                        />
                                                    </div>


                                                </div>
                                            </TableCell>

                                            <TableCell width={100} >
                                                <div className='flex items-center gap-1'>
                                                    <TooltipMUI title="Edit Slide" placement='top'>
                                                        <Button className='w-[35px]! h-[35px]! min-w-[35px]! bg-[#f1f1f1] border! border-[rgba(0,0,0,0.2)]! rounded-full! hover:bg-[#f1f1f1]!'>
                                                            <AiOutlineEdit className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                                                        </Button>
                                                    </TooltipMUI>

                                                    <TooltipMUI title="Remove Product" placement='top'>
                                                        <Button 
                                                            className='w-[35px]! h-[35px]! min-w-[35px]! bg-[#f1f1f1] border! border-[rgba(0,0,0,0.2)]! rounded-full! hover:bg-[#f1f1f1]!'
                                                            onClick={() => deleteSlides(item?._id)}
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

export default HomeSliderBanners;