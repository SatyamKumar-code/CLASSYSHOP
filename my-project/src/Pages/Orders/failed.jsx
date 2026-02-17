import Button from '@mui/material/Button';
import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const OrderFailed = () => {
  const location = useLocation();
  const reason = location?.state?.reason;

  const reasonMessage = (() => {
    switch (reason) {
      case "PAYPAL_CANCELED":
        return "Payment was canceled. Please try again.";
      case "PAYPAL_ERROR":
        return "PayPal payment failed. Please try again.";
      case "PAYPAL_CAPTURE_FAILED":
        return "Payment capture failed. Please contact support if you were charged.";
      case "PAYPAL_SDK_LOAD_FAILED":
        return "We could not load PayPal checkout. Please try again.";
      case "RAZORPAY_ORDER_FAILED":
        return "Payment failed during Razorpay checkout. Please try again.";
      case "RAZORPAY_CANCELED":
        return "Razorpay payment was canceled. Please try again.";
      case "RAZORPAY_FAILED":
        return "Razorpay payment failed. Please try again.";
      case "COD_ORDER_FAILED":
        return "Cash on delivery order failed. Please try again.";
      default:
        return "Your order could not be completed. Please try again.";
    }
  })();

  return (
    <section className='w-full p-10 py-20 flex items-center justify-center flex-col gap-2'>
        <img src="/failed.png" width="120"/>
        <h3 className='mb-0 text-[25px]'>Your order could not be completed</h3>
        <p className='mt-0'>{reasonMessage}</p>
        <Link to="/">
            <Button className='btn-org btn-border'>Back to home</Button>
        </Link>
    </section>
  )
}

export default OrderFailed;