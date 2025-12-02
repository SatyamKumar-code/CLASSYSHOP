import React from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import { ProductZoom } from '../../components/ProductZoom';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { QtyBox } from '../../components/Qt;yBox';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { FaRegHeart } from "react-icons/fa6";
import { IoGitCompareOutline } from "react-icons/io5";
import TextField from '@mui/material/TextField';

export const ProductDetails = () => {

  const [productActionIndex, setProductActionIndex] = React.useState(null);
  const [activeTab, setActiveTab] = React.useState(0);
  return (
    <>
      <div className='py-5'>

        <div className='container'>
          <Breadcrumbs aria-label="breadcrumb">
            <Link to="/"
              underline="hover"
              color="inherit"
              className='link transition !text-[14px]'>
              Home
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="/"
              className='link transition !text-[14px]'
            >
              Fashion
            </Link>
            <Link
              underline="hover"
              color="inherit"
              className='link transition !text-[14px]'
            >
              Cropped Satin Bomber Jacket
            </Link>
          </Breadcrumbs>
        </div>
      </div>

      <section className='bg-white py-5'>
        <div className='container flex gap-8 items-center'>
          <div className='productZoomContainer w-[40%]'>
            <ProductZoom />
          </div>

          <div className='productContent w-[60%] pr-10 pl-10'>
            <h1 className='text-[24px] font-[600] mb-2'>LIVE FASHION Black Women Printed PU Sling Bag</h1>
            <div className='flex items-center gap-3'>
              <span className='text-gray-400 text-[13px]'>
                Brand : <span className='font-[500] text-black opacity-75'>LIVE FASHION</span>
              </span>

              <Rating name='size-small' defaultValue={4} size='small' readOnly />
              <span className='text-[13px] cursor-pointer'>Review (5)</span>
            </div>

            <div className='flex items-center gap-4 mt-4'>
              <span className='oldPrice line-through text-gray-500 text-[20px] font-[500]'>$58.00</span>
              <span className='price text-[#ff5252] text-[20px] font-[600]'>$58.00</span>
              <span className='text-[14px]'>Available In Stock: <span className='text-green-600 text-[14px] font-bold'>147 Items</span></span>
            </div>

            <p className='mt-3 pr-10 mb-5'>This Sling Bag Is Made From The House Of LIVE FASHION. It's made from PU leather material.Very poor quality which will be available at road side. Already the stitches have gotten loose. The handle of the bag is secured with a stapler pin which is disappointing. the inside of the bag might poke which is dangerous</p>

            <div className='flex items-center gap-3'>
              <span className='text-[16px]'>Size: </span>
              <div className='flex items-center gap-1 actions'>
                <Button className={`${productActionIndex === 0 ? 'bg-primary text-white' : ''}`} onClick={() => setProductActionIndex(0)}>S</Button>
                <Button className={`${productActionIndex === 1 ? 'bg-primary text-white' : ''}`} onClick={() => setProductActionIndex(1)}>M</Button>
                <Button className={`${productActionIndex === 2 ? 'bg-primary text-white' : ''}`} onClick={() => setProductActionIndex(2)}>L</Button>
                <Button className={`${productActionIndex === 3 ? 'bg-primary text-white' : ''}`} onClick={() => setProductActionIndex(3)}>XL</Button>

              </div>
            </div>

            <p className='text-[14px] mt-4 mb-2'>Free Shipping (Est. Delivery Time 2-3 Days)</p>
            <div className='flex items-center gap-4'>
              <div className='qtyBoxWrapper w-[70px]'>
                <QtyBox />
              </div>

              <Button variant='contained' className='btn-org flex gap-2'>
                <MdOutlineShoppingCart className='text-[22px]' /> Add to Cart</Button>

            </div>

            <div className='flex items-center gap-4 mt-6'>
              <span className='flex items-center gap-2 text-[15px] link cursor-pointer font-[500]'>
                <FaRegHeart className='text-[18px]' /> Add to Wishlist
              </span>
              <span className='flex items-center gap-2 text-[15px] link cursor-pointer font-[500]'>
                <IoGitCompareOutline className='text-[18px]' /> Add to Compare
              </span>
            </div>
          </div>
        </div>

        <div className='container pt-10'>
          <div className='flex items-center gap-8 mb-5'>
            <span className={`link text-[17px] cursor-pointer font-[500] ${activeTab === 0 ? 'text-primary border-b-2 border-primary pb-0.5' : 'pb-0.5'}`}
              onClick={() => setActiveTab(0)}>
              Description
            </span>
            <span className={`link text-[17px] cursor-pointer font-[500] ${activeTab === 1 ? 'text-primary border-b-2 border-primary pb-0.5' : 'pb-0.5'}`}
              onClick={() => setActiveTab(1)}>
              Product
            </span>
            <span className={`link text-[17px] cursor-pointer font-[500] ${activeTab === 2 ? 'text-primary border-b-2 border-primary pb-0.5' : 'pb-0.5'}`}
              onClick={() => setActiveTab(2)}>
              Reviews (5)
            </span>
          </div>

          {
            activeTab === 0 && (
              <div className='shadow-md w-full px-8 py-5 rounded-md'>
                <p> The best is yet to come! Give your walls a voice with a framed poster. This aesthethic, opimistic poster will look great in your desk or in an open-space office. Painted wooden frame with passe-partout for more depth.</p>
                <h4>Lightweight Design</h4>

                <p> Made from durable materials, this poster is designed to last. The high-quality print ensures that the colors remain vibrant and true to life, making it a perfect addition to any room.</p>

                <h4>Free Shpping & Return</h4>

                <p> Enjoy free shipping on all orders with an estimated delivery time of 2-3 days. We also offer hassle-free returns to ensure your satisfaction.</p>

                <h4>Money Back Guarantee</h4>

                <p> We offer a 30-day money-back guarantee on all our products. If you are not completely satisfied with your purchase, you can return it for a full refund.</p>

                <h4>Online Support</h4>

                <p> Our dedicated customer support team is available online to assist you with any questions or concerns you may have. We are committed to providing excellent service and ensuring your shopping experience is smooth and enjoyable.</p>
              </div>
            )}



          {
            activeTab === 1 && (

              <div className='shadow-md w-full px-8 py-5 rounded-md'>
              <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" class="px-6 py-3">
                        Stand Up
                        </th>
                        <th scope="col" class="px-6 py-3">
                        Folded (w/o wheels)
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Category
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Door Pass Through
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="bg-white border-b">
                      <td className='px-6 py-4 font-[500]'>35"L x 24"W x 37-45"H(front to back wheel)</td>
                      <td class="px-6 py-4 font-[500]">32.5"L x 18.5"W x 16.5"H</td>
                      <td class="px-6 py-4 font-[500]">32.5"L x 24"W x 18.5"H</td>
                      <td class="px-6 py-4 font-[500]">24</td>
                    </tr>

                    <tr class="bg-white border-b">
                      <td className='px-6 py-4 font-[500]'>35"L x 24"W x 37-45"H(front to back wheel)</td>
                      <td class="px-6 py-4 font-[500]">32.5"L x 18.5"W x 16.5"H</td>
                      <td class="px-6 py-4 font-[500]">32.5"L x 24"W x 18.5"H</td>
                      <td class="px-6 py-4 font-[500]">24</td>
                    </tr>

                    <tr class="bg-white border-b">
                      <td className='px-6 py-4 font-[500]'>35"L x 24"W x 37-45"H(front to back wheel)</td>
                      <td class="px-6 py-4 font-[500]">32.5"L x 18.5"W x 16.5"H</td>
                      <td class="px-6 py-4 font-[500]">32.5"L x 24"W x 18.5"H</td>
                      <td class="px-6 py-4 font-[500]">24</td>
                    </tr>
                    <tr class="bg-white border-b">
                      <td className='px-6 py-4 font-[500]'>35"L x 24"W x 37-45"H(front to back wheel)</td>
                      <td class="px-6 py-4 font-[500]">32.5"L x 18.5"W x 16.5"H</td>
                      <td class="px-6 py-4 font-[500]">32.5"L x 24"W x 18.5"H</td>
                      <td class="px-6 py-4 font-[500]">24</td>
                    </tr>

                    <tr class="bg-white border-b">
                      <td className='px-6 py-4 font-[500]'>35"L x 24"W x 37-45"H(front to back wheel)</td>
                      <td class="px-6 py-4 font-[500]">32.5"L x 18.5"W x 16.5"H</td>
                      <td class="px-6 py-4 font-[500]">32.5"L x 24"W x 18.5"H</td>
                      <td class="px-6 py-4 font-[500]">24</td>
                    </tr>

                    <tr class="bg-white border-b">
                      <td className='px-6 py-4 font-[500]'>35"L x 24"W x 37-45"H(front to back wheel)</td>
                      <td class="px-6 py-4 font-[500]">32.5"L x 18.5"W x 16.5"H</td>
                      <td class="px-6 py-4 font-[500]">32.5"L x 24"W x 18.5"H</td>
                      <td class="px-6 py-4 font-[500]">24</td>
                    </tr>

                    <tr class="bg-white border-b">
                      <td className='px-6 py-4 font-[500]'>35"L x 24"W x 37-45"H(front to back wheel)</td>
                      <td class="px-6 py-4 font-[500]">32.5"L x 18.5"W x 16.5"H</td>
                      <td class="px-6 py-4 font-[500]">32.5"L x 24"W x 18.5"H</td>
                      <td class="px-6 py-4 font-[500]">24</td>
                    </tr>



                  </tbody>
                </table>
              </div>
              </div>

            )
          }

          {
            activeTab === 2 && (
              <div className='shadow-md w-[80%] px-8 py-5 rounded-md'>
                <div className='w-full productReviewsContainer'>
                  <h2 className='text-[18px]'>Customer questions & answers</h2>


                  <div className='reviewScroll w-full max-h-[300px] overflow-y-scroll overflow-x-hidden mt-5 pr-5'>

                    <div className='review pb-5 border-b border-[rgba(0,0,0,0.1)] w-full flex items-center justify-between'>
                      <div className='info w-[60%] flex items-center gap-3'>
                        <div className='img w-[80px] h-[80px] overflow-hidden rounded-full'>
                          <img src="https://img.freepik.com/premium-photo/face-smiling-indian-man_130568-535.jpg" className='w-full' alt="" />
                        </div>

                        <div className='w-[80%]'>
                          <h4 className='text-[16px]'>Rinku Verma</h4>
                          <h5 className='text-[13px] mb-0'>2024-12-01</h5>
                          <p className='!mt-0 !mb-0'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum facilis reiciendis dolore, sint eos ipsam officiis sed eius rerum quam consequatur est magnam error laborum.</p>
                        </div>
                      </div>

                      <Rating name='size-small' defaultValue={4} readOnly />


                    </div>

                    <div className='review pt-5 pb-5 border-b border-[rgba(0,0,0,0.1)] w-full flex items-center justify-between'>
                      <div className='info w-[60%] flex items-center gap-3'>
                        <div className='img w-[80px] h-[80px] overflow-hidden rounded-full'>
                          <img src="https://img.freepik.com/premium-photo/face-smiling-indian-man_130568-535.jpg" className='w-full' alt="" />
                        </div>

                        <div className='w-[80%]'>
                          <h4 className='text-[16px]'>Rinku Verma</h4>
                          <h5 className='text-[13px] mb-0'>2024-12-01</h5>
                          <p className='!mt-0 !mb-0'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum facilis reiciendis dolore, sint eos ipsam officiis sed eius rerum quam consequatur est magnam error laborum.</p>
                        </div>
                      </div>

                      <Rating name='size-small' defaultValue={4} readOnly />


                    </div>

                    <div className='review pt-5 pb-5 border-b border-[rgba(0,0,0,0.1)] w-full flex items-center justify-between'>
                      <div className='info w-[60%] flex items-center gap-3'>
                        <div className='img w-[80px] h-[80px] overflow-hidden rounded-full'>
                          <img src="https://img.freepik.com/premium-photo/face-smiling-indian-man_130568-535.jpg" className='w-full' alt="" />
                        </div>

                        <div className='w-[80%]'>
                          <h4 className='text-[16px]'>Rinku Verma</h4>
                          <h5 className='text-[13px] mb-0'>2024-12-01</h5>
                          <p className='!mt-0 !mb-0'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum facilis reiciendis dolore, sint eos ipsam officiis sed eius rerum quam consequatur est magnam error laborum.</p>
                        </div>
                      </div>

                      <Rating name='size-small' defaultValue={4} readOnly />


                    </div>

                    <div className='review pt-5 pb-5 border-b border-[rgba(0,0,0,0.1)] w-full flex items-center justify-between'>
                      <div className='info w-[60%] flex items-center gap-3'>
                        <div className='img w-[80px] h-[80px] overflow-hidden rounded-full'>
                          <img src="https://img.freepik.com/premium-photo/face-smiling-indian-man_130568-535.jpg" className='w-full' alt="" />
                        </div>

                        <div className='w-[80%]'>
                          <h4 className='text-[16px]'>Rinku Verma</h4>
                          <h5 className='text-[13px] mb-0'>2024-12-01</h5>
                          <p className='!mt-0 !mb-0'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum facilis reiciendis dolore, sint eos ipsam officiis sed eius rerum quam consequatur est magnam error laborum.</p>
                        </div>
                      </div>

                      <Rating name='size-small' defaultValue={4} readOnly />


                    </div>

                    <div className='review pt-5 pb-5 border-b border-[rgba(0,0,0,0.1)] w-full flex items-center justify-between'>
                      <div className='info w-[60%] flex items-center gap-3'>
                        <div className='img w-[80px] h-[80px] overflow-hidden rounded-full'>
                          <img src="https://img.freepik.com/premium-photo/face-smiling-indian-man_130568-535.jpg" className='w-full' alt="" />
                        </div>

                        <div className='w-[80%]'>
                          <h4 className='text-[16px]'>Rinku Verma</h4>
                          <h5 className='text-[13px] mb-0'>2024-12-01</h5>
                          <p className='!mt-0 !mb-0'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum facilis reiciendis dolore, sint eos ipsam officiis sed eius rerum quam consequatur est magnam error laborum.</p>
                        </div>
                      </div>

                      <Rating name='size-small' defaultValue={4} readOnly />


                    </div>
                  </div>

                  <br />

                  <div className='reviewForm bg-[#fafafa] p-4 rounded-md'>
                    <h2 className='text-[18px]'>Add a review</h2>

                    <form action="" 
                      className='w-full mt-5'>
                      <TextField
                        id="outlined-multiline-static"
                        label="Write a review"
                        className='w-full'
                        multiline
                        rows={5}
                      />

                      <br /><br />

                      <Rating name='size-small' defaultValue={4} />

                      <div className='flex items-center mt-5'>
                        <Button className='btn-org'>Submit Review</Button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )
          }


        </div>
      </section>
    </>
  )
}
