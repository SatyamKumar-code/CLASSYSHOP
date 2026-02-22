import Button from '@mui/material/Button';
import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { CgLogIn } from 'react-icons/cg';
import { FaRegUser} from 'react-icons/fa';
import { MyContext } from '../../App';
import { CircularProgress } from '@mui/material';
import { postData } from '../../utils/api';

const ForgotPassword = () => {
    const [isLoading, setIsLoading] = useState(false);

    const [formFields, setFormFields] = useState({
        email: ''
    });

    const context = useContext(MyContext);
    const history = useNavigate();

    const forgotPassword = (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (formFields.email === "") {
            context?.alertBox("error", "Please enter email id")
            setIsLoading(false);
            return false
        } else {
            context?.alertBox("Success", `OTP send to ${formFields.email}`)
            localStorage.setItem("userEmail", formFields.email);
            localStorage.setItem("actionType", "forgot-password");

            postData("/api/user/forget-password", {
                email: formFields.email
            }).then((res) => {
                if (res?.error === false) {
                    context?.alertBox("Success", res?.message);
                    history('/verify-account');
                    setIsLoading(false);
                } else {
                    context?.alertBox("error", res?.message);
                    setIsLoading(false);
                }
            })
        }

    }

    // const valideValue = Object.values(formFields).every(el => el);

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormFields({
            ...formFields,
            [name]: value
        });
    }

  return (
    <section className='w-full h-[100vh] relative' style={{background: 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%'}}>
        <header className='w-full static lg:fixed top-0 left-0 px-4 py-3 flex items-center justify-center sm:justify-between z-50'>
            <Link to="/">
                <img src="/logo1.svg" alt="Logo"
                className='w-[150px]!'/>
            </Link>


            <div className='hidden sm:flex items-center gap-0'>
              <NavLink to="/login" exact={true} activeClassName="active">
                <Button className='rounded-full! text-[rgba(0,0,0,0.8)]! px-5! flex gap-1'>
                   <CgLogIn className='text-[18px]' /> Login
                </Button>
              </NavLink>

              <NavLink to="/sign-up" exact={true} activeClassName="active">
                <Button className='rounded-full! text-[rgba(0,0,0,0.8)]! px-5! flex gap-1'>
                   <FaRegUser className='text-[15px]' /> Sign Up
                </Button>
              </NavLink>
            </div>
        </header>

        <div className='loginBox card md:w-[600px] w-full h-auto px-3 pb-20 mx-auto pt-5 lg:pt-20 relative z-50'>
            <div className='text-center'>
                <img src="/logo.svg"  className='m-auto'/>
            </div>

            <h1 className='text-center text-[18px] sm:text-[35px] font-[800] mt-4'>
                Having trouble to sign in?
                <br />
                Reset your password.
            </h1>


            <br />

            <form className='w-full px-3 sm:px-8 mt-3'>
                <div className='form-group mb-4 w-full'>
                    <h4 className='text-[14px] font-[500] mb-1'>
                        Email
                    </h4>
                    <input
                        type="email"
                        id="email"
                        name='email'
                        value={formFields.email}
                        disabled={isLoading === true ? true : false}
                        onChange={onChangeInput}
                        placeholder="Enter your email"
                        className='w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3'
                    />
                </div>

                
                <Button
                    type='button'
                    onClick={forgotPassword}
                    className='btn-blue w-full '>
                    {
                        isLoading === true ? <CircularProgress color='inherit' />
                            :
                            "Reset Password"
                    }
                </Button>
                <br /><br />
                <div className='text-center flex items-center justify-center gap-4'>
                    <span>Don't want to reset?</span>
                    <Link to='/login'
                    className='text-primary font-[700] text-[15px] hover:underline hover:text-gray-700'>
                        Sign In?
                    </Link>
                </div>
            </form>

        </div>
    </section>
  )
}

export default ForgotPassword;