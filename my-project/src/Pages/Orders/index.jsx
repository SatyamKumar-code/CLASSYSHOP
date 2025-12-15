import React, { useState } from 'react'
import AccountSidebar from '../../components/AccountSidebar';
import Button from '@mui/material/Button';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import Badge from '../../components/Badge';

const Orders = () => {

    const [isOpenOrderdProduct, setIsOpenOrderdProduct] = useState(null);

    const isShowOrderdProduct = (index) => {
        if (isOpenOrderdProduct === index) {
            setIsOpenOrderdProduct(null);
        } else {
            setIsOpenOrderdProduct(index);
        }
    }


    return (
        <section className='py-10 w-full'>
            <div className='container flex gap-5'>
                <div className='col1 w-[20%]'>
                    <AccountSidebar />
                </div>


                <div className='col2 w-[80%]'>
                    <div className='shadow-md rounded-md bg-white'>
                        <div className='py-2 px-3 border-b border-[rgba(0,0,0,0.1)]'>
                            <h2>My Orders</h2>
                            <p className='mt-0'>There are <span className='font-bold text-primary'>2</span>
                                Orders</p>

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
                                        <tr className="bg-white border-b">
                                            <td className="px-6 py-4 font-[500]">
                                                <Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]'
                                                onClick={()=>isShowOrderdProduct(0)}>
                                                    {
                                                        isOpenOrderdProduct === 0 ? <FaAngleUp className='text-[16px] text-[rgba(0,0,0,0.7)]' />: <FaAngleDown className='text-[16px] text-[rgba(0,0,0,0.7)]' />
                                                    }
                                                </Button>
                                            </td>
                                            <td className="px-6 py-4 font-[500]">
                                                <span className='text-primary'>347593769375970703</span>
                                            </td>
                                            <td className="px-6 py-4 font-[500]">
                                                <span className='text-primary'>Pay_PTPQqEXFhrteyyt</span>
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
                                                <span className='text-primary'>8979fg7927s25r</span>
                                            </td>
                                            <td className="px-6 py-4 font-[500]"><Badge status="pending" /></td>
                                            <td className="px-6 py-4 font-[500] whitespace-nowrap">2025-12-13</td>

                                        </tr>

                                        {
                                            isOpenOrderdProduct === 0 &&(
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
                                                                    className='w-[40px] h-[40px] object-cover rounded-md'/>
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
                                                                    className='w-[40px] h-[40px] object-cover rounded-md'/>
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
                                                onClick={()=>isShowOrderdProduct(1)}>
                                                    {
                                                        isOpenOrderdProduct === 1 ? <FaAngleUp className='text-[16px] text-[rgba(0,0,0,0.7)]' />: <FaAngleDown className='text-[16px] text-[rgba(0,0,0,0.7)]' />
                                                    }
                                                </Button>
                                            </td>
                                            <td className="px-6 py-4 font-[500]">
                                                <span className='text-primary'>347593769375970703</span>
                                            </td>
                                            <td className="px-6 py-4 font-[500]">
                                                <span className='text-primary'>Pay_PTPQqEXFhrteyyt</span>
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
                                                <span className='text-primary'>8979fg7927s25r</span>
                                            </td>
                                            <td className="px-6 py-4 font-[500]"><Badge status="pending" /></td>
                                            <td className="px-6 py-4 font-[500] whitespace-nowrap">2025-12-13</td>

                                        </tr>

                                        {
                                            isOpenOrderdProduct === 1 &&(
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
                                                                    className='w-[40px] h-[40px] object-cover rounded-md'/>
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
                                                                    className='w-[40px] h-[40px] object-cover rounded-md'/>
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

                    </div>
                </div>
            </div>
        </section>
    )
}

export default Orders;