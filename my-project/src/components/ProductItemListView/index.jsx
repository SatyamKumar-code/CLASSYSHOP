import React, { useContext, useEffect, useState } from 'react'
import './style.css';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { FaRegHeart } from 'react-icons/fa';
import { IoGitCompareOutline } from 'react-icons/io5';
import { MdZoomOutMap } from 'react-icons/md';
import Tooltip from '@mui/material/Tooltip';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { MyContext } from '../../App';
import { deleteData, editData, postData } from '../../utils/api';
import { MdClose } from 'react-icons/md';
import { FaMinus } from 'react-icons/fa6';
import { FaPlus } from 'react-icons/fa6';
import CircularProgress from '@mui/material/CircularProgress';
import { IoMdHeart } from 'react-icons/io';



const ProductItem = (props) => {

  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isAddedInMyList, setIsAddedInMyList] = useState(false);
  const [cartItem, setCartItem] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [isShowTabs, setIsShowTabs] = useState(false);
  const [selectedTabName, setSelectedTabName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const context = useContext(MyContext);

  const addToCart = (product, quantity) => {

    if (!context?.isLogin) {
      context?.alertBox("error", "You are not logged in. Please login first");
      return;
    }
    const productItem = {
      _id: product?._id,
      name: product?.name,
      image: product?.images[0],
      rating: product?.rating,
      quantity: quantity,
      price: product?.price,
      oldPrice: product?.oldPrice,
      subTotal: Math.round(product?.price * quantity * 100) / 100,
      countInStock: product?.countInStock,
      brand: product?.brand,
      discount: product?.discount,
      size: props?.item?.size?.length !== 0 ? selectedTabName : '',
      weight: props?.item?.productWeight?.length !== 0 ? selectedTabName : '',
      ram: props?.item?.productRam?.length !== 0 ? selectedTabName : ''
    }

    setIsLoading(true);

    if (props?.item?.size?.length !== 0 || props?.item?.productWeight?.length !== 0 || props?.item?.productRam?.length !== 0) {
      setIsShowTabs(true);
    } else {
      context?.addToCart(productItem, quantity);
      setIsAdded(true);
      setIsShowTabs(false);
      setTimeout(() => {
        setIsShowTabs(false);
      }, 500)
    }


    if (activeTab !== null) {
      context?.addToCart(productItem, quantity);
      setIsAdded(true);
      setIsShowTabs(false);
      setTimeout(() => {
        setActiveTab(null);
        setSelectedTabName(null);
        setIsLoading(false);
      }, 500)
    }


  }

  const handleClickActiveTab = (index, name) => {
    if (activeTab === index) {
      setActiveTab(null);
      setSelectedTabName(null);
    } else {
      setActiveTab(index);
      setSelectedTabName(name);
    }
  }

  useEffect(() => {
    const item = context?.cartData?.filter((cartItem) =>
      cartItem?.productId?.includes(props?.item?._id)
    );

    const myListItem = context?.myListData?.filter((item) =>
      item?.productId?.includes(props?.item?._id)
    );

    if (item?.length !== 0) {
      setCartItem(item);
      setIsAdded(true);
      setQuantity(item[0]?.quantity || 1);
    } else {
      setCartItem([]);
      setIsAdded(false);
      setQuantity(1);
    }

    if (myListItem?.length !== 0) {
      setIsAddedInMyList(true);
    } else {
      setIsAddedInMyList(false);
    }



  }, [context?.cartData, props?.item?._id])


  const plusQty = () => {
    setQuantity(quantity + 1);

    const obj = {
      _id: cartItem[0]?._id,
      qty: quantity + 1,
      subTotal: props?.item?.price * (quantity + 1)
    }

    editData(`/api/cart/update-qty`, obj).then((res) => {
      if (res?.data?.success === true) {
        context?.getCartItems();
        context?.alertBox("Success", res?.data?.message);
      } else {
        context?.alertBox("Error", res?.data?.message || "Failed to update quantity");
      }
    }).catch((err) => {
      context?.alertBox("Error", "Failed to update quantity");
    })
  }

  const minusQty = () => {
    if (quantity !== 1 && quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(1);
    }

    if (quantity === 1 && cartItem?.length > 0 && cartItem[0]?._id) {
      deleteData(`/api/cart/delete-cart-item/${cartItem[0]?._id}`).then((res) => {
        if (res?.success === true) {
          context?.alertBox("Success", res?.message);
          context?.getCartItems();
          setIsAdded(false);
          setIsShowTabs(false);
          setActiveTab(null);
          setSelectedTabName(null);
        }
      })
    } else {
      const obj = {
        _id: cartItem[0]?._id,
        qty: quantity - 1,
        subTotal: props?.item?.price * (quantity - 1)
      }

      editData(`/api/cart/update-qty`, obj).then((res) => {
        if (res?.data?.success === true) {
          context?.getCartItems();
          context?.alertBox("Success", res?.data?.message);
        }

      })
    }
  }

  const handleAddToMyList = (item) => {
    if (!context?.isLogin) {
      context?.alertBox("error", "You are not logged in. Please login first");
      return false;
    }

    const obj = {
      productTitle: item?.name,
      image: item?.images?.[0],
      rating: item?.rating,
      price: item?.price,
      oldPrice: item?.oldPrice,
      discount: item?.discount,
      productId: item?._id,
      brand: item?.brand,
    }

    if (isAddedInMyList === false) {
      postData("/api/mylist/add", obj).then((res) => {
        if (res?.error !== false) {
          context?.alertBox("error", res?.message);
          return false;
        }
        context?.alertBox("Success", res?.message);
        setIsAddedInMyList(true);

        context?.getMyListData();

      }).catch((error) => {
        context?.alertBox("error", error?.message || "Failed to add to wishlist");
      })
    } else {
      const myListItem = context?.myListData?.find((listItem) =>
        listItem?.productId === item?._id
      );

      if (!myListItem?._id) {
        context?.alertBox("error", "My List item not found for this product");
        return;
      }

      deleteData(`/api/mylist/${myListItem?._id}`).then((res) => {
        if (res?.error === false) {
          context?.alertBox("Success", res?.message);
          setIsAddedInMyList(false);
          context?.getMyListData();
        } else {
          context?.alertBox("error", res?.message || "Failed to remove from wishlist");
        }
      }).catch((error) => {
        context?.alertBox("error", error?.message || "Failed to remove from wishlist");
      })
    }
  }

  return (
    <div className='productItem h-[169px] lg:h-[200px] shadow-lg rounded-md overflow-hidden border-1 border-[rgba(0,0,0,0.1)] flex items-center'>
      <div className="group imgWrapper object-cover w-[35%] sm:w-[20%] overflow-hidden rounded-md relative">
        <Link to={`/product/${props?.item?._id}`}>
          <div className='img h-[165px] lg:h-[220px] overflow-hidden'>
            <img src={props?.item?.images?.[0]} alt="items" className='w-full h-[165px] lg:h-[220px]' />
            <img src={props?.item?.images?.[1]} alt="items"
              className='w-full h-[165px] lg:h-[220px] transition-all duration-700 absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:scale-105' />
          </div>
        </Link>
        {
          isShowTabs === true &&
          <div className='flex items-center justify-center absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.7)] z-55 p-3 gap-2'>
            <Button className='absolute! top-1.5 right-1.5 min-w-[35px]! min-h-[35px]! w-[35px]! h-[35px]! rounded-full! bg-[rgba(255,255,255,0.9)]! text-black!'
              onClick={() => setIsShowTabs(false)}
            >
              <MdClose className='z-90 text-[25px] text-black!' />
            </Button>
            {
              props?.item?.size?.length !== 0 && (
                <div className={`flex gap-2 ${props?.item?.size?.length > 3 ? 'flex-wrap grid grid-cols-4' : 'flex-nowrap'}`}>
                  {
                    props?.item?.size?.map((item, index) => {
                      return (
                        <span key={index} className={`flex items-center justify-center p-1 bg-[rgba(255,255,255,0.8)] max-w-[35px] h-[25px] px-2 rounded-sm cursor-pointer hover:bg-white ${activeTab === index && 'bg-primary text-white'}`} onClick={() => handleClickActiveTab(index , item)}>{item}</span>
                      )
                    })
                  }
                </div>
              )
            }

            {
              props?.item?.productRam?.length !== 0 && (
                <div className={`flex gap-2 ${props?.item?.productRam?.length > 3 ? 'flex-wrap grid grid-cols-2' : 'flex-nowrap'}`}>
                  {
                    props?.item?.productRam?.map((item, index) => {
                      return (
                        <span key={index} className={`flex items-center justify-center p-1 bg-[rgba(255,255,255,0.8)] min-w-[65px]! h-[25px] px-2 rounded-sm cursor-pointer hover:bg-white ${activeTab === index && 'bg-primary text-white'}`} onClick={() => handleClickActiveTab(index, item)}>{item}</span>
                      )
                    })
                  }
                </div>
              )
            }

            {
              props?.item?.productWeight?.length !== 0 && (
                <div className={`flex gap-2 ${props?.item?.productWeight?.length > 3 ? 'flex-wrap grid grid-cols-2' : 'flex-nowrap'}`}>
                  {
                    props?.item?.productWeight?.map((item, index) => {
                      return (
                        <span key={index} className={`flex items-center justify-center p-1 bg-[rgba(255,255,255,0.8)] min-w-[65px]! h-[25px] px-2 rounded-sm cursor-pointer hover:bg-white ${activeTab === index && 'bg-primary text-white'}`} onClick={() => handleClickActiveTab(index, item)}>{item}</span>
                      )
                    })
                  }
                </div>
              )
            }
          </div>
        }
       
        <span className='discount flex items-center absolute top-[10px] left-[10px] z-50 bg-[#ff5252] text-white rounded-lg px-2 py-1 text-[12px] font-[600] p-1 text-[12px] font-[500]'>{props?.item?.discount}%</span>

        <div className='actions absolute top-[-200px] right-[5px] z-50 flex items-center gap-2 flex-col w-[50px] transition-all duration-300 group-hover:top-[15px] opacity-0 group-hover:opacity-100'>
          <Tooltip title="View" placement='left-start'>
            <Button className='!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !bg-white !text-black hover:!bg-[#ff5252] hover:!text-white group'
              onClick={() => context.handleOpenProductDetailModel(true, props?.item)}>
              <MdZoomOutMap className='text-[18px] !text-black group-hover:text-white' />
            </Button>
          </Tooltip>
          <Tooltip title="Compare" placement='left-start'>
            <Button className='!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !bg-white !text-black hover:!bg-[#ff5252] hover:!text-white group'>
              <IoGitCompareOutline className='text-[18px] !text-black group-hover:text-white' />
            </Button>
          </Tooltip>
          <Tooltip title="Wishlist" placement='left-start'>
            <Button className={`wishlist-btn !w-[30px] !h-[30px] !min-w-[30px] !rounded-full !bg-white hover:!bg-[#ff5252] group`}
              onClick={()=> handleAddToMyList(props?.item)}
            >
              {
              isAddedInMyList === true ? <IoMdHeart className='text-[18px]' /> 
                :
                <FaRegHeart className='text-[18px] text-black!' />
              }
              
            </Button>
          </Tooltip>
        </div>
      </div>

      <div className='info p-3 pr-0 relative py-5 px-3 lg:px-8 w-[55%] lg:w-[75%]'>
        <h6 className='text-[12px] lg:text-[15px] font-[400]!'><Link to={`/product/${props?.item?._id}`} className='link transition-all'>{props?.item?.brand}</Link></h6>
        <h3 className='text-[14px] md:text-[16px] lg:text-[18px] title mt-0! font-[500] mb-0! text-[#000]'><Link to={`/product/${props?.item?._id}`} className='link transition-all'>{context?.windowWidth < 1024 ? (props?.item?.name?.length > 20 ? props?.item?.name?.substr(0, 17) + "..." : props?.item?.name) : (props?.item?.name?.length > 60 ? props?.item?.name?.substr(0, 57) + "..." : props?.item?.name)}</Link></h3>
        <p className='text-[12px] lg:text-[14px] mb-0! mt-0!'>{context?.windowWidth < 1024 ? (props?.item?.description?.length > 25 ? props?.item?.description?.substr(0, 22) + "..." : props?.item?.description) : (props?.item?.description?.length > 60 ? props?.item?.description?.substr(0, 57) + "..." : props?.item?.description)}</p>

        <Rating name='size-small' defaultValue={props?.item?.rating} size="small" readOnly />

        <div className='flex items-center whitespace-nowrap gap-3'>
          <span className='oldPrice line-through text-gray-500 text-[12px] lg:text-[14px] font-[500]'>&#x20b9;{props?.item?.oldPrice}</span>
          <span className='price text-[#ff5252] text-[12px] lg:text-[14px] font-[600]'>&#x20b9;{props?.item?.price}</span>
        </div>

        <div className=" mt-1 lg:mt-3!">
          {
            isAdded === false ?
              <Button className='btn-org addToCartBtn btn-border flex font-bold! sm:font-semibold! whitespace-nowrap md:font-normal! btn-sm gap-2' size='small'
                onClick={() => addToCart(props?.item, quantity)}
              >
                <MdOutlineShoppingCart className='text-[20px]' /> Add to Cart
              </Button>
              :
              <>
                {
                  isLoading === true ? <Button className='btn-org btn-border flex w-[70%] lg:w-[23%] btn-sm gap-2' size='small ' style={context?.windowWidth < 922 ? { minHeight: '30px', height: '30px', padding: 0 } : { minHeight: '44px', height: '44px', padding: 0 }}
                  >
                    <CircularProgress size={context?.windowWidth < 922 ? 10 : 20} className='text-primary product-spinner' />
                  </Button> :

                    <div className='flex items-center justify-between w-[70%] lg:w-[23%] overflow-hidden rounded-full border border-[rgba(0,0,0,0.1)]'>
                      <Button
                        className='min-w-[35px]! w-[35px]! h-[30px]! bg-[#f1f1f1]! rounded-none!'
                        onClick={minusQty}
                      >
                        <FaMinus
                          className='text-[rgba(0,0,0,0.7)]'
                        />
                      </Button>
                      <span>{quantity}</span>
                      <Button
                        className='min-w-[35px]! w-[35px]! h-[30px]! bg-primary border-primary! rounded-none!'
                        onClick={plusQty}
                      >
                        <FaPlus
                          className='text-white'
                        />
                      </Button>
                    </div>
                }
              </>

          }



        </div>
        </div>

    </div>
  )
}

export default ProductItem;