import React, { useState, useContext, useEffect } from 'react'
import DashboardBoxes from '../../Components/DashboardBoxes';
import Button from '@mui/material/Button';
import { FaPlus } from 'react-icons/fa6';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import Badge from '../../Components/Badge'
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

import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import { MyContext } from '../../App';
import { fetchDataFromApi } from '../../utils/api';
import { Pagination } from '@mui/material';


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
  const [ordersData, setOrdersData] = useState([]);
  const [orders, setOrders] = useState([]);

  const isShowOrderdProduct = (index) => {
    if (isOpenOrderdProduct === index) {
      setIsOpenOrderdProduct(null);
    } else {
      setIsOpenOrderdProduct(index);
    }
  }


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageOrder, setPageOrder] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalOrdersData, setTotalOrdersData] = useState([]);

  const [users, setUsers] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const [ordersCount, setOrdersCount] = useState(null);

  const [categoryFilterVal, setCategoryFilterVal] = useState('');
  const [chartData, setChartData] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());

  const context = useContext(MyContext);

  useEffect(() => {
    getProducts();
  }, [context?.isOpenFullScreenPanel?.open]);

  useEffect(() => {
    fetchDataFromApi(`/api/order/order-list?page=${pageOrder}&limit=5`).then((res) => {
      if (res?.error === false) {
        setOrders(res);
        setOrdersData(res?.data);
      }
    })
    fetchDataFromApi(`/api/order/order-list`).then((res) => {
      if (res?.error === false) {
        setTotalOrdersData(res);
      }
    })
    fetchDataFromApi('/api/order/count').then((res) => {
      if(res?.error === false) {
        setOrdersCount(res?.count);
      }
    })
  }, [pageOrder]);

  useEffect(() => {
    if(searchQuery !== ""){
      const filteredOrders = totalOrdersData?.data?.filter((order) => 
        order?._id?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        order?.userId?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        order?.userId?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        order?.createdAt?.includes(searchQuery)
      );
      setOrdersData(filteredOrders);
    } else {
      fetchDataFromApi(`/api/order/order-list?page=${pageOrder}&limit=5`).then((res) => {
        if(res?.error === false) {
          setOrders(res);
          setOrdersData(res?.data);
        }
      })
    }
  },[searchQuery])

  useEffect(() => {
    getTotalSalesByYear();

    fetchDataFromApi("/api/user/getAllUsers").then((res) => {
      if(res?.error === false){
        setUsers(res?.users);
      }
    })

    fetchDataFromApi("/api/user/getAllReviews").then((res) => {
      if(res?.error === false){
        setAllReviews(res?.reviews);
      }
    })
  }, []);



  const getProducts = async () => {
    setIsLoading(true);
    fetchDataFromApi("/api/product/getAllProducts").then((res) => {
      let productArr = [];
      if (res?.error === false) {
        productArr = res?.products;
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

  const getTotalUsersByYear = () =>{
    fetchDataFromApi('/api/order/users').then((res) => {
      const users = [];
      res?.TotalUsers?.length !== 0 && 
      res?.TotalUsers?.map((item) => {
        users.push({
          name: item?.name,
          TotalUsers: parseInt(item?.TotalUsers)
        });
      });

      const uniqueArr = users.filter(
        (obj, index, self) => 
          index === self.findIndex((t) => t.name === obj.name)
      );
      setChartData(uniqueArr);
    })
  }

  const getTotalSalesByYear = () => {
    fetchDataFromApi('/api/order/sales').then((res) => {
      const sales = [];
      res?.monthlySales?.length !== 0 &&
      res?.monthlySales?.map((item) => {
        sales.push({
          name: item?.name,
          TotalSales: parseInt(item?.TotalSales)
        });
      });

      const uniqueArr = sales.filter(
        (obj, index, self) => 
          index === self.findIndex((t) => t.name === obj.name)
      );
      setChartData(uniqueArr);
    });
  }


  const handleChangeYear = (event) => {

  }

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

      {
        productData?.length !== 0 && users?.length !== 0 && allReviews?.length !== 0 && ordersCount !== null && 
        <DashboardBoxes orders={ordersCount} products={productData?.length} users={users?.length} reviews={allReviews?.length} category={context?.catData?.length} />
      }

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
          <div className='w-[25%]'>
            <SearchBox
              serchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setPageOrdr={setPageOrder}
            />
          </div>
        </div>

        <div className="relative overflow-x-auto mt-5">
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

              {
                ordersData?.length !== 0 && ordersData?.map((order, index) => {
                  return (
                    <>
                      <tr className="bg-white border-b">
                        <td className="px-6 py-4 font-[500]">
                          <Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]'
                            onClick={() => isShowOrderdProduct(index)}>
                            {
                              isOpenOrderdProduct === index ? <FaAngleUp className='text-[16px] text-[rgba(0,0,0,0.7)]' /> : <FaAngleDown className='text-[16px] text-[rgba(0,0,0,0.7)]' />
                            }
                          </Button>
                        </td>
                        <td className="px-6 py-4 font-[500]">
                          <span className='text-primary'>{order?._id}</span>
                        </td>
                        <td className="px-6 py-4 font-[500]">
                          <span className='text-primary'>{order?.paymentId ? order?.paymentId : 'CASH ON DELIVERY'}</span>
                        </td>
                        <td className="px-6 py-4 font-[500] whitespace-nowrap">{order?.userId?.name}</td>
                        <td className="px-6 py-4 font-[500]">{order?.delivery_address?.mobile}</td>
                        <td className="px-6 py-4 font-[500]">
                          <span className='block w-[400px]'>
                            {order?.delivery_address?.address_line1 + " " +
                              order?.delivery_address?.city + " " +
                              order?.delivery_address?.landmark + " " +
                              order?.delivery_address?.state + " " +
                              order?.delivery_address?.country
                            }
                          </span>
                        </td>
                        <td className="px-6 py-4 font-[500]">{order?.delivery_address?.pincode}</td>
                        <td className="px-6 py-4 font-[500]">{order?.totalAmt?.toLocaleString('en-US', { style: 'currency', currency: 'INR' })}</td>
                        <td className="px-6 py-4 font-[500]">{order?.userId?.email}</td>
                        <td className="px-6 py-4 font-[500]">
                          <span className='text-primary'>{order?.userId?._id}</span>
                        </td>
                        <td className="px-6 py-4 font-[500]"><Badge status={order?.order_status} /></td>
                        <td className="px-6 py-4 font-[500] whitespace-nowrap">{order?.createdAt?.split("T")[0]}</td>

                      </tr>

                      {
                        isOpenOrderdProduct === index && (
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
                                    {
                                      order?.products?.length !== 0 && order?.products?.map((item, index) => {
                                        return (
                                          <tr key={index} className="bg-white border-b">
                                            <td className="px-6 py-4 font-[500]">
                                              <span className='text-gray-600'>{item?._id}</span>
                                            </td>
                                            <td className="px-6 py-4 font-[500]">
                                              <div className='w-[200px]'>
                                                {item?.productTitle?.length > 40 ? item?.productTitle?.slice(0, 40) + "..." : item?.productTitle}
                                              </div>
                                            </td>
                                            <td className="px-6 py-4 font-[500]">
                                              <img src={item?.image}
                                                className='w-[40px] h-[40px] object-cover rounded-md' />
                                            </td>
                                            <td className="px-6 py-4 font-medium">{item?.quantity}</td>
                                            <td className="px-6 py-4 font-medium">{item?.price?.toLocaleString('en-US', { style: 'currency', currency: 'INR' })}</td>
                                            <td className="px-6 py-4 font-medium">{item?.subTotal?.toLocaleString('en-US', { style: 'currency', currency: 'INR' })}</td>


                                          </tr>
                                        )
                                      })
                                    }


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
                    </>
                  )
                })
              }
            </tbody>
          </table>
        </div>

        {
          orders?.totalPages > 1 && 
          <div className='flex items-center justify-center mt-10 pb-5'>
            <Pagination
              showFirstButton showLastButton
              count={orders?.totalPages}
              page={pageOrder}
              onChange={(e, value) => setPageOrder(value)}
              
            />
          </div>
        }

      </div>

      <div className='card my-4 shadow-md sm:rounded-lg bg-white'>
        <div className='flex items-center justify-between px-5 py-5 pb-0'>
          <h2 className='text-[18px] font-[600]'>Total User & Total Sales</h2>
        </div>

        <div className='flex items-center px-5 py-5 pt- gap-5'>

          <span className='flex items-center gap-1 text-[15px] cursor-pointer' onClick={getTotalSalesByYear}>
            <span className='block w-[8px] h-[8px] rounded-full bg-[#16a34a]'></span>
            Total Sales
          </span>
          
          <span className='flex items-center gap-1 text-[15px] cursor-pointer' onClick={getTotalUsersByYear}>
            <span className='block w-[8px] h-[8px] rounded-full bg-[#0858f7]'></span>
            Total Users
          </span>
        </div>

        {
          chartData?.length !== 0 &&
          <BarChart
            width={1000}
            height={500}
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis
              dataKey="name"
              scale="point"
              padding={{ left: 10, right: 10 }}
              tick={{ fontSize: 12 }}
              label={{ position: "insideBottom", fontSize: 14 }}
              style={{ fill: context?.them === "dark" ? "white" : "#000" }}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              label={{ angle: -90, position: "insideLeft", fontSize: 14 }}
              style={{ fill: context?.them === "dark" ? "white" : "#000" }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: "#071739",
                color: "white",
              }} // Set tooltip background and text color
              labelStyle={{ color: "yellow"}} // label text color
              itemStyle={{ color: "cyan "}} // set color for individul item in the tooltip
              cursor={{ fill: "white" }} // Customize the tooltip cursor background color
            />
            <Legend />
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={false}
              vertical={false}
            />
              <Bar dataKey="TotalSales" stackId="a" fill="#16a34a"/>
              <Bar dataKey="TotalUsers" stackId="b" fill="#0858f7" />
          </BarChart>
        }
      </div>
    </>
  )
}

export default Dashboard; 