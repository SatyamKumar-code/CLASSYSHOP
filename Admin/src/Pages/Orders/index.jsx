import React, { useContext, useState } from 'react'
import Button from '@mui/material/Button';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import Badge from '../../Components/Badge'
import SearchBox from '../../Components/SearchBox';
import { useEffect } from 'react';
import { editData, fetchDataFromApi } from '../../utils/api';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { MyContext } from '../../App';

const Orders = () => {

  const [isOpenOrderdProduct, setIsOpenOrderdProduct] = useState(null);
  const [orders, setOrders] = useState([])
  const [orderStatus, setOrderStatus] = useState('')

  const context = useContext(MyContext);

  const isShowOrderdProduct = (index) => {
    if (isOpenOrderdProduct === index) {
      setIsOpenOrderdProduct(null);
    } else {
      setIsOpenOrderdProduct(index);
    }
  };

  const handleChange = (event , id) => {
    setOrderStatus(event.target.value);

    const obj = {
      id : id,
      order_status : event.target.value
    }

    editData(`/api/order/order-status/${id}`, obj).then((res) => {
      if (res?.data?.error === false) {
        context?.alertBox("Success", res?.data?.message)
      }
    })
  }

  useEffect(() => {
    fetchDataFromApi('/api/order/order-list').then((res) => {
      if (res?.error === false) {
        setOrders(res?.data)
      }
    })
  }, [orderStatus])


  return (
    <div className='card my-4 shadow-md sm:rounded-lg bg-white'>
        <div className='flex items-center justify-between px-5 py-5'>
          <h2 className='text-[18px] font-[600]'>Recent Orders</h2>
          <div className='w-[40%]'><SearchBox /></div>
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
              orders?.length !== 0 && orders?.map((order, index) => {
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
                          value={
                            order?.order_status !== null ? order?.order_status : orderStatus
                          }
                          label="Status"
                          size='small'
                          className='w-full'
                          onChange={(e) => handleChange(e, order?._id)}
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

      </div>
  )
}

export default Orders;