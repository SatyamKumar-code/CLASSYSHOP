import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useContext, useEffect, useState } from 'react'
import { BsFillBagCheckFill } from 'react-icons/bs';
import { MyContext} from '../../App';
import { FaPlus } from 'react-icons/fa6';
import Radio from '@mui/material/Radio';

const Checkout = () => {

    const [userData, setUserData] = useState(null);
    const [isChecked, setIsChecked] = useState(0);

    const context = useContext(MyContext);

    useEffect(() =>{
        setUserData(context?.userData);
    },[context?.userData, userData])

    const editAddress = (id) => {
        context?.setAddressMode("edit");
        context?.setOpenAddressPanel(true);
        context?.setAddressId(id);
    }

    const handleChange = (e, index) => {
        if(e.target.checked){
            setIsChecked(index);
        }
    }


    
  return (
    <section className='py-10'>
        <div className='w-[70%] m-auto flex gap-5'>
            <div className='leftCol w-[60%]'>
                <div className='card bg-white p-5 rounded-md w-full'>
                    <div className="flex justify-between items-center border-b border-[rgba(0,0,0,0.1)] pb-3 mb-5">
                        <h2>Select Delivery Address</h2>
                        <Button variant='outlined'
                            onClick={() => {
                                context?.setOpenAddressPanel(true);
                                context?.setAddressMod("add");
                            }}
                        > 
                            <FaPlus /> ADD NEW ADDRESS
                        </Button>
                    </div>

                    <div className="flex flex-col gap-4">
                        {
                            userData?.address_details?.length !== 0 ? userData?.address_details?.map((address, index) => {
                                return (
                                    <label key={index} className={`flex gap-3 p-4 border border-[rgba(0,0,0,0.1)] rounded-md relative cursor-pointer ${isChecked === index && "bg-[#fff2f2]"}`}>
                                        <div>
                                            <Radio size='small' onChange={(e) => handleChange(e, index)}
                                                checked={isChecked === index}
                                            />
                                        </div>
                                        <div className='info'>
                                            <span className='inline-block text-[13px] font-medium p-1 bg-[#f1f1f1] rounded-md'>{address?.addressType}</span>
                                            <h3>{userData?.name}</h3>
                                            <p className='text-[12px] mt-0! mb-0!'>{address?.address_line1 + ", " + address?.city + ", " + address?.state + ", " + address?.pincode}</p>
                                            <p className='text-[12px] font-medium mb-0!'>+{address?.mobile}</p>
                                        </div>


                                        <Button variant='text' className='absolute! top-[15px] right-[15px] btn-sm'
                                            onClick={() => editAddress(address?._id)}
                                        >Edit</Button>

                                    </label>
                                )
                            })

                            :

                            <>
                                <div className="flex items-center justify-between mt-5 flex-col p-5 ">
                                    <img src="No-location.png" width={80} />
                                    <h2 className="text-center">No Address Found in your account</h2>
                                    <p className='mt-0!'>Add a delivery address.</p>
                                        <Button
                                            className='btn-org'
                                            onClick={() => {
                                                context?.setOpenAddressPanel(true);
                                                context?.setAddressMode("add");
                                            }}
                                        >Add Address
                                        </Button>

                                </div>
                            </>
                        }
                        
                    </div>
                </div>
            </div>

            <div className='rightCol w-[40%]'>
                <div className='card shadow-md bg-white p-5 rounded-md'>
                    <h2 className='mb-4'>Your Order</h2>

                    <div className='flex items-center justify-between py-3 border-t border-b border-[rgba(0,0,0,0.1)]'>
                        <span className='text-[14px] font-[600]'>Product</span>
                        <span className='text-[14px] font-[600]'>Subtotal</span>
                    </div>

                    <div className='scroll mb-5 Reviewscroll max-h-[250px] pr-2 overflow-y-scroll overflow-x-hidden'>
                        {
                            context?.cartData?.length !== 0 && context?.cartData?.map((item, index) => {
                                return (
                                    <div className='flex items-center justify-between py-2' key={index}>
                                        <div className='part1 flex items-center gap-3'>
                                            <div className='img w-[50px] flex items-center h-[50px] object-cover overflow-hidden rounded-md group cursor-pointer'>
                                                <img src={item?.image}
                                                    className='w-full transition-all group-hover:scale-105' />
                                            </div>

                                            <div className='info'>
                                                <h4 className='text-[14px]' title={item?.productTitle}>{item?.productTitle?.length > 35 ? `${item?.productTitle.slice(0, 35)}...` : item?.productTitle}</h4>
                                                <span className='text-[14px]'>Qty : {item?.quantity}</span>
                                            </div>
                                        </div>


                                        <span className='text-[14px] font-[500]'>{(item?.quantity * item?.price)?.toLocaleString('en-US', {style: 'currency', currency: "INR"})}</span>
                                    </div>
                                )
                            })
                        }

                    </div>

                    <Button className="btn-org btn-lg w-full flex items-center gap-3"><BsFillBagCheckFill className='text-[20px] ' /> Checkout</Button>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Checkout;