import Button from '@mui/material/Button';
import React, { useContext, useState } from 'react';
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
import { deleteData, fetchDataFromApi } from '../../utils/api';




const columns = [
    { id: 'image', label: 'IMAGE', minWidth: 250 },
    { id: 'action', label: 'Action', minWidth: 100 },
   
];

const BannerList2 = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [slidesData, setSlidesData] = useState([]);

    const context = useContext(MyContext);

    useEffect(() => {
        getData();
    }, [context?.isOpenFullScreenPanel]);


    const getData = () => {
        fetchDataFromApi("/api/bannerV1").then((res) => {
            let arr = [];
            if (res?.error === false) {
                for(let i =0; i< res?.banners?.length; i++) {
                    arr[i] = res?.banners[i];
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
        deleteData(`/api/bannerV1/${id}`).then((res) => {
            if (res?.data?.error === false) {
                context.alertBox("Success", res?.data?.message || "Banner deleted successfully.");
                getData();
            } else {
                context.alertBox("error", res?.data?.message || "Failed to delete banner.");
            }


        })
    }


    return (
        <>

            <div className='flex items-center justify-between px-2 py-0 mt-1 md:mt-3'>
                <h2 className='text-[18px] font-[600]'>Banners List </h2>
                
                <div className='col ml-auto flex items-center gap-3 justify-end'>
                   
                    <Button className='btn-blue text-white! btn-sm w-[180px]! min-w-[180px]!'
                    onClick={()=>context.setIsOpenFullScreenPanel({
                        open:true,
                        model:'Add Home Banner List2'
                    })}
                    >Add Banner List2</Button>
                </div>
            </div> 


            <div className='card my-4 pt-5 shadow-md sm:rounded-lg bg-white'>


                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>

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

                                            <TableCell width={100} >
                                                <div className='flex items-center gap-4 w-30 md:w-50 lg:w-62'>
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
                                                        <Button className='w-[35px]! h-[35px]! min-w-[35px]! bg-[#f1f1f1] border! border-[rgba(0,0,0,0.2)]! rounded-full! hover:bg-[#f1f1f1]!'
                                                            onClick={() => context.setIsOpenFullScreenPanel({
                                                                open: true,
                                                                model: 'Edit BannerV1',
                                                                id: item?._id
                                                            })}>
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
                    className='paginationSmall'
                />

            </div>

        </>
    )
}

export default BannerList2;