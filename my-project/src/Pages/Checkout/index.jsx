import Button from '@mui/material/Button';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { BsFillBagCheckFill } from 'react-icons/bs';
import { MyContext} from '../../App';
import { FaPlus } from 'react-icons/fa6';
import Radio from '@mui/material/Radio';
import { deleteData, fetchDataFromApi, postData } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VITE_API_RAZORPAY_KEY_ID = import.meta.env.VITE_API_RAZORPAY_KEY_ID;
const VITE_API_RAZORPAY_KEY_SECRET = import.meta.env.VITE_API_RAZORPAY_KEY_SECRET;

const VITE_API_PAPAL_CLIENT_ID = import.meta.env.VITE_API_PAPAL_CLIENT_ID;
const VITE_API_URL = import.meta.env.VITE_API_URL;

const Checkout = () => {

    const [userData, setUserData] = useState(null);
    const [isChecked, setIsChecked] = useState(0);
    const [selectedAddress, setSelectedAddress] = useState("");
    const [totalAmount, setTotalAmount] = useState(0);
    const paypalContainerRef = useRef(null);
    const paypalErrorShownRef = useRef(false);

    const context = useContext(MyContext);
    const history = useNavigate();
    const goToFailed = (reason) => {
        history("/order/failed", { state: { reason } });
    };

    useEffect(() =>{
        window.scrollTo(0,0);
        setUserData(context?.userData);
        setSelectedAddress(context?.userData?.address_details[0]?._id);
    },[context?.userData, userData])

    useEffect(() => {
        const newTotal = context?.cartData?.length !== 0
            ? context?.cartData
                ?.map((item) => {
                    const subTotal = Number(item?.subTotal);
                    if (Number.isFinite(subTotal)) {
                        return subTotal;
                    }
                    return parseInt(item?.price) * item?.quantity;
                })
                .reduce((total, value) => total + value, 0)
            : 0;

        setTotalAmount(newTotal);

    }, [context?.cartData]);

    useEffect(() => {
        if (!VITE_API_PAPAL_CLIENT_ID) {
            return;
        }

        if (!paypalContainerRef.current) {
            return;
        }

        if (!context?.cartData?.length || totalAmount <= 0) {
            paypalContainerRef.current.innerHTML = "";
            return;
        }

        const renderButtons = () => {
            if (!window.paypal) {
                return;
            }

            paypalContainerRef.current.innerHTML = "";

            window.paypal
                .Buttons({
                    createOrder: async () => {
                        try {
                            paypalErrorShownRef.current = false;
                            const headers = {
                                'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`,
                                'Content-Type': 'application/json',
                            };

                            const data = {
                                userId: context?.userData?._id,
                                totalAmount: totalAmount,
                            };

                            const response = await axios.get(
                                VITE_API_URL + `/api/order/create-order-paypal?userId=${data?.userId}&totalAmount=${data?.totalAmount}`,
                                { headers }
                            );
                            return response?.data?.id; // Return order ID to PayPal SDK
                        } catch (error) {
                            const message = error?.response?.data?.message || "Unable to start PayPal checkout.";
                            context?.alertBox("error", message);
                            paypalErrorShownRef.current = true;
                            throw error;
                        }
                    },
                    onApprove: async (data) => {
                        try {
                            await onApprovePayment(data);
                        } catch (error) {
                            const message = error?.response?.data?.message || "Payment capture failed.";
                            context?.alertBox("error", message);
                            paypalErrorShownRef.current = true;
                            goToFailed("PAYPAL_CAPTURE_FAILED");
                            throw error;
                        }
                    },
                    onError: (err) => {
                        console.error("PayPal Checkout onError", err);
                        if (!paypalErrorShownRef.current) {
                            paypalErrorShownRef.current = true;
                            context?.alertBox("error", "Payment failed. Please try again.");
                            goToFailed("PAYPAL_ERROR");
                        }
                    },
                    onCancel: () => {
                        if (!paypalErrorShownRef.current) {
                            paypalErrorShownRef.current = true;
                            context?.alertBox("error", "Payment was canceled.");
                            goToFailed("PAYPAL_CANCELED");
                        }
                    }
                })
                .render(paypalContainerRef.current);
        };

        if (window.paypal) {
            renderButtons();
            return;
        }

        // Load the PayPal javaScript SDK
        const script = document.createElement("script");
        script.src = `https://www.paypal.com/sdk/js?client-id=${VITE_API_PAPAL_CLIENT_ID}&disable-funding=card`;
        script.async = true;
        script.onload = renderButtons;
        script.onerror = () => {
            if (!paypalErrorShownRef.current) {
                paypalErrorShownRef.current = true;
                context?.alertBox("error", "Unable to load PayPal. Please try again.");
                goToFailed("PAYPAL_SDK_LOAD_FAILED");
            }
        };
        document.body.appendChild(script);
    }, [context?.cartData, context?.userData, selectedAddress, totalAmount]);

    

    const onApprovePayment = async (data) => {
        const user = context?.userData;

        const info = {
            userId: user?._id,
            products: context?.cartData,
            payment_status: "COMPLETED",
            delivery_address: selectedAddress,
            totalAmt: totalAmount,
            date: new Date().toLocaleString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric"
            })
        };

        // Send the order details to your server to create an order record

        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`, // Include your API key in the Authorization header
            'Content-Type': 'application/json', // Adjust the content type as needed

        }

        const response = await axios.post(
            VITE_API_URL + "/api/order/capture-order-paypal",
            {
                ...info,
                paymentId: data?.orderID
            },
            { headers }
        );

        context?.alertBox("Success", response?.data?.message);
        paypalErrorShownRef.current = false;
        deleteData(`/api/cart/emptyCart/${context?.userData?._id}`).then((res) => {
            if(res?.error === false){
                context?.getCartItems();
                history("/order/success");
            }
        })
    }

    const editAddress = (id) => {
        context?.setAddressMode("edit");
        context?.setOpenAddressPanel(true);
        context?.setAddressId(id);
    }

    const handleChange = (e, index) => {
        if(e.target.checked){
            setIsChecked(index);
            setSelectedAddress(e.target.value);
        }
    }

    const checkout = (e) => {
        e.preventDefault();

        if(userData?.address_details?.length !== 0){
        var option = {
            key: VITE_API_RAZORPAY_KEY_ID,
            key_secret: VITE_API_RAZORPAY_KEY_SECRET,
            amount: parseInt(totalAmount * 100),
            currency: "INR",
            order_receipt: context?.userData?.name,
            name: "classyShop",
            description: "Total payable amount is " + totalAmount.toLocaleString('en-US', { style: 'currency', currency: "INR" }),
            handler: function (response) {
                const paymentId = response.razorpay_payment_id;

                const user = context?.userData;

                const payLoad = {
                    userId: user?._id,
                    products: context?.cartData,
                    paymentId: paymentId,
                    payment_status: "completed",
                    delivery_address: selectedAddress,
                    totalAmt: totalAmount,
                    date: new Date().toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                    }),
                }

                postData(`/api/order/create`, payLoad).then((res) => {
                    
                    if(res?.error === false) {
                        context?.alertBox("Success", res?.message);

                        deleteData(`/api/cart/emptyCart/${user?._id}`).then((res) => {
                            if(res?.error === false){
                                context?.getCartItems();
                            }
                        })
                        history("/order/success");
                    }else {
                        context?.alertBox("error", res?.message);
                        goToFailed("RAZORPAY_ORDER_FAILED");
                    }
                });
            },
            modal: {
                ondismiss: () => {
                    context?.alertBox("error", "Payment was canceled.");
                    goToFailed("RAZORPAY_CANCELED");
                },
            },

            theme: {
                color: "#ff5252",
            },

                
        };
        

        var pay = new window.Razorpay(option);
        pay.on("payment.failed", (response) => {
            const errorMessage = response?.error?.description || "Payment failed. Please try again.";
            context?.alertBox("error", errorMessage);
            goToFailed("RAZORPAY_FAILED");
        });
        pay.open();
        } else {
            context?.alertBox("error", "Please add address");
        }
    }

    const cashOnDelivery = () => {
        const user = context?.userData;

        if(userData?.address_details?.length !== 0) {
            const payLoad = {
            userId: user?._id,
            products: context?.cartData,
            paymentId: "",
            payment_status: "CASH ON DELIVERY",
            delivery_address: selectedAddress,
            totalAmt: totalAmount,
            date: new Date().toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }),
        };

        postData(`/api/order/create`, payLoad).then((res) => {
            if(res?.error === false) {
                context?.alertBox("Success", res?.message);
                deleteData(`/api/cart/emptyCart/${user?._id}`).then((res) => {
                    if(res?.error === false){
                        context?.getCartItems();
                    }
                })
                history("/order/success");
            }else {
                context?.alertBox("error", res?.message);
                goToFailed("COD_ORDER_FAILED");
            }
        })
        } else {
            context?.alertBox("error", "Please add address");
        }
    }

    
  return (
    <section className='py-3 lg:py-10 px-3'>
        <form onSubmit={checkout}>
        <div className='w-full lg:w-[70%] m-auto flex flex-col md:flex-row gap-5'>
            <div className='leftCol w-full md:w-[60%]'>
                <div className='card bg-white p-5 rounded-md w-full'>
                    <div className="flex justify-between items-center border-b border-[rgba(0,0,0,0.1)] pb-3 mb-5">
                        <h2>Select Delivery Address</h2>
                        <Button variant='outlined'
                            onClick={() => {
                                context?.setOpenAddressPanel(true);
                                context?.setAddressMode("add");
                            }}
                            className='btn'
                        > 
                            <FaPlus /> ADD {context?.windowWidth < 767 ? '' : 'NEW ADDRESS'}
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
                                                value={address?._id}
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

            <div className='rightCol w-full md:w-[40%]'>
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

                    <div className="flex flex-col items-center gap-3 mb-2">
                        <Button
                            type='submit'
                            className="btn-org btn-lg w-full flex items-center gap-3"
                            disabled={!context?.cartData?.length}
                        >
                            <BsFillBagCheckFill className='text-[20px] ' /> Checkout
                        </Button>

                        <div id="paypal-button-container" className={`${userData?.address_details?.length === 0 ? 'pointer-events-none' : 'z-20'}`} ref={paypalContainerRef}></div>

                        <Button type='button' className='btn-dark btn-lg w-full flex gap-2 items-center' onClick={cashOnDelivery} disabled={!context?.cartData?.length}>
                            <BsFillBagCheckFill className='text-[20px]' />
                            Cash on Delivery
                        </Button>
                    </div>
                </div>
            </div>
        </div>
        </form>
    </section>
  )
}

export default Checkout;