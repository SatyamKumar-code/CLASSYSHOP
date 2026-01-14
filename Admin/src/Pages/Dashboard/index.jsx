import React, { useState, PureComponent, useContext, useEffect } from 'react'
import DashboardBoxes from '../../Components/DashboardBoxes';
import Button from '@mui/material/Button';
import { FaPlus } from 'react-icons/fa6';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import Badge from '../../Components/Badge'
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { FaRegEye } from 'react-icons/fa6';
import { GoTrash } from 'react-icons/go';
import SearchBox from '../../Components/SearchBox';
import TableSkeleton from '../../Components/Skeleton/TableSkeleton';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Rating from '@mui/material/Rating';



import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { MyContext } from '../../App';
import { fetchDataFromApi } from '../../utils/api';



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

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}






const Dashboard = () => {


  const [isOpenOrderdProduct, setIsOpenOrderdProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [productCat, setProductCat] = useState('');
  const [productData, setProductData] = useState([]);
  const [productSubCat, setProductSubCat] = useState('');
  const [productThirdLavelCat, setProductThirdLavelCat] = useState('');
  const [sortedIds, setSortedIds] = useState([]);

  const isShowOrderdProduct = (index) => {
    if (isOpenOrderdProduct === index) {
      setIsOpenOrderdProduct(null);
    } else {
      setIsOpenOrderdProduct(index);
    }
  }


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [categoryFilterVal, setCategoryFilterVal] = useState('');
  const [chart1Data, setChart1Data] = useState([
    {
      name: 'JAN',
      TotalSales: 4000,
      TotalUsers: 2400,
      amt: 2400,
    },
    {
      name: 'FEB',
      TotalSales: 3000,
      TotalUsers: 1398,
      amt: 2210,
    },
    {
      name: 'MAR',
      TotalSales: 2000,
      TotalUsers: 9800,
      amt: 2290,
    },
    {
      name: 'APR',
      TotalSales: 2780,
      TotalUsers: 3908,
      amt: 2000,
    },
    {
      name: 'MAY',
      TotalSales: 1890,
      TotalUsers: 4800,
      amt: 2181,
    },
    {
      name: 'JUN',
      TotalSales: 2390,
      TotalUsers: 3800,
      amt: 2500,
    },
    {
      name: 'JUL',
      TotalSales: 3490,
      TotalUsers: 4300,
      amt: 2100,
    },
    {
      name: 'AUG',
      TotalSales: 8990,
      TotalUsers: 3500,
      amt: 4500,
    },
    {
      name: 'SEP',
      TotalSales: 5490,
      TotalUsers: 4300,
      amt: 2100,
    },
    {
      name: 'OCT',
      TotalSales: 3490,
      TotalUsers: 6520,
      amt: 2100,
    },
    {
      name: 'NOV',
      TotalSales: 3490,
      TotalUsers: 2300,
      amt: 2100,
    },
    {
      name: 'DEC',
      TotalSales: 3990,
      TotalUsers: 5300,
      amt: 2600,
    }
  ]);

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
      console.log(ids);
      setSortedIds(ids);

    } else[
      setSortedIds([])
    ]
  }

  const getProducts = async () => {
    setIsLoading(true);
    fetchDataFromApi("/api/product/getAllProducts").then((res) => {
      let productArr = [];
      if (res?.error === false) {
        for (let i = 0; i < res?.products?.length; i++) {
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

  return (
    <>
      <div className='w-full py-2 px-5 border bg-[#f1faff] border-[rgba(0,0,0,0.1)] flex items-center gap-8 mb-5 justify-between rounded-md'>
        <div className='info'>
          <h1 className='text-[35px] font-bold leading-10 mb-3'>Good Morning, <br /> Cameron👋 </h1>
          <p>Hear's What happening on your store today. See the statistics at once.</p>
          <br />
          <Button className="btn-blue capitalize!"
            onClick={() => context.setIsOpenFullScreenPanel({
              open: true,
              model: "Add Product"
            })}
          >
            <FaPlus />
            Add product
          </Button>
        </div>

        <img src="/shop-illustration.webp" className='w-[250px]' />
      </div>
      <DashboardBoxes />

      <div className='card my-4 pt-5 shadow-md sm:rounded-lg bg-white'>


        <div className='flex items-center w-full px-5 justify-between gap-4'>
          <div className='col w-[15%]'>
            <h4 className='font-[600] text-[13px] mb-2'>Category By</h4>

            {
              context?.catData?.length !== 0 &&
              <Select
                style={{ zoom: '80%' }}
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

          <div className='col w-[15%]'>
            <h4 className='font-[600] text-[13px] mb-2'>Sub Category By</h4>

            {
              context?.catData?.length !== 0 &&
              <Select
                style={{ zoom: '80%' }}
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

          <div className='col w-[20%]'>
            <h4 className='font-[600] text-[13px] mb-2'>Third Lavel Sub Category By</h4>

            {
              context?.catData?.length !== 0 &&
              <Select
                style={{ zoom: '80%' }}
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

          <div className='col w-[20%] ml-auto'>
            <SearchBox />
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
                            <Rating name='half-rating' size='small' value={product?.rating} precision={0.5} readOnly />
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
        />

      </div>








      <div className='card my-4 shadow-md sm:rounded-lg bg-white'>
        <div className='flex items-center justify-between px-5 py-5'>
          <h2 className='text-[18px] font-[600]'>Recent Orders</h2>
        </div>

        <div className="relative overflow-x-auto mt-5 pb-5">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  &nbsp;
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Order Id
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  paymant Id
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Phone Number
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Address
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Pincode
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Total Amount
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  User Id
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Order status
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b">
                <td className="px-6 py-4 font-[500]">
                  <Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]'
                    onClick={() => isShowOrderdProduct(0)}>
                    {
                      isOpenOrderdProduct === 0 ? <FaAngleUp className='text-[16px] text-[rgba(0,0,0,0.7)]' /> : <FaAngleDown className='text-[16px] text-[rgba(0,0,0,0.7)]' />
                    }
                  </Button>
                </td>
                <td className="px-6 py-4 font-[500]">
                  <span className='text-primary font-[600]'>347593769375970703</span>
                </td>
                <td className="px-6 py-4 font-[500]">
                  <span className='text-primary font-[600]'>Pay_PTPQqEXFhrteyyt</span>
                </td>
                <td className="px-6 py-4 font-[500] whitespace-nowrap">satyam Kumar</td>
                <td className="px-6 py-4 font-[500]">6206627876</td>
                <td className="px-6 py-4 font-[500]">
                  <span className='block w-[400px]'>H No 22 Street No 6 Adarsh MohallaMaujpur Delhi mear shivam medical ph. +91-6201391650</span>
                </td>
                <td className="px-6 py-4 font-[500]">8474707</td>
                <td className="px-6 py-4 font-[500]">3500</td>
                <td className="px-6 py-4 font-[500]">satyamkumar@gmail.com</td>
                <td className="px-6 py-4 font-[500]">
                  <span className='text-primary font-[600]'>8979fg7927s25r</span>
                </td>
                <td className="px-6 py-4 font-[500]"><Badge status="pending" /></td>
                <td className="px-6 py-4 font-[500] whitespace-nowrap">2025-12-13</td>

              </tr>

              {
                isOpenOrderdProduct === 0 && (
                  <tr>
                    <td className='pl-20' colSpan="6">
                      <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>

                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Product Id
                              </th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Product Title
                              </th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Image
                              </th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Quantity
                              </th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Price
                              </th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Sub Total
                              </th>

                            </tr>
                          </thead>
                          <tbody>
                            <tr className="bg-white border-b">
                              <td className="px-6 py-4 font-[500]">
                                <span className='text-gray-600'>347593769375970703</span>
                              </td>
                              <td className="px-6 py-4 font-[500]">A_Line Kurti With Sharara & Du...</td>
                              <td className="px-6 py-4 font-[500]">
                                <img src="https://www.jiomart.com/images/product/original/rvt6wzx9ww/tazo-mens-round-neck-regular-fit-full-length-sleeve-t-shirt-t-shirt-for-mens-mens-t-shirt-mens-tshirt-tshirt-for-mens-t-shirts-tshirts-gym-wear-sports-wear-mens-tshirt-dryfit-t-shirts-product-images-rvt6wzx9ww-0-202404152348.jpg"
                                  className='w-[40px] h-[40px] object-cover rounded-md' />
                              </td>
                              <td className="px-6 py-4 font-medium">2</td>
                              <td className="px-6 py-4 font-medium">1300</td>
                              <td className="px-6 py-4 font-medium">2600</td>


                            </tr>

                            <tr className="bg-white border-b">
                              <td className="px-6 py-4 font-[500]">
                                <span className='text-gray-600'>347593769375970703</span>
                              </td>
                              <td className="px-6 py-4 font-[500]">A_Line Kurti With Sharara & Du...</td>
                              <td className="px-6 py-4 font-[500]">
                                <img src="https://www.jiomart.com/images/product/original/rvt6wzx9ww/tazo-mens-round-neck-regular-fit-full-length-sleeve-t-shirt-t-shirt-for-mens-mens-t-shirt-mens-tshirt-tshirt-for-mens-t-shirts-tshirts-gym-wear-sports-wear-mens-tshirt-dryfit-t-shirts-product-images-rvt6wzx9ww-0-202404152348.jpg"
                                  className='w-[40px] h-[40px] object-cover rounded-md' />
                              </td>
                              <td className="px-6 py-4 font-medium">2</td>
                              <td className="px-6 py-4 font-medium">1300</td>
                              <td className="px-6 py-4 font-medium">2600</td>


                            </tr>

                            <tr>
                              <td className='bg-[#f1f1f1]' colSpan="12">

                              </td>
                            </tr>


                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                )
              }


              <tr className="bg-white border-b">
                <td className="px-6 py-4 font-[500]">
                  <Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]'
                    onClick={() => isShowOrderdProduct(1)}>
                    {
                      isOpenOrderdProduct === 1 ? <FaAngleUp className='text-[16px] text-[rgba(0,0,0,0.7)]' /> : <FaAngleDown className='text-[16px] text-[rgba(0,0,0,0.7)]' />
                    }
                  </Button>
                </td>
                <td className="px-6 py-4 font-[500]">
                  <span className='text-primary font-[600]'>347593769375970703</span>
                </td>
                <td className="px-6 py-4 font-[500]">
                  <span className='text-primary font-[600]'>Pay_PTPQqEXFhrteyyt</span>
                </td>
                <td className="px-6 py-4 font-[500] whitespace-nowrap">satyam Kumar</td>
                <td className="px-6 py-4 font-[500]">6206627876</td>
                <td className="px-6 py-4 font-[500]">
                  <span className='block w-[400px]'>H No 22 Street No 6 Adarsh MohallaMaujpur Delhi mear shivam medical ph. +91-6201391650</span>
                </td>
                <td className="px-6 py-4 font-[500]">8474707</td>
                <td className="px-6 py-4 font-[500]">3500</td>
                <td className="px-6 py-4 font-[500]">satyamkumar@gmail.com</td>
                <td className="px-6 py-4 font-[500]">
                  <span className='text-primary font-[600]'>8979fg7927s25r</span>
                </td>
                <td className="px-6 py-4 font-[500]"><Badge status="pending" /></td>
                <td className="px-6 py-4 font-[500] whitespace-nowrap">2025-12-13</td>

              </tr>

              {
                isOpenOrderdProduct === 1 && (
                  <tr>
                    <td className='pl-20' colSpan="6">
                      <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>

                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Product Id
                              </th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Product Title
                              </th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Image
                              </th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Quantity
                              </th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Price
                              </th>
                              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                Sub Total
                              </th>

                            </tr>
                          </thead>
                          <tbody>
                            <tr className="bg-white border-b">
                              <td className="px-6 py-4 font-[500]">
                                <span className='text-gray-600'>347593769375970703</span>
                              </td>
                              <td className="px-6 py-4 font-[500]">A_Line Kurti With Sharara & Du...</td>
                              <td className="px-6 py-4 font-[500]">
                                <img src="https://www.jiomart.com/images/product/original/rvt6wzx9ww/tazo-mens-round-neck-regular-fit-full-length-sleeve-t-shirt-t-shirt-for-mens-mens-t-shirt-mens-tshirt-tshirt-for-mens-t-shirts-tshirts-gym-wear-sports-wear-mens-tshirt-dryfit-t-shirts-product-images-rvt6wzx9ww-0-202404152348.jpg"
                                  className='w-[40px] h-[40px] object-cover rounded-md' />
                              </td>
                              <td className="px-6 py-4 font-medium">2</td>
                              <td className="px-6 py-4 font-medium">1300</td>
                              <td className="px-6 py-4 font-medium">2600</td>


                            </tr>

                            <tr className="bg-white border-b">
                              <td className="px-6 py-4 font-[500]">
                                <span className='text-gray-600'>347593769375970703</span>
                              </td>
                              <td className="px-6 py-4 font-[500]">A_Line Kurti With Sharara & Du...</td>
                              <td className="px-6 py-4 font-[500]">
                                <img src="https://www.jiomart.com/images/product/original/rvt6wzx9ww/tazo-mens-round-neck-regular-fit-full-length-sleeve-t-shirt-t-shirt-for-mens-mens-t-shirt-mens-tshirt-tshirt-for-mens-t-shirts-tshirts-gym-wear-sports-wear-mens-tshirt-dryfit-t-shirts-product-images-rvt6wzx9ww-0-202404152348.jpg"
                                  className='w-[40px] h-[40px] object-cover rounded-md' />
                              </td>
                              <td className="px-6 py-4 font-medium">2</td>
                              <td className="px-6 py-4 font-medium">1300</td>
                              <td className="px-6 py-4 font-medium">2600</td>


                            </tr>

                            <tr>
                              <td className='bg-[#f1f1f1]' colSpan="12">

                              </td>
                            </tr>


                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                )
              }



            </tbody>
          </table>
        </div>

      </div>

      <div className='card my-4 shadow-md sm:rounded-lg bg-white'>
        <div className='flex items-center justify-between px-5 py-5 pb-0'>
          <h2 className='text-[18px] font-[600]'>Tptal User & Total Sales</h2>
        </div>

        <div className='flex items-center px-5 py-5 pt- gap-5'>
          <span className='flex items-center gap-1 text-[15px]'>
            <span className='block w-[8px] h-[8px] rounded-full bg-green-600'></span>
            Total Users
          </span>

          <span className='flex items-center gap-1 text-[15px]'>
            <span className='block w-[8px] h-[8px] rounded-full bg-primary'></span>
            Total Sales
          </span>
        </div>

        <LineChart
          width={1200}
          height={500}
          data={chart1Data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="none" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="TotalSales"
            stroke="#8884d8"
            strokeWidth={3}
            activeDot={{ r: 8 }} />
          <Line
            type="monotone"
            dataKey="TotalUsers"
            stroke="#82ca9d"
            strokeWidth={3} />

        </LineChart>
      </div>
    </>
  )
}

export default Dashboard; 