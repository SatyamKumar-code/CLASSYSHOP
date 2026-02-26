import Button from '@mui/material/Button';
import React, { useContext } from 'react'
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { MyContext } from '../../App';
import { deleteData } from '../../utils/api';

const CartPanel = (props) => {

  const context = useContext(MyContext);

  const revomeItem = (id) => {
    deleteData(`/api/cart/delete-cart-item/${id}`).then((res) => {
      if (res?.success === true) {
        context?.alertBox("Success", res?.message);
        context?.getCartItems();
        setIsAdded(false);
      }
    })
  }

  return (
    <>
      <div className='scroll w-full max-h-[480px] overflow-y-scroll overflow-x-hidden px-4'>
        {
          props?.data?.map((item, index) => {
            return (
              <div className='cartItem w-full flex items-center gap-4 border-b border-[rgba(0,0,0,0.1)] pb-4 pt-3' key={index}>
                <div className='img w-[25%] flex items-center overflow-hidden h-[80px] rounded-md'>
                  <Link to={`/product/${item?._id}`} className='block group'>
                    <img src={item?.image} alt="cartItem"
                      className='w-full group-hover:scale-105' />
                  </Link>
                </div>

                <div className='info w-[75%] pr-15 relative pt-3'>
                  <h4 className='text-[12px] sm:text-[14px] font-[500]'>
                    <Link to={`/product/${item?._id}`} className='link transition-all'>{item?.productTitle?.length > 40 ? `${item?.productTitle.slice(0, 40)}...` : item?.productTitle}</Link>
                  </h4>
                  <p className='flex items-center gap-3 mt-2 mb-2'>
                    <span className='text-[13px] sm:text-[14px]'>Qty : <span>{item?.quantity}</span></span>
                    <span className='text-primary font-bold'>{item?.price?.toLocaleString('en-US', {style: 'currency', currency: "INR"})}</span>
                  </p>

                  <MdOutlineDeleteOutline
                    className='absolute top-[10px] right-[10px] cursor-pointer link transition-all'
                    onClick={() => revomeItem(item?._id)}
                  />
                </div>
              </div>
            )
          })
        }
      </div>

      <br />

      <div className='bottomSec absolute bottom-[10px] left-[10px] w-full pr-5'>

        <div className='bottomInfo py-3 px-4 w-full border-t border-[rgba(0,0,0,0.1)] flex items-center justify-between flex-col'>
          <div className='flex items-center justify-between w-full'>
            <span className='text-[14px] font-[600]'>{context?.cartData?.length || 0} item</span>
            <span className='text-primary font-bold'>
              {
                (context?.cartData?.length !== 0 ?
                context?.cartData?.map(item => parseInt(item?.price) * item.quantity).reduce
                ((total, value) => total + value, 0 ) : 0)?.toLocaleString('en-US',
                { style: 'currency', currency: 'INR'})
              }
            </span>
          </div>

          {/* <div className='flex items-center justify-between w-full'>
            <span className='text-[14px] font-[600]'>shipping</span>
            <span className='text-primary font-bold'>$8</span>
          </div> */}
        </div>

        <div className='bottomInfo py-3 px-4 w-full border-t border-[rgba(0,0,0,0.1)] flex items-center justify-between flex-col'>
          <div className='flex items-center justify-between w-full'>
            <span className='text-[14px] font-[600]'>
              Total (tax excl.)
            </span>
            <span className='text-primary font-bold'>
              {
                (context?.cartData?.length !== 0 ?
                context?.cartData?.map(item => parseInt(item?.price) * item.quantity).reduce
                ((total, value) => total + value, 0 ) : 0)?.toLocaleString('en-US',
                { style: 'currency', currency: 'INR'})
              }
            </span>
          </div>

          <br />

          <div className='flex items-center justify-between w-full gap-5'>
            <Link to="/cart" className='w-[50%] d-block' onClick={context?.toggleCartPanel(false)}><Button className='btn-org btn-lg w-full'>View Cart</Button></Link>
            <Link to="/checkout" className='w-[50%] d-block' onClick={context?.toggleCartPanel(false)}><Button className='btn-org btn-border btn-lg w-full'>Checkout</Button></Link>
          </div>

        </div>
      </div>
    </>
  )
}

export default CartPanel;