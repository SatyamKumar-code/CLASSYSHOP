import React, { useContext, useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AccountSidebar from '../../components/AccountSidebar';
import { MyContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { editData, postData } from '../../utils/api';
import CircularProgress from '@mui/material/CircularProgress';
import { Collapse } from 'react-collapse';


const myAccount = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const [userId, setUserId] = useState(null);
    const [isChangePasswordFormShow, setIsChangePasswordFormShow] = useState(false);

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

    useEffect(() => {
        const token = localStorage.getItem("accesstoken");
        if(token===null){
            history('/login');
        }
    },[context?.isLogin]);

    useEffect(() => {
        if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {
            setUserId(context?.userData?._id);
            setFormFields({
                name: context?.userData?.name,
                email: context?.userData?.email,
                mobile: context?.userData?.mobile
            })

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


  return (
    <section className='py-10 w-full'>
        <div className='container flex gap-5'>
            <div className='col1 w-[20%]'>
              <AccountSidebar />  
            </div>


            <div className='col2 w-[50%]'>
                <div className='card bg-white p-5 shadow-md rounded-md mb-5'>
                    <div className='flex items-center pb-3'>
                        <h2 className='pb-0'>MY Profile</h2>
                        <Button className='ml-auto!'
                        onClick={() => setIsChangePasswordFormShow(!isChangePasswordFormShow)}
                        >Change Password</Button>
                    </div>
                    <hr />

                    <form className='mt-8' onSubmit={handleSubmit}>
                        <div className='flex items-center gap-5'>
                            <div className='w-[50%]'>
                                <TextField 
                                label="Full Name"
                                variant='outlined'
                                size='small'
                                className='w-full'
                                name="name"
                                value={formFields.name}
                                disabled={isLoading===true ? true : false}
                                onChange={onChangeInput}
                                />
                            </div>

                            <div className='w-[50%]'>
                                <TextField 
                                type='email'
                                label="Email"
                                variant='outlined'
                                size='small'
                                className='w-full'
                                name="email"
                                value={formFields.email}
                                disabled={true}
                                onChange={onChangeInput}
                                />
                            </div>

                            
                        </div>

                        <div className='flex items-center mt-4 gap-5'>
                            <div className='w-[50%]'>
                                <TextField 
                                label="Phone Number"
                                variant='outlined'
                                size='small'
                                className='w-full'
                                name="mobile"
                                value={formFields.mobile}
                                disabled={isLoading===true ? true : false}
                                onChange={onChangeInput}
                                />
                            </div>

                            
                        </div>

                        <br />

                        <div className='flex items-center gap-4'>
                              <Button 
                                type='submit' 
                                disabled={!valideValue}
                                className='btn-org btn-lg w-[200px]'
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
                    <div className='card bg-white p-5 shadow-md rounded-md'>
                        <div className='flex items-center pb-3'>
                            <h2 className='pb-0'>Change Password</h2>
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
                                    className='btn-org btn-lg w-[200px]'
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
                  
                
            </div>
        </div>
    </section>
  )
}

export default myAccount;