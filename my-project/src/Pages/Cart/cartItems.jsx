import React, { useContext, useState, useEffect } from 'react'
import { IoCloseSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { GoTriangleDown } from 'react-icons/go';
import Rating from '@mui/material/Rating';
import { deleteData, editData, fetchDataFromApi } from '../../utils/api';
import { MyContext } from '../../App';

const CartItems = (props) => {

    const [sizeanchorEl, setSizeAnchorEl] = useState(null);
    const [selectedSize, setSelectedSize] = useState(props?.item?.size || "");
    const openSize = Boolean(sizeanchorEl);

    const [productSizes, setProductSizes] = useState([]);

    const [qtyanchorEl, setQtyAnchorEl] = useState(null);
    const [selectedQty, setSelectedQty] = useState(props?.item?.quantity || props?.qty || 1);
    const openQty = Boolean(qtyanchorEl);

    const [ramAnchorEl, setRamAnchorEl] = useState(null);
    const [selectedRam, setSelectedRam] = useState(props?.item?.ram || "");
    const openRAM = Boolean(ramAnchorEl);

    const [weightAnchorEl, setWeightAnchorEl] = useState(null);
    const [selectedWeight, setSelectedWeight] = useState(props?.item?.weight || "");
    const openWEIGHT = Boolean(weightAnchorEl);

    const context = useContext(MyContext);

    useEffect(() => {
        if (!props?.item?.productId) return;

        fetchDataFromApi(`/api/product/${props.item.productId}`).then((res) => {
            if (res?.error === false && res?.product) {
                setProductSizes(res.product.size || []);
            }
        });
    }, [props?.item?.productId]);

    const handleClickSize = (event) => {
        setSizeAnchorEl(event.currentTarget);
    };
    const handleCloseSize = () => {
        setSizeAnchorEl(null);
    };

    const handleClickRam = (event) => {
        setRamAnchorEl(event.currentTarget);
    };
    const handleCloseRam = () => {
        setRamAnchorEl(null);
    };

    const handleClickWeight = (event) => {
        setWeightAnchorEl(event.currentTarget);
    };
    const handleCloseWeight = () => {
        setWeightAnchorEl(null);
    };

    const handleClickQty = (event) => {
        setQtyAnchorEl(event.currentTarget);
    };
    const handleCloseQty = (value) => {
        setQtyAnchorEl(null);
        if (value !== null && value !== undefined) {
            const newQty = value;
            setSelectedQty(newQty);

            const cartObj = {
                _id: props?.item?._id,
                qty: newQty,
                subTotal: props?.item?.price * newQty,
                size: selectedSize,
                weight: selectedWeight,
                ram: selectedRam
            };

            editData("/api/cart/update-qty", cartObj).then((res) => {
                if (res?.data?.error === false) {
                    context?.alertBox("Success", res?.data?.message);
                    context?.getCartItems();
                }
            });
        }
    };

    const updateCart = (field, selectedVal) => {
        let newSize = selectedSize;
        let newRam = selectedRam;
        let newWeight = selectedWeight;

        if (field === "size") {
            newSize = selectedVal;
            setSelectedSize(selectedVal);
            handleCloseSize();
        } else if (field === "ram") {
            newRam = selectedVal;
            setSelectedRam(selectedVal);
            handleCloseRam();
        } else if (field === "weight") {
            newWeight = selectedVal;
            setSelectedWeight(selectedVal);
            handleCloseWeight();
        }

        const qty = selectedQty;

        const cartObj = {
            _id: props?.item?._id,
            qty: qty,
            subTotal: props?.item?.price * qty,
            size: newSize,
            weight: newWeight,
            ram: newRam
        };

        editData("/api/cart/update-qty", cartObj).then((res) => {
            if (res?.data?.error === false) {
                context?.alertBox("Success", res?.data?.message);
                context?.getCartItems();
            }
        });
    };

    const removeItem = (id) => {
        deleteData(`/api/cart/delete-cart-item/${id}`).then((res) => {
            context?.alertBox("Success", res?.message);
            context?.getCartItems();
        })
    }

  return (
    <div className='cartItem w-full p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)]'>
        <div className='img w-[30%] sm:w-[20%] lg:w-[15%] rounded-md overflow-hidden'>
            <Link to={`/product/${props?.item?.productId}`} className='group'>
                <img src={props?.item?.image}
                    className='w-full group-hover:scale-105 transition-all' />
            </Link>
        </div>

        <div className='info w-[70%] sm:w-[80%] lg:w-[85%] relative'>
            <IoCloseSharp className='cursor-pointer absolute top-[0px] right-[0px] text-[22px] link transition-all' onClick={() => removeItem(props?.item._id)} />
            <span className='text-[13px]'>{props?.item?.brand}</span>
            <h3 className='text-[13px] sm:text-[15px]'><Link to={`/product/${props?.item?._id}`} className='link'>{props?.item?.productTitle?.length > (context?.windowWidth < 922 ? 30 : 120) ? props?.item?.productTitle?.substr(0, context?.windowWidth < 922 ? 30 : 120) + '...' : props?.item?.productTitle}</Link></h3>

            <Rating name='size-small' value={props?.item?.rating} size='small' readOnly />
            <div className='flex items-center gap-4 mt-2'>
                {
                    props?.item?.size !== "" &&
                    <>
                        {
                            productSizes?.length !== 0 &&
                            <div className='relative'>
                                <span className='flex items-center justify-center bg-[#f1f1f1] text-[11px] font-[600] py-1 px-2 rounded-md cursor-pointer'
                                    onClick={handleClickSize}
                                >
                                    Size: {selectedSize}<GoTriangleDown />
                                </span>
                                <Menu
                                    id="size-menu"
                                    anchorEl={sizeanchorEl}
                                    open={openSize}
                                    onClose={handleCloseSize}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    {
                                        productSizes?.map((item, index) => {
                                            return (
                                                <MenuItem
                                                    key={index}
                                                    className={`${item === selectedSize ? "bg-primary text-white" : ""}`}
                                                    onClick={() => updateCart("size", item)}
                                                >{item}</MenuItem>
                                            )
                                        })
                                    }
                                </Menu>
                            </div>
                        }
                    </>
                }

                {
                    props?.item?.ram !== "" &&
                    <>
                        {
                            props?.productRamsData?.length !== 0 &&
                            <div className='relative'>
                                <span className='flex items-center justify-center bg-[#f1f1f1] text-[11px] font-[600] py-1 px-2 rounded-md cursor-pointer'
                                    onClick={handleClickRam}
                                >
                                    RAM: {selectedRam}<GoTriangleDown />
                                </span>
                                <Menu
                                    id="ram-menu"
                                    anchorEl={ramAnchorEl}
                                    open={openRAM}
                                    onClose={handleCloseRam}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    {
                                        props?.productRamsData?.map((item, index) => {
                                            return (
                                                <MenuItem
                                                    key={index}
                                                    className={`${item?.Ram === selectedRam ? "bg-primary text-white" : ""}`}
                                                    onClick={() => updateCart("ram", item?.Ram)}
                                                >{item?.Ram}</MenuItem>
                                            )
                                        })
                                    }
                                </Menu>
                            </div>
                        }
                    </>
                }

                {
                    props?.item?.weight !== "" &&
                    <>
                        {
                            props?.productWeightData?.length !== 0 &&
                            <div className='relative'>
                                <span className='flex items-center justify-center bg-[#f1f1f1] text-[11px] font-[600] py-1 px-2 rounded-md cursor-pointer'
                                    onClick={handleClickWeight}
                                >
                                    WEIGHT: {selectedWeight}<GoTriangleDown />
                                </span>
                                <Menu
                                    id="weight-menu"
                                    anchorEl={weightAnchorEl}
                                    open={openWEIGHT}
                                    onClose={handleCloseWeight}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    {
                                        props?.productWeightData?.map((item, index) => {
                                            return (
                                                <MenuItem
                                                    key={index}
                                                    className={`${item?.weight === selectedWeight ? "bg-primary text-white" : ""}`}
                                                    onClick={() => updateCart("weight", item?.weight)}
                                                >{item?.weight}</MenuItem>
                                            )
                                        })
                                    }
                                </Menu>
                            </div>
                        }
                    </>
                }

                <div className='relative'>
                    <span className='flex items-center justify-center bg-[#f1f1f1] text-[11px] font-[600] py-1 px-2 rounded-md cursor-pointer'
                        onClick={handleClickQty}
                    >
                        Qty:  {selectedQty} <GoTriangleDown />
                    </span>

                    <Menu
                        id="size-menu"
                        anchorEl={qtyanchorEl}
                        open={openQty}
                        onClose={() => handleCloseQty(null)}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >

                        {Array.from({ length: 15 }).map((_, index) => (
                            <MenuItem
                                key={index}
                                onClick={() => handleCloseQty(index + 1)}
                            >{index + 1}</MenuItem>
                        ))}


                    </Menu>
                </div>
            </div>

            <div className='flex items-center gap-4 mt-2'>
                <span className='price text-black text-[14px] font-[600]'>
                    &#x20b9;{props?.item?.price}
                </span>
                <span className='oldPrice line-through text-gray-500 text-[14px] font-[500]'>
                    &#x20b9;{props?.item?.oldPrice}
                </span>
                <span className='price text-primary text-[14px] font-[600]'>
                    {props?.item?.discount}% OFF
                </span>
            </div>
        </div>
    </div>
  )
}

export default CartItems;