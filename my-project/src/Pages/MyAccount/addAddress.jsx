import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import CircularProgress from '@mui/material/CircularProgress';
import { useContext } from 'react';
import { MyContext } from '../../App';
import { editData, fetchDataFromApi, postData } from '../../utils/api';



const label = { inputProps: { 'aria-label': 'Radio demo' } };

const AddAddress = () => {

    const context = useContext(MyContext);

    const [isLoading, setIsLoading] = useState(false);
    const [phone, setPhone] = useState('');
    const [addressType, setAddressType] = useState('');



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

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormFields(() => {
            return {
                ...formFields,
                [name]: value
            }
        });
    }

    const handleChangeAddressType = (e) => {
        setAddressType(e.target.value);
        setFormFields((prevState) => ({
            ...prevState,
            addressType: e.target.value
        }));
    }

    useEffect(() => {
        if(context?.addressMode === "edit"){
            
            fetchAddress(context?.addressId);
            
        }
    },[context?.addressMode])

    


    const resetFormFields = () => {
        setFormFields((prevState) => ({
            address_line1: '',
            city: '',
            state: '',
            pincode: '',
            country: '',
            mobile: '',
            userId: prevState.userId,
            landmark: '',
            addressType: ''
        }));
        setPhone('');
        setAddressType('');
    }


    const handleSubmit = (e) => {
        e.preventDefault();

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
        // Extract only digits from phone number for validation
        const phoneDigits = formFields.mobile.replace(/\D/g, '');
        if (phoneDigits.length < 10) {
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


        if (context?.addressMode === "add") {
            setIsLoading(true);
            postData(`/api/address/add`, formFields, { withCredentials: true }).then((res) => {
                
                if (res?.error !== true) {
                    setTimeout(() => {
                        setIsLoading(false);
                        context?.alertBox("Success", res?.message);
                        context?.setOpenAddressPanel(false);
                        
                    }, 500);

                    context?.getUserDetails();
                    resetFormFields();


                } else {
                    context?.alertBox("error", res?.message);
                    setIsLoading(false);
                }

            }).catch((err) => {
                setIsLoading(false);
                context?.alertBox("error", err?.message || "Something went wrong");
            })
        }

        if (context?.addressMode === "edit") {
            setIsLoading(true);
            editData(`/api/address/${context?.addressId}`, formFields, { withCredentials: true }).then((res) => {
                if (res?.data?.error !== true) {
                    setTimeout(() => {
                        setIsLoading(false);
                        context?.alertBox("Success", res?.data?.message);
                        context?.setOpenAddressPanel(false);
                    }, 500);

                    context?.getUserDetails();
                    resetFormFields();



                } else {
                    context?.alertBox("error", res?.data?.message);
                    setIsLoading(false);
                    context?.setOpenAddressPanel(false);
                    context?.setAddressMode("add");
                }

            }).catch((err) => {
                setIsLoading(false);
                context?.setAddressMode("add");
                context?.setOpenAddressPanel(false);
                context?.alertBox("error", err?.message || "Something went wrong");
            });
        }

    }

    const fetchAddress = (id) => {

        context?.setAddressMode("edit");

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
            context?.setAddressMode("add");
            context?.alertBox("error", err?.message || "Something went wrong");
        })



    }

    


    return (
        <form className='p-8 py-3 pb-8 px-4' onSubmit={handleSubmit}>
            
                <div className='col w-full mb-4'>
                    <TextField
                        label="Address Line 1"
                        variant='outlined'
                        size="small"
                        className="w-full"
                        name='address_line1'
                        value={formFields.address_line1}
                        onChange={onChangeInput} />

                </div>
            

            
                <div className='col w-full mb-4'>
                    <TextField
                        label="City"
                        variant='outlined'
                        size="small"
                        className="w-full"
                        name='city'
                        value={formFields.city}
                        onChange={onChangeInput} />
                </div>
            

            

                <div className='col w-full mb-4'>
                    <TextField
                        label="State"
                        variant='outlined'
                        size="small"
                        className="w-full"
                        name='state'
                        value={formFields.state}
                        onChange={onChangeInput} />
                </div>
            
                <div className='col w-full mb-4'>
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
                <div className='col w-full mb-4'>
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
            
                <div className='col w-full mb-4'>
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

                <div className='col w-full mb-4'>
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
            
            <div className='flex items-center gap-5 pt-2 pb-5'>
                <div className='col w-full'>
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
                <Button type='submit' disabled={isLoading === true} className="btn-org btn-lg w-full flex items-center gap-3">
                    {
                        isLoading === true ? <CircularProgress size={24} color="inherit" /> : context?.addressMode === "add" ? "Add Address" : "Update Address"
                    }
                </Button>
            </div>
        </form>
    )
}

export default AddAddress;