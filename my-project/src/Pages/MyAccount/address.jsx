import React, { useContext, useEffect, useState } from 'react'
import AccountSidebar from '../../components/AccountSidebar';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { MyContext } from '../../App';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { deleteData, editData, fetchDataFromApi, postData } from '../../utils/api';
import { FaRegTrashAlt } from 'react-icons/fa';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import AddressBox from './addressBox';
import CircularProgress from '@mui/material/CircularProgress';



const label = { inputProps: { 'aria-label': 'Radio demo' } };



const Address = () => {

    const context = useContext(MyContext);

    const [isLoading, setIsLoading] = useState(false);
    const [address, setAddress] = useState([]);
    const [phone, setPhone] = useState('');
    const [isOpenModel, setisOpenModel] = useState(false);
    const [addressType, setAddressType] = useState('');
    const [mode, setMode] = useState("add");
    const [addressId, setAddressId] = useState("");



    const [formFields, setFormFields] = useState({
        address_line1: '',
        city: '',
        state: '',
        pincode: '',
        country: '',
        mobile: '',
        userId: '',
        landmark: '',
        addressType: ''
    });

    useEffect(() => {
        if (context?.userData?._id !== undefined) {
            setFormFields((prevState) => ({
                ...prevState,
                userId: context?.userData?._id
            }))
        }
    }, [context?.userData]);

    useEffect(() => {
        if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {

            fetchDataFromApi(`/api/address/get?userId=${context?.userData?._id}`).then((res) => {
                setAddress(res?.address);
            })

        }

    }, [context?.userData])
    

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormFields(() => {
            return {
                ...formFields,
                [name]: value
            }
        });
    }



    const handleClose = () => {
        setisOpenModel(false);
        setMode("add");
        setFormFields({
            address_line1: '',
            city: '',
            state: '',
            pincode: '',
            country: '',
            mobile: '',
            userId: context?.userData?._id || '',
            landmark: '',
            addressType: ''
        });
        setPhone('');
        setAddressType('');
        setAddressId("");
    };

    const removeAddress = (id) => {
        deleteData(`/api/address/${id}`).then((res) => {
            fetchDataFromApi(`/api/address/get?userId=${context?.userData?._id}`).then((res) => {
                setAddress(res?.address);
                context?.alertBox("Success", "Address deleted");
            }).catch((err) => {
                context?.alertBox("error", "Failed to fetch addresses");
            })
        }).catch((err) => {
            context?.alertBox("error", "Failed to delete address");
        })
    }

    const handleChangeAddressType = (e) => {
        setAddressType(e.target.value);
        setFormFields((prevState) => ({
            ...prevState,
            addressType: e.target.value
        }));
    }   


    const handleSubmit = (e) => {
        e.preventDefault();

        setIsLoading(true);

        if (formFields.address_line1 === "") {
            context.alertBox("error", "Please enter address line1")
            setIsLoading(false);
            return false
        }
        if (formFields.city === "") {
            context.alertBox("error", "Please enter city")
            setIsLoading(false);
            return false
        }
        if (formFields.state === "") {
            context.alertBox("error", "Please enter state")
            setIsLoading(false);
            return false
        }
        if (formFields.pincode === "") {
            context.alertBox("error", "Please enter pincode")
            setIsLoading(false);
            return false
        }
        if (formFields.country === "") {
            context.alertBox("error", "Please enter country")
            setIsLoading(false);
            return false
        }
        if (formFields.mobile.length < 10) {
            context.alertBox("error", "Please enter your 10 digit mobile number")
            setIsLoading(false);
            return false
        }

        if (formFields.addressType === "") {
            context.alertBox("error", "Please select address type")
            setIsLoading(false);
            return false
        }
        
        if (formFields.landmark === "") {
            context.alertBox("error", "Please enter landmark")
            setIsLoading(false);
            return false
        }


        if (mode === "add") {
            postData(`/api/address/add`, formFields, { withCredentials: true }).then((res) => {
                setIsLoading(false);
                if (res?.error !== true) {
                    setTimeout(() => {
                        setIsLoading(false);
                        context.alertBox("Success", res?.message);

                        setisOpenModel(false);
                    }, 500);

                    fetchDataFromApi(`/api/address/get?userId=${context?.userData?._id}`).then((res) => {
                        setAddress(res?.address);
                        setFormFields({
                            address_line1: '',
                            city: '',
                            state: '',
                            pincode: '',
                            country: '',
                            mobile: '',
                            userId: '',
                            landmark: '',
                            addressType: ''
                        });
                        setPhone('');
                        setAddressType('');
                    })


                } else {
                    context.alertBox("error", res?.message);
                    setIsLoading(false);
                }

            })
        }

        if (mode === "edit") {
            editData(`/api/address/${addressId}`, formFields, { withCredentials: true }).then((res) => {
                if (res?.data?.error !== true) {
                    setTimeout(() => {
                        setIsLoading(false);
                        context.alertBox("Success", res?.data?.message);
                        setisOpenModel(false);
                    }, 500);

                    fetchDataFromApi(`/api/address/get?userId=${context?.userData?._id}`).then((res) => {
                        setAddress(res?.address);
                        setFormFields({
                            address_line1: '',
                            city: '',
                            state: '',
                            pincode: '',
                            country: '',
                            mobile: '',
                            userId: '',
                            landmark: '',
                            addressType: ''
                        });
                        setPhone('');
                        setAddressType(''); 
                    }).catch((err) => {
                        context.alertBox("error", err?.message || "Something went wrong");
                    })
                    


                }else {
                    context.alertBox("error", res?.data?.message);
                    setIsLoading(false);
                }

            });
        }

    }

    const editAddress = (id) => {

        setMode("edit");
        setisOpenModel(true);

        setAddressId(id);

        setIsLoading(true);

        fetchDataFromApi(`/api/address/${id}`).then((res) => {
            setIsLoading(false);
            setFormFields({
                address_line1: res?.address?.address_line1 || '',
                city: res?.address?.city || '',
                state: res?.address?.state || '',
                pincode: res?.address?.pincode || '',
                country: res?.address?.country || '',
                mobile: res?.address?.mobile || '',
                userId: res?.address?.userId || '',
                landmark: res?.address?.landmark || '',
                addressType: res?.address?.addressType || ''
            });

            const ph = `"${res?.address?.mobile}"`;
            setPhone(ph);
            setAddressType(res?.address?.addressType || '');

        }).catch((err) => {
            setIsLoading(false);
            context.alertBox("error", err?.message || "Something went wrong");
        })
            
        

    }

    const handleOpenAddModal = () => {
        setMode("add");
        setisOpenModel(true);
        setFormFields({
            address_line1: '',
            city: '',
            state: '',
            pincode: '',
            country: '',
            mobile: '',
            userId: context?.userData?._id || '',
            landmark: '',
            addressType: ''
        });
        setPhone('');
        setAddressType('');
        setAddressId("");
    }

    return (
        <>
            <section className='py-10 w-full'>
                <div className='container flex gap-5'>
                    <div className='col1 w-[20%]'>
                        <AccountSidebar />
                    </div>


                    <div className='col2 w-[50%]'>
                        <div className='card bg-white p-5 shadow-md rounded-md mb-5'>
                            <div className='flex items-center pb-3'>
                                <h2 className='pb-0'>Address</h2>

                            </div>
                            <hr />
                            <br />

                            <div className="flex items-center justify-center p-5 rounded-md border border-dashed border-[rgba(0,0,0,0.2)] bg-[#f1faff] hover:bg-[#e7f3f9] cursor-pointer"
                                onClick={handleOpenAddModal} >
                                <span className="text-[14px] font-[500]">Add Address </span>
                            </div>

                            <div className="flex gap-2 flex-col mt-4">

                                {
                                    address?.length > 0 && address?.map((address, index) => {
                                        return (
                                            <AddressBox key={address?._id} address={address} removeAddress={removeAddress} editAddress={editAddress} />
                                        )
                                    })
                                }
                            </div>


                        </div>






                    </div>
                </div>

                <Dialog open={isOpenModel}>
                    <DialogTitle>{mode === "add" ? "Add Address" : "Edit Address"}</DialogTitle>

                    <form className='px-8 py-3 pb-8' onSubmit={handleSubmit}>
                        <div className='flex items-center gap-5 pt-2 pb-5'>
                            <div className='col w-[100%]'>
                                <TextField
                                    label="Address Line 1"
                                    variant='outlined'
                                    size="small"
                                    className="w-full"
                                    name='address_line1'
                                    value={formFields.address_line1}
                                    onChange={onChangeInput} />

                            </div>
                        </div>

                        <div className='flex items-center gap-5 pt-2 pb-5'>
                            <div className='col w-[50%]'>
                                <TextField
                                    label="City"
                                    variant='outlined'
                                    size="small"
                                    className="w-full"
                                    name='city'
                                    value={formFields.city}
                                    onChange={onChangeInput} />
                            </div>

                            <div className='col w-[50%]'>
                                <TextField
                                    label="State"
                                    variant='outlined'
                                    size="small"
                                    className="w-full"
                                    name='state'
                                    value={formFields.state}
                                    onChange={onChangeInput} />
                            </div>
                        </div>

                        <div className='flex items-center gap-5 pt-2 pb-5'>
                            <div className='col w-[50%]'>
                                <TextField
                                    label="Pincode"
                                    variant='outlined'
                                    size="small"
                                    className="w-full"
                                    name='pincode'
                                    value={formFields.pincode}
                                    onChange={onChangeInput}
                                />
                            </div>
                            <div className='col w-[50%]'>
                                <TextField
                                    label="Country"
                                    variant='outlined'
                                    size="small"
                                    className="w-full"
                                    name='country'
                                    value={formFields.country}
                                    onChange={onChangeInput}
                                />
                            </div>
                        </div>

                        <div className='flex items-center gap-5 pt-2 pb-5'>
                            <div className='col w-[50%]'>
                                <PhoneInput
                                    defaultCountry="in"
                                    value={phone}

                                    onChange={(phone) => {
                                        setPhone(phone)
                                        setFormFields((prevState) => ({
                                            ...prevState,
                                            mobile: phone
                                        }))
                                    }}
                                />
                            </div>

                            <div className='col w-[50%]'>
                                <TextField
                                    label="Landmark"
                                    variant='outlined'
                                    size="small"
                                    className="w-full"
                                    name='landmark'
                                    value={formFields.landmark}
                                    onChange={onChangeInput}
                                />
                            </div>
                        </div>
                        <div className='flex items-center gap-5 pt-2 pb-5'>
                            <div className='col w-[50%]'>
                                <FormControl>
                                    <FormLabel id="demo-controlled-radio-buttons-group">Address Type</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="addressType"
                                        value={addressType}
                                        onChange={handleChangeAddressType}
                                        className='flex items-center gap-5'
                                    >
                                        <FormControlLabel value="Home" control={<Radio />} label="Home" />
                                        <FormControlLabel value="Office" control={<Radio />} label="Office" />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </div>

                        <div className='flex items-center gap-5'>
                            <Button type='submit' className="btn-org btn-lg w-full flex items-center gap-3">
                                {
                                    isLoading === true ? <CircularProgress size={24} color="inherit" /> : mode === "add" ? "Add Address" : "Update Address"
                                }
                            </Button>
                            <Button className="btn-org btn-border btn-lg w-full flex items-center gap-3" onClick={handleClose}> Cancel</Button>
                        </div>
                    </form>

                </Dialog>
            </section>
        </>
    )
}

export default Address;