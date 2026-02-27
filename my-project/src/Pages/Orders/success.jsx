import Button from '@mui/material/Button';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { MyContext } from '../../App';

const OrderSuccess = () => {

  const context = useContext(MyContext);
  return (
    <section className='w-full p-10 py-8 lg:py-20 flex items-center justify-center flex-col gap-2'>
        <img src="/approved.png" className='w-[70px] sm:w-[120px]'/>
        <h3 className='mb-0 text-[20px] sm:text-[25px]'>Your order has been placed!</h3>
        <p className='mt-0 mb-0'>Thank you for your payment.</p>
        <p className='mt-0 text-center'>Order Invoice sent to your email <b>{context?.userData?.email}</b></p>
        <Link to="/">
            <Button className='btn-org btn-border'>Back to home</Button>
        </Link>
    </section>
  )
}

export default OrderSuccess;