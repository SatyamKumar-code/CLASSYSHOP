import Button from '@mui/material/Button';
import React from 'react'
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  return (
    <section className='w-full p-10 py-20 flex items-center justify-center flex-col gap-2'>
        <img src="/approved.png" width="120"/>
        <h3 className='mb-0 text-[25px]'>Your order has been placed successfully!</h3>
        <p className='mt-0'>Thank you for your payment.</p>
        <Link to="/">
            <Button className='btn-org btn-border'>Back to home</Button>
        </Link>
    </section>
  )
}

export default OrderSuccess;