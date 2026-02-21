import Button from '@mui/material/Button';
import React, { useContext, useEffect, useState } from 'react'
import { IoMdAdd } from 'react-icons/io';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Progress from '../../Components/ProgressBar';
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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FaRegEye } from 'react-icons/fa';
import SearchBox from '../../Components/SearchBox';
import { MyContext } from '../../App';
import { fetchDataFromApi, deleteData, deleteMultipleData } from '../../utils/api';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import TableSkeleton from '../../Components/Skeleton/TableSkeleton';
import Rating from '@mui/material/Rating';




const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const columns = [
    { id: 'product', label: 'PRODUCT', minWidth: 150 },
    { id: 'category', label: 'CATEGORY', minWidth: 100 },
    {
        id: 'subCategory',
        label: 'SUB CATEGORY',
        minWidth: 150,
    },
    {
        id: 'Price',
        label: 'PRICE',
        minWidth: 130,
    },
    {
        id: 'sales',
        label: 'SALES',
        minWidth: 100,
    },
    {
        id: 'rating',
        label: 'RATING',
        minWidth: 100,
    },
    {
        id: 'action',
        label: 'ACTION',
        minWidth: 120,
    },
];

const Products = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [productCat, setProductCat] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [productData, setProductData] = useState([]);
    const [productSubCat, setProductSubCat] = useState('');
    const [productThirdLavelCat, setProductThirdLavelCat] = useState('');
    const [sortedIds, setSortedIds] = useState([]);

    const context = useContext(MyContext);

    useEffect(() => {
        getProducts();
    }, [context?.isOpenFullScreenPanel?.open]);

    // Handle to toggle all checkboxes
    const handleSelectAll = (e) => {
        const isChecked = e.target.checked;

        // Update all items' checked status
        const updatedItems = productData.map((item) => ({
            ...item,
            checked: isChecked,
        }));
        setProductData(updatedItems);

        // Update the sorted IDS satate
        if (isChecked) {
            const ids = updatedItems.map((item) => item._id).sort((a, b) => a - b);
            setSortedIds(ids);
            
        }else {
            setSortedIds([])
        }
    }

    // Handle to toggle individual checkbox
    const handleCheckboxChange = (e, id, index) => {
        const updatedItems = productData.map((item) => 
            item._id === id ? { ...item, checked: e.target.checked } : item
        );
        setProductData(updatedItems);

        // Update the sorted IDS satate
        const selectedIds = updatedItems
            .filter((item) => item.checked)
            .map((item) => item._id)
            .sort((a, b) => a - b);
        setSortedIds(selectedIds);
    };

    const getProducts = async () => {
        setIsLoading(true);
        fetchDataFromApi("/api/product/getAllProducts").then((res) => {
            let productArr = [];
            if (res?.error === false) {
                for(let i =0; i< res?.products?.length; i++) {
                    productArr[i] = res?.products[i];
                    productArr[i].checked = false;
                }
                setTimeout(() => {
                    setIsLoading(false);
                    setProductData(productArr);
                }, 300);
            }
        })
    }

    


    const handleChangeProductCat = (event) => {
        setIsLoading(true);
        setProductCat(event.target.value);
        setProductSubCat('');
        setProductThirdLavelCat('');
        fetchDataFromApi(`/api/product/getAllProductsByCatid/${event.target.value}`).then((res) => {
            if (res?.error === false) {
                setTimeout(() => {
                    setProductData(res?.products || []);
                    setIsLoading(false);
                }, 300);
            }
        })
    };

    const handleChangeProductSubCat = (event) => {
        setIsLoading(true);
        setProductCat('');
        setProductSubCat(event.target.value);
        setProductThirdLavelCat('');
        fetchDataFromApi(`/api/product/getAllProductsBySubCatid/${event.target.value}`).then((res) => {
            if (res?.error === false) {
                setTimeout(() => {
                    setProductData(res?.products || []);
                    setIsLoading(false);
                }, 300);
            }
        })
    };

    const handleChangeProductThirdLavelCat = (event) => {
        setIsLoading(true);
        setProductCat('');
        setProductSubCat('');
        setProductThirdLavelCat(event.target.value);
        fetchDataFromApi(`/api/product/getAllProductsByThirdLavelCat/${event.target.value}`).then((res) => {
           
            if (res?.error === false) {
                setTimeout(() => {
                    setProductData(res?.products || []);
                    setIsLoading(false);
                }, 300);
            }
        })
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const deleteProduct = (id) => {
        deleteData(`/api/product/${id}`).then((res) => {
            if (res?.data?.error === false) {
                getProducts();
                context.alertBox("Success", res?.data?.message || "Product deleted successfully.");
            } else {
                context.alertBox("error", res?.data?.message || "Failed to delete product.");
            }
            
            
        })
    }

    const deleteMultipleProduct = () => {
        if (sortedIds.length === 0) {
            context.alertBox("error", "Please select items to delete.");
            return;
        }

        try {
            deleteMultipleData(`/api/product/deleteMultiple`, {
                data: { ids: sortedIds }
            }).then((res) => {
                getProducts();
                context.alertBox("Success", "Product deleted")
                setSortedIds([]);
            })
        } catch (error) {
            context.alertBox("error", "Error deleting items.");
        }
    }


    return (
        <>

            <div className='flex items-center justify-between px-2 py-0 mt-3'>
                <h2 className='text-[18px] font-[600]'>Products</h2>

                
                <div className='col w-[45%] ml-auto flex items-center gap-3 justify-end'>
                    {
                        sortedIds?.length !== 0 && <Button variant='contained' className='btn-sm' size='small' color='error'
                            onClick={deleteMultipleProduct}
                        >
                            Delete({sortedIds?.length})
                        </Button>
                    }
                    <Button className='btn-blue text-white! btn-sm'
                        onClick={() => context.setIsOpenFullScreenPanel({
                            open: true,
                            model: 'Add Product'
                        })}
                    >Add Product</Button>
                </div>
            </div>


            <div className='card my-4 pt-5 shadow-md sm:rounded-lg bg-white'>


                <div className='grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 items-center w-full px-5 justify-between gap-4'>
                    <div className='col'>
                        <h4 className='font-[600] text-[13px] mb-2'>Category By</h4>

                        {
                            context?.catData?.length !== 0 &&
                            <Select
                                style={{zoom: '80%'}}
                                labelId="demo-simple-select-label"
                                id="productCatDrop"
                                size='small'
                                className='w-full'
                                value={productCat}
                                label="Category"
                                onChange={handleChangeProductCat}
                            >
                                {
                                    context?.catData?.map((cat, index) => {
                                        return (
                                            <MenuItem 
                                                value={cat?._id}
                                                // key={index}
                                            >
                                                {cat?.name}
                                            </MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        }
                    </div>

                    <div className='col'>
                        <h4 className='font-[600] text-[13px] mb-2'>Sub Category By</h4>

                        {
                            context?.catData?.length !== 0 &&
                            <Select
                                style={{zoom: '80%'}}
                                labelId="demo-simple-select-label"
                                id="productCatDrop"
                                size='small'
                                className='w-full'
                                value={productSubCat}
                                label="Sub Category"
                                onChange={handleChangeProductSubCat}
                            >
                                {
                                    context?.catData?.map((cat, index) => {
                                        return (
                                            cat?.Children?.length !== 0 && cat?.Children?.map((subCat, index_) => {
                                                return (
                                                    <MenuItem 
                                                        value={subCat?._id} 
                                                        // key={index_}
                                                    >
                                                        {subCat?.name}
                                                    </MenuItem>
                                                )
                                            })

                                        )
                                    })
                                }
                            </Select>
                        }
                    </div>

                    <div className='col'>
                        <h4 className='font-[600] text-[13px] mb-2'>Third Lavel Sub Category By</h4>

                        {
                            context?.catData?.length !== 0 &&
                            <Select
                                style={{zoom: '80%'}}
                                labelId="demo-simple-select-label"
                                id="productCatDrop"
                                size='small'
                                className='w-full'
                                value={productThirdLavelCat}
                                label="Sub Category"
                                onChange={handleChangeProductThirdLavelCat}
                            >
                                {
                                    context?.catData?.map((cat) => {
                                        return (
                                            cat?.Children?.length !== 0 && cat?.Children?.map((subCat) => {
                                                return (
                                                    subCat?.Children?.length !== 0 && subCat?.Children?.map((thirdsubCat, index) => {
                                                        return (
                                                            <MenuItem 
                                                                value={thirdsubCat?._id} 
                                                                key={index}
                                                            >
                                                                {thirdsubCat?.name}
                                                            </MenuItem>
                                                        )
                                                    })
                                                )
                                            })

                                        )
                                    })
                                }
                            </Select>
                        }
                    </div>

                    <div className='col w-full ml-auto flex items-center'>
                        <div style={{ alignSelf: 'end' }} className='w-full'>
                            <SearchBox />
                        </div>
                    </div>


                </div>
                <br />

                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Checkbox {...label} size='small'
                                        onChange={handleSelectAll}
                                        checked={productData?.length > 0 ? productData?.every((item) => item?.checked) : false}
                                    />
                                </TableCell>

                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {
                                isLoading === false ?
                                productData?.length !== 0 && productData?.slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )?.map((product, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell style={{ minWidth: columns.minWidth }}>
                                                <Checkbox {...label} size='small'
                                                    checked={product?.checked === true ? true : false} 
                                                    onChange={(e) => handleCheckboxChange(e, product._id, index)}
                                                />
                                            </TableCell>

                                            <TableCell style={{ minWidth: columns.minWidth }}>
                                                <div className='flex items-center gap-4 w-[300px]'>
                                                    <div className='img w-[65px] h-[65px] rounded-md overflow-hidden group'>
                                                        <Link to={`/product/${product?._id}`}>
                                                            <LazyLoadImage 
                                                             src={product?.images[0]} 
                                                             effect="blur"
                                                             className='w-full group-hover:scale-105 transition-all' 
                                                            />
                                                            
                                                        </Link> 
                                                    </div> 

                                                    <div className='info w-[75%]'>
                                                        <h3 className='font-[600] text-[12px] leading-4 hovertext-primary'>
                                                            <Link to={`/product/${product?._id}`} className='hover:text-primary'>
                                                                {product?.name}
                                                            </Link>
                                                        </h3>
                                                        <span className='text-[12px]'>{product?.brand}</span>
                                                    </div>
                                                </div>
                                            </TableCell>

                                            <TableCell style={{ minWidth: columns.minWidth }}>
                                                {product?.catName}
                                            </TableCell>

                                            <TableCell style={{ minWidth: columns.minWidth }}>
                                                {product?.subCat}
                                            </TableCell>

                                            <TableCell style={{ minWidth: columns.minWidth }}>
                                                <div className='flex gap-1 flex-col'>
                                                    <span className='oldPrice line-through leading-3 text-gray-500 text-[14px] font-[500]'>
                                                        &#x20b9; {product?.oldPrice}
                                                    </span>
                                                    <span className='price text-primary text-[14px] font-[600] text-green-600'>
                                                        &#x20b9; {product?.price}
                                                    </span>
                                                </div>
                                            </TableCell>

                                            <TableCell style={{ minWidth: columns.minWidth }}>
                                                <p className='text-[14px] w-[100px]'><span className='font-[600]'>{product?.sale}</span> sale</p>
                                                {/* <Progress type="warning" value={product?.sale} /> */}
                                            </TableCell>

                                            <TableCell style={{ minWidth: columns.minWidth }}>
                                                <p className='text-[14px] w-[100px]'>
                                                    <Rating name="read-only" value={product?.rating} readOnly size="small" precision={0.1} />
                                                </p>
                                                
                                            </TableCell>

                                            <TableCell style={{ minWidth: columns.minWidth }}>
                                                <div className='flex items-center gap-1'>
                                                    <Button className='w-[35px]! h-[35px]! min-w-[35px]! bg-[#f1f1f1] border! border-[rgba(0,0,0,0.2)]! rounded-full! hover:bg-[#f1f1f1]!'
                                                    onClick={() => context?.setIsOpenFullScreenPanel({
                                                        open: true,
                                                        model: 'Edit Product',
                                                        id: product?._id
                                                    })}
                                                    >
                                                        <AiOutlineEdit className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                                                    </Button>

                                                    <Link to={`/product/${product?._id}`}>
                                                        <Button className='w-[35px]! h-[35px]! min-w-[35px]! bg-[#f1f1f1] border! border-[rgba(0,0,0,0.2)]! rounded-full! hover:bg-[#f1f1f1]!'>
                                                            <FaRegEye className='text-[rgba(0,0,0,0.7)] text-[18px]' />
                                                        </Button>
                                                    </Link>
                                                

                                                    <Button className='w-[35px]! h-[35px]! min-w-[35px]! bg-[#f1f1f1] border! border-[rgba(0,0,0,0.2)]! rounded-full! hover:bg-[#f1f1f1]!'
                                                        onClick={() => deleteProduct(product?._id)}
                                                    >
                                                        <GoTrash className='text-[rgba(0,0,0,0.7)] text-[20px]' />
                                                    </Button>
                                                    



                                                </div>
                                            </TableCell>

                                        </TableRow>
                                    )
                                })
                                :
                                <TableSkeleton rowsPerPage={rowsPerPage} /> 
                            }


                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={productData?.length || 0}
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

export default Products;