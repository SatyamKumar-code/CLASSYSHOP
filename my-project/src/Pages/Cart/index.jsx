import React, { useContext, useEffect, useState } from 'react' 
import Button from '@mui/material/Button';
import { BsFillBagCheckFill } from 'react-icons/bs';
import CartItems from './cartItems';
import { MyContext } from '../../App';
import { fetchDataFromApi } from '../../utils/api';
import { Link } from 'react-router-dom';

const CartPage = () => {

    const [productSizeData, setProductSizeData] = useState([]);
    const [productWeightData, setProductWeightData] = useState([]);
    const [productRamsData, setProductRamsData] = useState([]);

     
  const context = useContext(MyContext);

  useEffect(() => {

    window.scrollTo(0,0);

    fetchDataFromApi(`/api/product/productSize/get`).then((res) => {
        if(res?.error === false) {
            setProductSizeData(res?.data || []);
        }
    })

    fetchDataFromApi("/api/product/productRAMS/get").then((res) => {
        if(res?.error === false) {
            setProductRamsData(res?.data || []);
        }
    })

    fetchDataFromApi("/api/product/productWEIGHT/get").then((res) => {
        if(res?.error === false) {
            setProductWeightData(res?.data || []);
        }
    })
  }, []);

  return (
    <section className='section py-5 pb-10'>
        <div className='container w-[80%] max-w-[80%] flex gap-5'>
            <div className='leftPart w-[70%]'>
                
                <div className='shadow-md rounded-md bg-white'>
                      <div className='py-2 px-3 border-b border-[rgba(0,0,0,0.1)]'>
                          <h2>Your Cart</h2>
                          <p className='mt-0'>There are <span className='font-bold text-primary'>{context?.cartData?.length || 0} </span>
                              product in you cart</p>
                      </div>

                      {
                        context?.cartData?.length !== 0 ? context?.cartData?.map((item, index) => {
                            return (
                                <CartItems selected={()=>selectedSize(item)} qty={item?.quantity} item={item} key={index} productSizeData={productSizeData} productRamsData={productRamsData} productWeightData={productWeightData} />
                            )
                        })

                        :

                        <>
                         <div className="flex items-center justify-center flex-col py-10 gap-5">
                            <img src="/empty-cart.png" alt="empty-cart" className='w-[200px]' />
                            <h2 className='text-[20px] font-bold'>Your cart is currently empty</h2>
                            <Link to={"/products"}>
                                <Button className='btn-org btn-sm'>Continue Shoping</Button>
                            </Link>
                         </div>
                        </>
                      }
                    
                </div>
            </div>

            <div className='rightPart w-[30%]'>
                <div className='shadow-md rounded-md bg-white p-5 sticky top-[75px]! z-90'>
                    <h3>Cart Totals</h3>
                    <hr />

                    <p className='flex items-center justify-between'>
                        <span className='text-[14px] font-[500]'>Subtotal</span>
                        <span className='text-primary font-bold'>
                            {
                                (context?.cartData?.length !== 0 ?
                                    context?.cartData?.map(item => parseInt(item?.price) * item.quantity).reduce
                                        ((total, value) => total + value, 0) : 0)?.toLocaleString('en-US',
                                            { style: 'currency', currency: 'INR' })
                            }
                        </span>
                    </p>

                    <p className='flex items-center justify-between'>
                        <span className='text-[14px] font-[500]'>Shipping</span>
                        <span className='font-bold'>Free</span>
                    </p>

                    <p className='flex items-center justify-between'>
                        <span className='text-[14px] font-[500]'>Estimate</span>
                        <span className='font-bold'>India</span>
                    </p>

                    <p className='flex items-center justify-between'>
                        <span className='text-[14px] font-[500]'>Total</span>
                        <span className='text-primary font-bold'>
                            {
                                (context?.cartData?.length !== 0 ?
                                    context?.cartData?.map(item => parseInt(item?.price) * item.quantity).reduce
                                        ((total, value) => total + value, 0) : 0)?.toLocaleString('en-US',
                                            { style: 'currency', currency: 'INR' })
                            }
                        </span>
                    </p>

                    <br />

                    <Link to={"/checkout"}>
                        <Button className='btn-org btn-lg w-full flex gap-2'>
                            <BsFillBagCheckFill className='text-[20px]' />
                            Checkout
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    </section>
  )
}

export default CartPage;