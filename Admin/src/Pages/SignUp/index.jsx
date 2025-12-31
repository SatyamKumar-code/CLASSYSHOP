import Button from '@mui/material/Button';
import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { CgLogIn } from 'react-icons/cg';
import { FaRegEye, FaRegUser, FaEyeSlash } from 'react-icons/fa';
import LoadingButton from '@mui/lab/LoadingButton';
import { FcGoogle } from 'react-icons/fc';
import { BsFacebook } from 'react-icons/bs';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import { postData } from '../../utils/api';
import { MyContext } from '../../App';

const SignUp = () => {
    const [loadingGoogle, setLoadingGoogle] = useState(false);
    const [loadingFb, setLoadingFb] = useState(false);
    const [isPasswordShow, setisPasswordShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [formFields, setFormFields] = useState({
        name: '',
        email: '',
        password: ''
    });

    const context = useContext(MyContext);
    const history = useNavigate();

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormFields(() => {
            return {
                ...formFields,
                [name]: value
            }
        })
    }

    const valideValue = Object.values(formFields).every(el => el);

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsLoading(true);

        if (formFields.name === "") {
            context.alertBox("error", "Please enter full name")
            return false
        }
        if (formFields.email === "") {
            context.alertBox("error", "Please enter email")
            return false
        }
        if (formFields.password === "") {
            context.alertBox("error", "Please enter password")
            return false
        }

        postData("/api/user/register", formFields).then((res) => {
            setIsLoading(false);
            if (res?.error !== true) {
                setIsLoading(false);
                context.alertBox("Success", res?.message);
                localStorage.setItem("userEmail", formFields.email);
                setFormFields({
                    name: '',
                    email: '',
                    password: ''
                });
                history('/verify-account');
            } else {
                context.alertBox("error", res?.message);
                setIsLoading(false);
            }

        })
    }

    function handleClickGoogle() {
        setLoadingGoogle(true);
    };

    function handleClickFb() {
        setLoadingFb(true);
    };


  return (
    <section className='bg-white w-full '>
        <header className='w-full fixed top-0 left-0 px-4 py-3 flex items-center justify-between z-50'>
            <Link to="/">
                <img src="/logo1.svg" alt="Logo"
                className='w-[150px]!'/>
            </Link>


            <div className='flex items-center gap-0'>
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
             <img src="https://t3.ftcdn.net/jpg/05/88/24/10/360_F_588241010_cdQJ2QTsyDtt36jZsAFR45aAXICnPAzR.jpg" 
        className='w-full fixed top-0 left-0 opacity-20'/>

        <div className='loginBox card w-[600px] h-auto pb-20 mx-auto pt-20 relative z-50'>
            <div className='text-center'>
                <img src="/logo.svg"  className='m-auto'/>
            </div>

            <h1 className='text-center text-[35px] font-[800] mt-4'>
                Join us today! Get spacial
                <br />
                benefits and stay up-to-date.
            </h1>

            <div className='flex items-center justify-center w-full mt-5 gap-4'>
                <LoadingButton
                   size="small"
                   onClick={handleClickGoogle}
                   endIcon={<FcGoogle />}
                    loading={loadingGoogle}
                    loadingPosition="end"
                    variant="outlined"
                    className='bg-none! py-2! text-[15px]! capitalize! px-5! text-[rgba(0,0,0,0.7)]!'
                >
                     Signin with Google
                </LoadingButton>

                 <LoadingButton
                   size="small"
                   onClick={handleClickFb}
                   endIcon={<BsFacebook />}
                    loading={loadingFb}
                    loadingPosition="end"
                    variant="outlined"
                    className='bg-none! py-2! text-[15px]! capitalize! px-5! text-[rgba(0,0,0,0.7)]!'
                >
                     Signin with Facebook
                </LoadingButton>
            </div>

            <br />
            
            <div className='w-full flex items-center justify-center gap-3'>
                <span className='flex items-center w-[100px] h-[1px] bg-[rgba(0,0,0,0.2)]'></span>
                   <span className='text-[14px] font-[500]'>Or, Sign in with your email</span>
                <span className='flex items-center w-[100px] h-[1px] bg-[rgba(0,0,0,0.2)]'></span>
            </div>

            <br />

            <form className='w-full px-8 mt-3' onSubmit={handleSubmit}>

                <div className='form-group mb-4 w-full'>
                    <h4 className='text-[14px] font-[500] mb-1'>
                        Full Name
                    </h4>
                    <input 
                    type="text" 
                    name='name'
                    value={formFields.name}
                    disabled={isLoading===true ? true : false}
                    onChange={onChangeInput}
                    className='w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3'
                    />
                </div>

                <div className='form-group mb-4 w-full'>
                    <h4 className='text-[14px] font-[500] mb-1'>
                        Email
                    </h4>
                    <input 
                    type="email"
                    name='email'
                    value={formFields.email}
                    disabled={isLoading===true ? true : false}
                    onChange={onChangeInput} 
                    className='w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3'
                    />
                </div>

                <div className='form-group mb-4 w-full'>
                    <h4 className='text-[14px] font-[500] mb-1'>
                        Password
                    </h4>
                    <div className='relative w-full'>
                        <input
                            type={ isPasswordShow===false ? "password" : "text" }
                            name='password'
                            value={formFields.password}
                            disabled={isLoading===true ? true : false}
                            onChange={onChangeInput}
                            className='w-full h-[50px] border-2 border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3'
                        />
                        <Button className='absolute! top-[7px] right-[10px] z-50 rounded-full! w-[35px]! h-[35px]! min-w-[35px]! text-gray-600!'
                            onClick={() => setisPasswordShow(!isPasswordShow)}
                        >
                            {
                                isPasswordShow===false ? (
                                    <FaRegEye className='text-[18px]' />
                                ) : (
                                    <FaEyeSlash className='text-[18px]' />
                                )
                            }
                        </Button>
                    </div>
                    
                </div>

                <div className='form-group mb-4 w-full flex items-center justify-between'>
                    <FormControlLabel
                        control={<Checkbox defaultChecked/>}
                        label="Remember me"
                    />
                    <Link to="/forgot-password" className='text-primary text-[15px] font-[700] text-[rgba(0,0,0,0.7)] hover:underline hover:text-gray-700!'>
                        Forgot Password?
                    </Link>
                </div>

                <Button
                    type="submit"
                    className='btn-blue w-full '
                    disabled={!valideValue}>
                    {
                        isLoading === true ? (
                            <CircularProgress color='inherit' />) : "Sign Up"
                    }
                </Button>
            </form>

        </div>
    </section>
  )
}

export default SignUp;