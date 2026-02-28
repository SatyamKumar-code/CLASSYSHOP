import React, { useContext, useState } from 'react'
import Button from '@mui/material/Button';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import SearchBox from '../../Components/SearchBox';
import { useEffect } from 'react';
import { editData, fetchDataFromApi } from '../../utils/api';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { MyContext } from '../../App';
import { Pagination } from '@mui/material';

const Orders = () => {

  const [isOpenOrderdProduct, setIsOpenOrderdProduct] = useState(null);
  const [orders, setOrders] = useState({});
  const [orderStatus, setOrderStatus] = useState('');
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const [pageOrder, setPageOrder] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalOrdersData, setTotalOrdersData] = useState({});

  const context = useContext(MyContext);

  const isShowOrderdProduct = (index) => {
    if (isOpenOrderdProduct === index) {
      setIsOpenOrderdProduct(null);
    } else {
      setIsOpenOrderdProduct(index);
    }
  };

  const handleChange = (event, id) => {
    const newStatus = event.target.value;
    setUpdatingOrderId(id);
    const obj = {
      id: id,
      order_status: newStatus
    };
    editData(`/api/order/order-status/${id}`, obj).then((res) => {
      setUpdatingOrderId(null);
      if (res?.data?.error === false) {
        context?.alertBox("Success", res?.data?.message);
        if (searchQuery !== "") {
          // Refetch all orders and reapply search filter
          fetchDataFromApi(`/api/order/order-lists?limit=10000`).then((allRes) => {
            if (allRes?.error === false) {
              setTotalOrdersData(allRes);
              const filteredOrders = allRes?.data?.filter((order) => 
                order?._id?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                order?.userId?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                order?.userId?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                order?.delivery_address?.address_line1?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                order?.order_status?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                String(order?.delivery_address?.mobile)?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                order?.createdAt?.toLowerCase()?.includes(searchQuery)
              );
              setOrders({
                ...allRes,
                data: filteredOrders,
                totalResults: filteredOrders?.length
              });
            }
          });
        } else {
          // Refetch paginated orders for normal mode
          fetchDataFromApi(`/api/order/order-lists?page=${pageOrder}&limit=5`).then((res2) => {
            if (res2?.error === false) {
              setOrders(res2);
            }
          });
        }
      }
    });
  };

  // Initial load - fetch all orders for search functionality
  useEffect(() => {
    fetchDataFromApi(`/api/order/order-lists?limit=10000`).then((res) => {
      if (res?.error === false) {
        setTotalOrdersData(res)
      }
    })
  }, [orderStatus])

  // Fetch paginated orders when not searching
  useEffect(() => {
    if(searchQuery === "") {
      fetchDataFromApi(`/api/order/order-lists?page=${pageOrder}&limit=5`).then((res) => {
        if (res?.error === false) {
          setOrders(res)
        }
      })
    }
  }, [pageOrder, searchQuery, orderStatus])

  useEffect(() => {
    if(searchQuery !== ""){
      const filteredOrders = totalOrdersData?.data?.filter((order) => 
        order?._id?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        order?.userId?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        order?.userId?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        order?.delivery_address?.address_line1?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        order?.order_status?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        String(order?.delivery_address?.mobile)?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        order?.createdAt?.toLowerCase()?.includes(searchQuery)
      );
      setOrders({
        ...totalOrdersData,
        data: filteredOrders,
        totalResults: filteredOrders?.length
      });
    }
  },[searchQuery, totalOrdersData])

  useEffect(() => {
    if(searchQuery !== ""){
      setPageOrder(1);
    }
  },[searchQuery])


  return (
    <div className='card my-2 md:mt-4 shadow-md sm:rounded-lg bg-white'>
        <div className='grid grid-col-1 lg:grid-cols-2 px-5 py-5 flex-col sm:flex-row'>
          <h2 className='text-[18px]  font-[600] text-left mb-2 lg:mb-0'>Recent Orders</h2>
          <div className='ml-auto w-full md:w-[45%]'>
            <SearchBox 
              serchQuery={searchQuery}
              setSearchQuery={setSearchQuery} 
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
            orders?.data?.length !== 0 && (searchQuery !== "" 
              ? orders?.data?.slice(
                  (pageOrder - 1) * 5,
                  (pageOrder - 1) * 5 + 5
                )
              : orders?.data
            )?.map((order, index) => {
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
                      <td className="px-6 py-4 font-[500]">
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={order?.order_status || ''}
                          label="Status"
                          size='small'
                          style={{ zoom: '80%'}}
                          className='w-full'
                          onChange={(e) => handleChange(e, order?._id)}
                          disabled={updatingOrderId === order?._id}
                        >
                          <MenuItem value={'pending'}>Pending</MenuItem>
                          <MenuItem value={'confirm'}>Confirm</MenuItem>
                          <MenuItem value={'shipped'}>Shipped</MenuItem> 
                          <MenuItem value={'delivered'}>Delivered</MenuItem>
                          <MenuItem value={'cancelled'}>Cancelled</MenuItem>
                          <MenuItem value={'refund'}>Refund</MenuItem>
                        </Select>
                      </td>
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
                                        <tr className="bg-white border-b">
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
        (searchQuery !== "" ? Math.ceil(orders?.data?.length / 5) : orders?.totalPages) > 1 &&
        <div className='flex items-center justify-center mt-3 pb-3 paginationSmall'>
          <Pagination
            showFirstButton showLastButton
            count={searchQuery !== "" ? Math.ceil(orders?.data?.length / 5) : orders?.totalPages}
            page={pageOrder}
            onChange={(e, value) => setPageOrder(value)}
          />
        </div>
      }

      </div>
  )
}

export default Orders;