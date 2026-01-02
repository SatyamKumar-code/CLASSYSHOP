import React from 'react'
import Button from '@mui/material/Button';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { PhoneInput } from "react-international-phone"
import 'react-international-phone/style.css'
import { useState } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { editData } from '../../utils/api';


const AddAddress = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState(false);
    const [formFields, setFormFields] = useState({
        address_line1: '',
        city: '',
        state: '',
        pincode: '',
        country: '',
        mobile: '',
        status: '',
        userId: ''
    });

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormFields(() => {
            return {
                ...formFields,
                [name]: value
            }
        });
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
        if (phone === "") {
            context.alertBox("error", "Please enter your 10 digit mobile number")
            setIsLoading(false);
            return false
        }

        editData(`/api/user/${userId}`, formFields, { withCredentials: true }).then((res) => {
            setIsLoading(false);
            if (res?.error !== true) {
                setIsLoading(false);
                context.alertBox("Success", res?.data?.message);

            } else {
                context.alertBox("error", res?.data?.message);
                setIsLoading(false);
            }

        })
    }


    return (
        <div className='p-5 bg-gray-50'>
            <form className='form py-3 p-8' onSubmit={handleSubmit}>
                <div className='scroll max-h-[72vh] overflow-y-scroll pr-4 pt-4'>

                    <div className='grid grid-cols-2 mb-3 gap-4'>
                        <div className='col w-[100%]!'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Address Line1</h3>
                            <input type='text' className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm bg-white' />
                        </div>

                        <div className='col w-[100%]!'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>city</h3>
                            <input type='text' className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm bg-white' />
                        </div>
                    </div>

                    <div className='grid grid-cols-3 mb-3 gap-4'>
                        <div className='col w-[100%]!'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>State</h3>
                            <input type='text' className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm bg-white' />
                        </div>

                        <div className='col w-[100%]!'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Pincode</h3>
                            <input type='text' className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm bg-white' />
                        </div>

                        <div className='col w-[100%]!'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Country</h3>
                            <input type='text' className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm bg-white' />
                        </div>

                        <div className='col w-[100%]!'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Mobile</h3>
                            <PhoneInput
                                defaultCountry="in"
                                value={phone}
                                disabled={isLoading === true ? true : false}
                                onChange={(phone) => {
                                    setPhone(phone)
                                   
                                }}
                            />
                        </div>

                        <div className='col w-full'>
                            <h3 className='text-[14px] font-[500] mb-1 text-black'>Status</h3>
                            <Select
                                value={status}
                                onChange={handleChangeStatus}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                size='small'
                                className='w-full'
                            >
                                <MenuItem value={true}>True</MenuItem>
                                <MenuItem value={false}>False</MenuItem>
                            </Select>
                        </div>
                    </div>

                    <br />
                    
                    
                </div>
                <br />
                <br />
                <div className='w-[250px]'>
                    <Button type='button' className='btn-blue btn-lg w-full flext gap-2'> <FaCloudUploadAlt className='text-[25px] text-white' /> Publish & View</Button>
                </div>
            </form>
        </div >
    )
}

export default AddAddress;