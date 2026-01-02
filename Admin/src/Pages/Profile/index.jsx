import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import CircularProgress from "@mui/material/CircularProgress";
import { FaCloudUploadAlt } from "react-icons/fa";
import { editData, fetchDataFromApi, postData, uploadImage } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { PhoneInput } from "react-international-phone"
import 'react-international-phone/style.css'
import { Collapse } from "react-collapse";
import Radio from '@mui/material/Radio';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const Profile = () => {

    const [previews, setPreviews] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [address, setAddress] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const [userId, setUserId] = useState(null);
    const [isChangePasswordFormShow, setIsChangePasswordFormShow] = useState(false);
    const [phone, setPhone] = useState('');

    const [formFields, setFormFields] = useState({
        name: '',
        email: '',
        mobile: ''
    });

    const [changePassword, setChangePassword] = useState({
        email: '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const context = useContext(MyContext);
    const history = useNavigate();

    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    }

    useEffect(() => {
        const token = localStorage.getItem("accesstoken");
        if (token === null) {
            history('/login');
        }
    }, [context?.isLogin]);

    useEffect(() => {
        if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {

            fetchDataFromApi(`/api/address/get?userId=${context?.userData?._id}`).then((res) => {
                setAddress(res?.address); 
            })


            setUserId(context?.userData?._id);
            setFormFields({
                name: context?.userData?.name,
                email: context?.userData?.email,
                mobile: context?.userData?.mobile
            })
            const ph = `"${context?.userData?.mobile}"`;
            setPhone(ph);

            setChangePassword({
                email: context?.userData?.email
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

        setChangePassword(() => {
            return {
                ...changePassword,
                [name]: value
            }
        });
    }

    const valideValue = Object.values(formFields).every(el => el);

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsLoading(true);

        if (formFields.name === "") {
            context.alertBox("error", "Please enter full name")
            setIsLoading(false);
            return false
        }
        if (formFields.email === "") {
            context.alertBox("error", "Please enter email")
            setIsLoading(false);
            return false
        }
        if (formFields.mobile === "") {
            context.alertBox("error", "Please enter mobile number")
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

    const valideValue2 = Object.values(changePassword).every(el => el);

    const handleSubmitChangePassword = (e) => {
        e.preventDefault();

        setIsLoading2(true);

        if (changePassword.oldPassword === "") {
            context.alertBox("error", "Please enter old password")
            setIsLoading2(false);
            return false
        }
        if (changePassword.newPassword === "") {
            context.alertBox("error", "Please enter new password")
            setIsLoading2(false);
            return false
        }
        if (changePassword.confirmPassword === "") {
            context.alertBox("error", "Please enter confirm password")
            setIsLoading2(false);
            return false
        }
        if (changePassword.confirmPassword !== changePassword.newPassword) {
            context.alertBox("error", "Confirm password does not match new password")
            setIsLoading2(false);
            return false
        }


        postData(`/api/user/reset-password`, changePassword, { withCredentials: true }).then((res) => {

            if (res?.error !== true) {
                setIsLoading2(false);
                context.alertBox("Success", res?.message);

            } else {
                context.alertBox("error", res?.message);
                setIsLoading2(false);
            }

        })
    }


    useEffect(() => {
        const userAvtar = [];
        if (context?.userData?.avatar !== "" && context?.userData?.avatar !== undefined) {
            userAvtar.push(context?.userData?.avatar);
            setPreviews(userAvtar);
        }

    }, [context?.userData])

    let selectedImages = [];

    const formData = new FormData();

    const onChangeFile = async (e, apiEndPoint) => {
        try {
            const files = e.target.files;
            setUploading(true);
            console.log(files);

            for (var i = 0; i < files.length; i++) {
                if (
                    files[i] &&
                    (files[i].type === "image/jpeg" ||
                        files[i].type === "image/jpg" ||
                        files[i].type === "image/png" ||
                        files[i].type === "image/webp")

                ) {
                    const file = files[i];
                    selectedImages.push(file);
                    formData.append("avatar", file);

                    uploadImage("/api/user/user-avatar", formData).then((res) => {
                        setUploading(false);
                        let avatar = [];
                        avatar.push(res?.data?.avatar);
                        setPreviews(avatar);

                    })


                } else {
                    context.alertBox("error", "please select a valid JPG , PNG or webp image file.");
                    setUploading(false);
                    return false;
                }
            }

        } catch (error) {
            console.log("Error while uploading the image: ", error);
        }
    }

    return (
        <>
        <div className="card my-4 pt-5 w-[65%] shadow-md sm:rounded-lg bg-white px-5 pb-5">
            <div className="flex items-center justify-between">
                <h2 className="text-[18px] font-[600]">
                    User Profile
                </h2>

                <Button className='ml-auto!'
                    onClick={() => setIsChangePasswordFormShow(!isChangePasswordFormShow)}
                >Change Password</Button>
            </div>

            <br />

            <div className='w-[110px] h-[110px] rounded-full overflow-hidden mb-4 relative group flex items-center justify-center bg-gray-200'>
                {
                    uploading === true ? <CircularProgress color='inherit' />
                        :
                        <>
                            {
                                previews?.length !== 0 ? previews?.map((img, index) => {
                                    return (
                                        <img
                                            src={img}
                                            key={index}
                                            className="w-full h-full object-cover"
                                        />
                                    )

                                })
                                    :
                                    <img
                                        src={"/user.jpg"}
                                        className='w-full h-full object-cover'
                                    />
                            }
                        </>
                }





                <div className='overlay w-[100%] h-[100%] absolute top-0 left-0 z-50 bg-[rgba(0,0,0,0.7)] flex items-center justify-center cursor-pointer opacity-0 transition-all group-hover:opacity-100'>
                    <FaCloudUploadAlt className='text-[#fff] text-[25px]' />
                    <input type="file" className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
                        accept='image/*'
                        onChange={(e) =>
                            onChangeFile(e, "/api/user/user-avatar")
                        }
                        name='avatar'
                    />
                </div>
            </div>


            <form className='form mt-8' onSubmit={handleSubmit}>
                <div className='flex items-center gap-5'>
                    <div className='w-[50%]'>
                        <input 
                        type='text' 
                        name="name"
                        value={formFields.name}
                        disabled={isLoading === true ? true : false}
                        onChange={onChangeInput}
                        className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm bg-white'/>
                        
                    </div>

                    <div className='w-[50%]'>
                        
                        <input 
                        type='email' 
                        name="email"
                        value={formFields.email}
                        disabled={true}
                        onChange={onChangeInput}
                        className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm bg-white'/>
                    </div>


                </div>

                <div className='flex items-center mt-4 gap-5'>
                    <div className='w-[50%]'>
                        <PhoneInput
                            defaultCountry="in"
                            value={phone}
                            disabled={isLoading === true ? true : false}
                            onChange={(phone) => {
                                setPhone(phone)
                                setFormFields({
                                    mobile: phone
                                })
                            }}
                        />
                        
                    </div>


                </div>

                <br />

                <div className="flex items-center justify-center p-5 rounded-md border border-dashed border-[rgba(0,0,0,0.2)] bg-[#f1faff] hover:bg-[#e7f3f9] cursor-pointer"
                    onClick={() => context.setIsOpenFullScreenPanel({
                        open: true,
                        model: "Add New Address"
                    })} >
                    <span className="text-[14px] font-[500]">Add Address </span>
                </div>

                <div className="flex gap-2 flex-col mt-4">

                    {
                        address?.length > 0 && address?.map((address, index) => {
                            return (
                                <>
                                    <label className="addressBox w-full rounded-md border border-dashed border-[rgba(0,0,0,0.2)] flex items-center justify-center bg-[#f1f1f1] p-3 rounded-md cursor-pointer">
                                        <Radio {...label} name="address" 
                                        checked={
                                            selectedValue === (
                                                address?.address_line1 +
                                                address?.city +
                                                address?.country +
                                                address?.state +
                                                address?.pincode
                                            ) 
                                        } 
                                        value={address?.address_line1 +
                                                address?.city +
                                                address?.country +
                                                address?.state +
                                                address?.pincode
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
                                </>
                            )
                        })
                    }
                </div>

               

                <br />

                <div className='flex items-center gap-4'>
                    <Button
                        type='submit'
                        disabled={!valideValue}
                        className='btn-blue btn-lg w-full'
                    >
                        {
                            isLoading === true ? <CircularProgress color='inherit' />
                                :
                                "Update Profile"
                        }
                    </Button>

                </div>
            </form>
        </div>
        
        <Collapse isOpened={isChangePasswordFormShow}>
                    <div className='card w-[65%] bg-white p-5 shadow-md rounded-md'>
                        <div className='flex items-center pb-3'>
                            <h2 className='pb-0 text-[18px] font-[600]'>Change Password</h2>
                        </div>
                        <hr />

                        <form className='mt-8' onSubmit={handleSubmitChangePassword}>
                            <div className='flex items-center gap-5'>
                                <div className='w-[50%]'>
                                    <TextField
                                        label="Old Password"
                                        variant='outlined'
                                        size='small'
                                        className='w-full'
                                        name="oldPassword"
                                        value={changePassword.oldPassword}
                                        disabled={isLoading2 === true ? true : false}
                                        onChange={onChangeInput}
                                    />
                                </div>

                                <div className='w-[50%]'>
                                    <TextField
                                        type='text'
                                        label="New Password"
                                        variant='outlined'
                                        size='small'
                                        className='w-full'
                                        name="newPassword"
                                        value={changePassword.newPassword}
                                        disabled={isLoading2 === true ? true : false}
                                        onChange={onChangeInput}
                                    />
                                </div>


                            </div>

                            <div className='flex items-center mt-4 gap-5'>
                                <div className='w-[50%]'>
                                    <TextField
                                        label="Confirm Password"
                                        variant='outlined'
                                        size='small'
                                        className='w-full'
                                        name="confirmPassword"
                                        value={changePassword.confirmPassword}
                                        disabled={isLoading2 === true ? true : false}
                                        onChange={onChangeInput}
                                    />
                                </div>


                            </div>

                            <br />

                            <div className='flex items-center gap-4'>
                                <Button
                                    type='submit'
                                    disabled={!valideValue2}
                                    className='btn-blue btn-lg w-full'
                                >
                                    {
                                        isLoading2 === true ? <CircularProgress color='inherit' />
                                            :
                                            "Change Password"
                                    }
                                </Button>

                            </div>
                        </form>
                    </div>
                </Collapse>

        
        </>
    )
}

export default Profile;