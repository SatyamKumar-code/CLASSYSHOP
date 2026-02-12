import React, { useContext } from 'react'
import{ LiaShippingFastSolid } from 'react-icons/lia'
import { PiKeyReturnLight } from 'react-icons/pi'
import { BsWallet2 } from 'react-icons/bs'
import { LiaGiftSolid } from 'react-icons/lia'
import { BiSupport } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { IoChatboxOutline } from 'react-icons/io5'
import Button from '@mui/material/Button'
import { FaFacebook } from 'react-icons/fa'
import { AiOutlineYoutube } from 'react-icons/ai'
import { FaPinterest } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa'
import { IoCloseSharp } from 'react-icons/io5'


import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';    

import Drawer from '@mui/material/Drawer'
import CartPanel from '../CartPanel'
import { MyContext } from '../../App'


const Footer = () => {


    const context = useContext(MyContext);
  return (
    <>
    <footer className='py-6 bg-[#fafafa]'>
        <div className='container'>
            <div className='flex items-center justify-center gap-2 py-8 pb-8'>
                <div className='col flex items-center justify-center flex-col group w-[15%]'>
                    <LiaShippingFastSolid
                    className='text-[40px] transition-all duration-300 group-hover:text-[#ff5252] group-hover:-translate-y-1'/>
                    <h3 className='text-[16px] font-[600] mt-3'>Free Shipping</h3>
                    <p className='text-[12px] font-[500]'>For all Orders Over $100</p>
                </div>

                <div className='col flex items-center justify-center flex-col group w-[15%]'>
                    <PiKeyReturnLight
                    className='text-[40px] transition-all duration-300 group-hover:text-[#ff5252] group-hover:-translate-y-1'/>
                    <h3 className='text-[16px] font-[600] mt-3'>30 Days Return</h3>
                    <p className='text-[12px] font-[500]'>For an Exchange Product</p>
                </div>

                <div className='col flex items-center justify-center flex-col group w-[15%]'>
                    <BsWallet2
                    className='text-[35px] transition-all duration-300 group-hover:text-[#ff5252] group-hover:-translate-y-1'/>
                    <h3 className='text-[16px] font-[600] mt-3'>Secured Payment</h3>
                    <p className='text-[12px] font-[500]'>Payment Cards Accepted</p>
                </div>

                <div className='col flex items-center justify-center flex-col group w-[15%]'>
                    <LiaGiftSolid
                    className='text-[40px] transition-all duration-300 group-hover:text-[#ff5252] group-hover:-translate-y-1'/>
                    <h3 className='text-[16px] font-[600] mt-3'>Special Gifts</h3>
                    <p className='text-[12px] font-[500]'>Our First Product Order</p>
                </div>

                <div className='col flex items-center justify-center flex-col group w-[15%]'>
                    <BiSupport
                    className='text-[35px] transition-all duration-300 group-hover:text-[#ff5252] group-hover:-translate-y-1'/>
                    <h3 className='text-[16px] font-[600] mt-3'>Support 24/7</h3>
                    <p className='text-[12px] font-[500]'>Contact us Anytime</p>
                </div>

            </div>
            <br />

        <hr />

        <div className='footer flex py-8'>
            <div className='part1 w-[25%] border-r border-[rgba(0,0,0,0.1)]'>
                <h2 className='text-[18px] font-[600] mb-4'>Contact us</h2>
                <p className='text-[13px] font-[400] pb-4'>CladdyShop -Mega Super Super Store <br/>507-Union Trade Center France</p>
                <Link to="mailto:satyamkumar59@gmail.com" className='link text-[13px]'>satyamkumar59@gmail.com</Link>

                <span className='text-[22px] font-[600] block w-full mt-3 mb-5 text-[#ff5252]'>
                    (+91) 9876-543-210
                </span>

                    <div className='flex items-center gap-2'>
                        <IoChatboxOutline className="text-[40px] text-[#ff5252]"/>
                        <span className='text-[16px] font-[600]'>Online Chat<br/> Get Expert Help</span>
                    </div>
            </div>

            <div className='part2 w-[40%] flex pl-5'>
                <div className='part2_col1 w-[50%]'>
                    <h2 className='text-[18px] font-[600] mb-4'>Products</h2>

                    <ul className='list'>
                        <li className='list-none text-[14px] w-full mb-2'>
                            <Link to="/" className='link'>Price drop</Link>
                        </li>
                        <li className='list-none text-[14px] w-full mb-2'>
                            <Link to="/" className='link'>New Products</Link>
                        </li>
                        <li className='list-none text-[14px] w-full mb-2'>
                            <Link to="/" className='link'>Best sales</Link>
                        </li>
                        <li className='list-none text-[14px] w-full mb-2'>
                            <Link to="/" className='link'>Contact us</Link>
                        </li>
                        <li className='list-none text-[14px] w-full mb-2'>
                            <Link to="/" className='link'>Sitemap</Link>
                        </li>
                        <li className='list-none text-[14px] w-full mb-2'>
                            <Link to="/" className='link'>Stores</Link>
                        </li>
                    </ul>
                </div>

                <div className='part2_col2 w-[50%]'>
                    <h2 className='text-[18px] font-[600] mb-4'>Products</h2>

                    <ul className='list'>
                        <li className='list-none text-[14px] w-full mb-2'>
                            <Link to="/" className='link'>Delivery</Link>
                        </li>
                        <li className='list-none text-[14px] w-full mb-2'>
                            <Link to="/" className='link'>Legal Notice</Link>
                        </li>
                        <li className='list-none text-[14px] w-full mb-2'>
                            <Link to="/" className='link'>Terms and condition of use</Link>
                        </li>
                        <li className='list-none text-[14px] w-full mb-2'>
                            <Link to="/" className='link'>About us</Link>
                        </li>
                        <li className='list-none text-[14px] w-full mb-2'>
                            <Link to="/" className='link'>Secure payment</Link>
                        </li>
                        <li className='list-none text-[14px] w-full mb-2'>
                            <Link to="/" className='link'>Login</Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className='part2 w-[35%] flex pl-8 flex-col pr-8'>
                    <h2 className='text-[18px] font-[600] mb-4'>Subscribe to newsletter</h2>
                    <p className='text-[13px]'>Subcribe to our latest newsletter to get news special discounts.</p>

                        <form action="/" className='mt-5'>
                            <input type="text" className='w-full h-[45px] border outline-none pl-4 pr-4 rounded-sm mb-4 focus:border-[rgba(0,0,0,0.30)]' placeholder='Your Email Address' />
                            <Button className="btn-org">Subscribe</Button>

                            <FormControlLabel control={<Checkbox />} label="I agree to the terms and conditions and the privacy policy." className='mt-3 text-[13px]' />
                        </form>
                </div>
        </div>

        </div>
    </footer>

    <div className='bottomStrip border-t border-[rgba(0,0,0,0.1)] py-3 bg-white'>
        <div className='container flex items-center justify-between'>
            <ul className='flex items-center gap-2'>
                <li className='list-none'>
                    <Link to="/" target='_blank' className='w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center group hover:bg-[#ff5252] transition-all'>
                    <FaFacebook className='text-[15px] group-hover:text-white' />
                    </Link>
                </li>
                <li className='list-none'>
                    <Link to="/" target='_blank' className='w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center group hover:bg-[#ff5252] transition-all'>
                    <AiOutlineYoutube className='text-[20px] group-hover:text-white' />
                    </Link>
                </li>
                <li className='list-none'>
                    <Link to="/" target='_blank' className='w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center group hover:bg-[#ff5252] transition-all'>
                    <FaPinterest className='text-[15px] group-hover:text-white' />
                    </Link>
                </li>
                <li className='list-none'>
                    <Link to="/" target='_blank' className='w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center group hover:bg-[#ff5252] transition-all'>
                    <FaInstagram className='text-[15px] group-hover:text-white' />
                    </Link>
                </li>
            </ul>

            <p className='text-[13px] text-center mb-0'>
                &copy; 2025 - Ecommerce Template
            </p>

            <div className='flex items-center'>
                <img src="https://ecommerce-frontend-view.netlify.app/carte_bleue.png" alt="image" />
                <img src="https://ecommerce-frontend-view.netlify.app/visa.png" alt="image" />
                <img src="https://ecommerce-frontend-view.netlify.app/master_card.png" alt="image" />
                <img src="https://ecommerce-frontend-view.netlify.app/american_express.png" alt="image" />
                <img src="https://ecommerce-frontend-view.netlify.app/paypal.png" alt="image" />
            </div>
        </div>
    </div>



     <Drawer open={context.openCartPanel} onClose={context.toggleCartPanel(false)} anchor='right'
      className='cartPanel'>
        <div className='flex items-center justify-between py-3 px-4 gap-3 border-b border-[rgba(0,0,0,0.1)]'>
          <h4>Shopping Cart ({context?.cartData?.length})</h4>
          <IoCloseSharp className='text-[20px] cursor-pointer' onClick={context.toggleCartPanel(false)} />
        </div>

        {
            context?.cartData?.length !==0 ? <CartPanel data={context?.cartData} /> : 
            <>
                <div className='flex items-center justify-center flex-col pt-[100px] gap-5'>
                    
                    <img src="/empty-cart.png" alt="Empty Cart" className='w-[150px]' />
                    <h4>Your cart is currently empty</h4>
                    <Button className='btn-org btn-sm' onClick={context?.toggleCartPanel(false)} >Continue Shopping</Button>
                </div>
            </>
        }
        
      </Drawer>
    </>
  )
}
export default Footer;