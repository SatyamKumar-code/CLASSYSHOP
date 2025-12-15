import React, { useState } from 'react'
import DashboardBoxes from '../../Components/DashboardBoxes';
import Button from '@mui/material/Button';
import { FaPlus } from 'react-icons/fa6';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import Badge from '../../Components/Badge'
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Dashboard = () => {


  const [isOpenOrderdProduct, setIsOpenOrderdProduct] = useState(null);

  const isShowOrderdProduct = (index) => {
    if (isOpenOrderdProduct === index) {
      setIsOpenOrderdProduct(null);
    } else {
      setIsOpenOrderdProduct(index);
    }
  }

  return (
    <>
      <div className='w-full py-2 px-5 border bg-[#f1faff] border-[rgba(0,0,0,0.1)] flex items-center gap-8 mb-5 justify-between rounded-md'>
        <div className='info'>
          <h1 className='text-[35px] font-bold leading-10 mb-3'>Good Morning, <br /> Cameron👋 </h1>
          <p>Hear's What happening on your store today. See the statistics at once.</p>
          <br />
          <Button className="btn-blue capitalize!"><FaPlus /> Add product</Button>
        </div>

        <img src="/shop-illustration.webp" className='w-[250px]' />
      </div>
      <DashboardBoxes />

      <div className='card my-4 shadow-md sm:rounded-lg bg-white'>
        <div className='flex items-center justify-between px-5 py-5'>
          <h2 className='text-[18px] font-[600]'>Products</h2>
        </div>

        <div className="relative overflow-x-auto mt-5 pb-5">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3" width="10%">
                  <div className='w-[60px]'>
                    <Checkbox {...label} size='small' />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Sub Category
                </th>
               
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  SALES
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Action
                </th>
                
              </tr>
            </thead>
            <tbody>
              <tr className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
                <td className='px-6 py-2'>
                  <div className='w-[60px]'>
                    <Checkbox {...label} size='small' />
                  </div>
                </td>

                <td className='px-6 py-2'>
                  <div className='flex items-center gap-4 w-[350px]'>
                    <div className='img w-[65px] h-[65px] rounded-md overflow-hidden group'>
                      <Link to="/product/45745">
                      <img src='https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/15.webp'
                       className='w-full group-hover:scale-105 transition-all'
                       />
                       </Link>
                      </div>

                      <div className='info w-[75%]'>
                        <h3 className='font-[600] text-[12px] leading-4 hovertext-primary'>
                          <Link to="/product/45745">
                          Electronic Rubber Table
                          </Link>
                          </h3>
                        <span className='text-[12px]'>Books</span>
                      </div>
                  </div>
                </td>

                <td className='px-6 py-2'>
                  Electronics
                </td>

                <td className='px-6 py-2'>
                  Women
                </td>

                <td className='px-6 py-2'>
                  <div className='flex gap-1 flex-col'>
                    <span className='oldPrice line-through leading-3 text-gray-500 text-[14px] font-[500]'>
                      $58.00
                    </span>
                    <span className='price text-primary text-[14px] font-[600] text-green-600'>
                      $45.00
                    </span>
                  </div>
                </td>

                <td className='px-6 py-2'>
                  <p className='text-[14px] w-[150px]'><span className='font-[600]'>234</span> sale</p>
                </td>

                <td className='px-6 py-2'>
                   
                </td>

                
              </tr>




            </tbody>
          </table>
        </div>

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
    </>
  )
}

export default Dashboard; 