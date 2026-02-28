import React, { useState, useContext, useEffect } from 'react'
import DashboardBoxes from '../../Components/DashboardBoxes';
import Button from '@mui/material/Button';
import { FaPlus } from 'react-icons/fa6';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import Badge from '../../Components/Badge'
import SearchBox from '../../Components/SearchBox';

import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import { MyContext } from '../../App';
import { fetchDataFromApi } from '../../utils/api';
import { Pagination } from '@mui/material';
import Products from '../Products';


const Dashboard = () => {


  const [isOpenOrderdProduct, setIsOpenOrderdProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [productData, setProductData] = useState([]);
  const [ordersData, setOrdersData] = useState([]);
  const [orders, setOrders] = useState([]);

  const isShowOrderdProduct = (orderId) => {
    if (isOpenOrderdProduct === orderId) {
      setIsOpenOrderdProduct(null);
    } else {
      setIsOpenOrderdProduct(orderId);
    }
  }


  const [pageOrder, setPageOrder] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [totalOrdersData, setTotalOrdersData] = useState([]);

  const [users, setUsers] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const [ordersCount, setOrdersCount] = useState(null);

  const [chartData, setChartData] = useState([]);

  const context = useContext(MyContext);

  useEffect(() => {
    getProducts();
  }, [context?.isOpenFullScreenPanel?.open]);

  // Fetch all orders data and count only once on mount
  useEffect(() => {
    fetchDataFromApi(`/api/order/order-lists?limit=10000`).then((res) => {
      if (res?.error === false) {
        setTotalOrdersData(res);
      }
    })
    fetchDataFromApi('/api/order/count').then((res) => {
      if(res?.error === false) {
        setOrdersCount(res?.count);
      }
    })
  }, []);

  // Fetch paginated orders when page changes
  useEffect(() => {
    if(searchQuery === "") {
      fetchDataFromApi(`/api/order/order-lists?page=${pageOrder}&limit=5`).then((res) => {
        if (res?.error === false) {
          setOrders(res);
          setOrdersData(res?.data);
        }
      })
    }
  }, [pageOrder, searchQuery]);

  useEffect(() => {
    if(searchQuery !== ""){
      const filteredOrders = totalOrdersData?.data?.filter((order) => 
        order?._id?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        order?.userId?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        order?.userId?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        order?.userId?.delivery_address?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        order?.order_status?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        String(order?.delivery_address?.mobile)?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        order?.createdAt?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
      setOrdersData(filteredOrders);
    }
  },[searchQuery, totalOrdersData])

  useEffect(() => {
    if(searchQuery !== ""){
      setPageOrder(1);
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


  return (
    <>
      <div className='w-full py-5 px-5 border bg-[#f1faff] border-[rgba(0,0,0,0.1)] flex items-center gap-8 mb-5 justify-between rounded-md'>
        <div className='info'>
          <h1 className='text-[28px] sm:text-[35px] font-bold leading-10 mb-3'>Welcome, <br /><span className='text-blue-600'> {context?.userData?.name || "User"} </span></h1>
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

        <img src="/shop-illustration.webp" className='w-[250px] hidden lg:block' />
      </div>

      {
        productData?.length !== 0 && users?.length !== 0 && allReviews?.length !== 0 && ordersCount !== null && 
        <DashboardBoxes orders={ordersCount} products={productData?.length} users={users?.length} reviews={allReviews?.length} category={context?.catData?.length} />
      }

      <Products />








      <div className='card my-2 md:mt-4 shadow-md sm:rounded-lg bg-white'>
        <div className='grid grid-col-1 lg:grid-cols-2 px-5 py-5 flex-col sm:flex-row'>
          <h2 className='text-[18px]  font-[600] text-left mb-2 lg:mb-0'>Recent Orders</h2>
          <div className='ml-auto w-full md:w-[45%]'>
            <SearchBox
              serchQuery={orderSearchQuery}
              setSearchQuery={setOrderSearchQuery}
              setPageOrdr={() => setPageOrder(1)}
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
                ordersData?.length !== 0 && (searchQuery !== "" 
                  ? ordersData?.slice(
                      (pageOrder - 1) * 5,
                      (pageOrder - 1) * 5 + 5
                    )
                  : ordersData
                )?.map((order, index) => {
                  return (
                    <>
                      <tr className="bg-white border-b">
                        <td className="px-6 py-4 font-[500]">
                          <Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]'
                            onClick={() => isShowOrderdProduct(order?._id)}>
                            {
                              isOpenOrderdProduct === order?._id ? <FaAngleUp className='text-[16px] text-[rgba(0,0,0,0.7)]' /> : <FaAngleDown className='text-[16px] text-[rgba(0,0,0,0.7)]' />
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
                        isOpenOrderdProduct === order?._id && (
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
          (searchQuery !== "" ? Math.ceil(ordersData?.length / 5) : orders?.totalPages) > 1 && 
          <div className='flex items-center justify-center mt-10 pb-5 paginationSmall'>
            <Pagination
              showFirstButton showLastButton
              count={searchQuery !== "" ? Math.ceil(ordersData?.length / 5) : orders?.totalPages}
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
            width={context?.windowWidth > 922 ? (context?.windowWidth - 300) : (context?.windowWidth - 25)}
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