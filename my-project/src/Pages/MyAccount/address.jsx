import React, { useContext, useEffect, useState } from 'react'
import AccountSidebar from '../../components/AccountSidebar';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import { MyContext } from '../../App';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { deleteData, fetchDataFromApi, postData } from '../../utils/api';
import { FaRegTrashAlt } from 'react-icons/fa';


const label = { inputProps: { 'aria-label': 'Radio demo' } };



const Address = () => {

    const context = useContext(MyContext);

    const [isLoading, setIsLoading] = useState(false);
    const [address, setAddress] = useState([]);
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState(false);
    const [isOpenModel, setisOpenModel] = useState(false);

    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    }


    const [formFields, setFormFields] = useState({
        address_line1: '',
        city: '',
        state: '',
        pincode: '',
        country: '',
        mobile: '',
        status: '',
        userId: '',
        selected: false
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

    const handleChangeStatus = (event) => {
        setStatus(event.target.value);
        setFormFields((prevState) => ({
            ...prevState,
            status: event.target.value
        }))
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



    const handleClose = () => {
        setisOpenModel(false)
    };

    const removeAddress = (id) => [
        deleteData(`/api/address/${id}`).then((res) => {
            fetchDataFromApi(`/api/address/get?userId=${context?.userData?._id}`).then((res) => {
                setAddress(res?.address);
            })
        })
    ]



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


        postData(`/api/address/add`, formFields, { withCredentials: true }).then((res) => {
            setIsLoading(false);
            if (res?.error !== true) {
                setIsLoading(false);
                context.alertBox("Success", res?.message);

                setisOpenModel(false);

                fetchDataFromApi(`/api/address/get?userId=${context?.userData?._id}`).then((res) => {
                    setAddress(res?.address);
                })


            } else {
                context.alertBox("error", res?.message);
                setIsLoading(false);
            }

        })
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
                                onClick={() => setisOpenModel(true)} >
                                <span className="text-[14px] font-[500]">Add Address </span>
                            </div>

                            <div className="flex gap-2 flex-col mt-4">

                                {
                                    address?.length > 0 && address?.map((address, index) => {
                                        return (
                                            <>
                                                <div className="addressBox group relative w-full rounded-md border border-dashed border-[rgba(0,0,0,0.2)] flex items-center justify-center bg-[#f1f1f1] p-3 rounded-md cursor-pointer">
                                                    <label className='mr-auto'>
                                                        <Radio {...label} name="address"
                                                            checked={
                                                                selectedValue === (
                                                                    address?._id
                                                                )
                                                            }
                                                            value={address?._id
                                                            }
                                                            onChange={handleChange} />
                                                        <span className="text-[12px]">
                                                            {
                                                                address?.city + " " +
                                                                address?.country + " " +
                                                                address?.state + " " +
                                                                address?.pincode
                                                            }
                                                        </span>
                                                    </label>


                                                    <span
                                                        onClick={() => removeAddress(address?._id)}
                                                        className='hidden z-50 group-hover:flex items-center justify-center w-[30px] h-[30px] rounded-full bg-gray-500 text-white ml-auto'>
                                                        <FaRegTrashAlt />
                                                    </span>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>


                        </div>






                    </div>
                </div>

                <Dialog open={isOpenModel}>
                    <DialogTitle>Add Address</DialogTitle>

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

                        <div className='flex items-center gap-5'>
                            <Button type='submit' className="btn-org btn-lg w-full flex items-center gap-3"> Save</Button>
                            <Button className="btn-org btn-border btn-lg w-full flex items-center gap-3" onClick={handleClose}> Cancel</Button>
                        </div>
                    </form>

                </Dialog>
            </section>
        </>
    )
}

export default Address;