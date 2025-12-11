import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React from 'react'
import { BsFillBagCheckFill } from 'react-icons/bs';

const Checkout = () => {
  return (
    <section className='py-10'>
        <div className='container flex gap-5'>
            <div className='leftCol w-[70%]'>
                <div className='card bg-white p-5 rounded-md w-full'>
                    <h1>Billing Datails</h1>

                    <form className='w-full mt-5'>
                        <div className='flex items-center gap-5 pt-2 pb-5'>
                            <div className='col w-[50%]'>
                                <TextField  
                                label="Full Name"
                                variant='outlined'
                                size="small"
                                className="w-full" />
                            </div>

                            <div className='col w-[50%]'>
                                <TextField  
                                type='email'
                                label="Email"
                                variant='outlined'
                                size="small"
                                className="w-full" />
                            </div>
                        </div>

                        <h6 className='text-[14px] font-[500]'>Street Address</h6>

                        <div className='flex items-center gap-5 pb-5'>
                            <div className='col w-[100%]'>
                                <TextField  
                                label="House number and street name"
                                variant='outlined'
                                size="small"
                                className="w-full" />
                            </div>
                        </div>

                        <div className='flex items-center gap-5 pb-5'>
                            <div className='col w-[100%]'>
                                <TextField  
                                label="Apartment, suite, unit etc. (optional)"
                                variant='outlined'
                                size="small"
                                className="w-full" />
                            </div>
                        </div>

                        

                        <div className='flex items-center gap-5 pt-2 pb-5'>
                            <div className='col w-[50%]'>
                                <TextField  
                                label="Town / City"
                                variant='outlined'
                                size="small"
                                className="w-full" />
                            </div>

                            <div className='col w-[50%]'>
                                <TextField  
                                type='text'
                                label="State / County"
                                variant='outlined'
                                size="small"
                                className="w-full" />
                            </div>
                        </div>

                        <h6 className='text-[14px] font-[500]'>Postcode / ZIP</h6>

                        <div className='flex items-center gap-5 pt-2 pb-5'>
                            <div className='col w-[100%]'>
                                <TextField  
                                label="Zip Code"
                                variant='outlined'
                                size="small"
                                className="w-full" />
                            </div>
                        </div>

                        <div className='flex items-center gap-5 pt-2 pb-5'>
                            <div className='col w-[50%]'>
                                <TextField  
                                label="Phone Number"
                                variant='outlined'
                                size="small"
                                className="w-full" />
                            </div>

                            <div className='col w-[50%]'>
                                <TextField  
                                type='text'
                                label="Email Address"
                                variant='outlined'
                                size="small"
                                className="w-full" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div className='rightCol w-[30%]'>
                <div className='card shadow-md bg-white p-5 rounded-md'>
                    <h2 className='mb-4'>Your Order</h2>

                    <div className='flex items-center justify-between py-3 border-t border-b border-[rgba(0,0,0,0.1)]'>
                        <span className='text-[14px] font-[600]'>Product</span>
                        <span className='text-[14px] font-[600]'>Subtotal</span>
                    </div>

                    <div className='scroll mb-5 Reviewscroll max-h-[250px] pr-2 overflow-y-scroll overflow-x-hidden'>
                    <div className='flex items-center justify-between py-2'>
                        <div className='part1 flex items-center gap-3'>
                            <div className='img w-[50px] h-[50px] object-cover overflow-hidden rounded-md group cursor-pointer'>
                                <img src="https://www.jiomart.com/images/product/original/rvvtluazsa/live-fashion-black-women-printed-pu-sling-bag-product-images-rvvtluazsa-0-202409201509.jpg"
                                className='w-full transition-all group-hover:scale-105' />
                            </div>

                            <div className='info'>
                                <h4 className='text-[14px]'>A-Line Kurti With sh..</h4>
                                <span className='text-[14px]'>Qty : 1</span>
                            </div>
                        </div>


                        <span className='text-[14px] font-[500]'>$1,300.00</span>
                    </div>

                    <div className='flex items-center justify-between py-2'>
                        <div className='part1 flex items-center gap-3'>
                            <div className='img w-[50px] h-[50px] object-cover overflow-hidden rounded-md group cursor-pointer'>
                                <img src="https://www.jiomart.com/images/product/original/rvvtluazsa/live-fashion-black-women-printed-pu-sling-bag-product-images-rvvtluazsa-0-202409201509.jpg"
                                className='w-full transition-all group-hover:scale-105' />
                            </div>

                            <div className='info'>
                                <h4 className='text-[14px]'>A-Line Kurti With sh..</h4>
                                <span className='text-[14px]'>Qty : 1</span>
                            </div>
                        </div>


                        <span className='text-[14px] font-[500]'>$1,300.00</span>
                    </div>

                    <div className='flex items-center justify-between py-2'>
                        <div className='part1 flex items-center gap-3'>
                            <div className='img w-[50px] h-[50px] object-cover overflow-hidden rounded-md group cursor-pointer'>
                                <img src="https://www.jiomart.com/images/product/original/rvvtluazsa/live-fashion-black-women-printed-pu-sling-bag-product-images-rvvtluazsa-0-202409201509.jpg"
                                className='w-full transition-all group-hover:scale-105' />
                            </div>

                            <div className='info'>
                                <h4 className='text-[14px]'>A-Line Kurti With sh..</h4>
                                <span className='text-[14px]'>Qty : 1</span>
                            </div>
                        </div>


                        <span className='text-[14px] font-[500]'>$1,300.00</span>
                    </div>

                    <div className='flex items-center justify-between py-2'>
                        <div className='part1 flex items-center gap-3'>
                            <div className='img w-[50px] h-[50px] object-cover overflow-hidden rounded-md group cursor-pointer'>
                                <img src="https://www.jiomart.com/images/product/original/rvvtluazsa/live-fashion-black-women-printed-pu-sling-bag-product-images-rvvtluazsa-0-202409201509.jpg"
                                className='w-full transition-all group-hover:scale-105' />
                            </div>

                            <div className='info'>
                                <h4 className='text-[14px]'>A-Line Kurti With sh..</h4>
                                <span className='text-[14px]'>Qty : 1</span>
                            </div>
                        </div>


                        <span className='text-[14px] font-[500]'>$1,300.00</span>
                    </div>

                    <div className='flex items-center justify-between py-2'>
                        <div className='part1 flex items-center gap-3'>
                            <div className='img w-[50px] h-[50px] object-cover overflow-hidden rounded-md group cursor-pointer'>
                                <img src="https://www.jiomart.com/images/product/original/rvvtluazsa/live-fashion-black-women-printed-pu-sling-bag-product-images-rvvtluazsa-0-202409201509.jpg"
                                className='w-full transition-all group-hover:scale-105' />
                            </div>

                            <div className='info'>
                                <h4 className='text-[14px]'>A-Line Kurti With sh..</h4>
                                <span className='text-[14px]'>Qty : 1</span>
                            </div>
                        </div>


                        <span className='text-[14px] font-[500]'>$1,300.00</span>
                    </div>
                    </div>

                    <Button className="btn-org btn-lg w-full flex items-center gap-3"><BsFillBagCheckFill className='text-[20px] ' /> Checkout</Button>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Checkout;