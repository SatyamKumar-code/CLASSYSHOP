import React, { useContext, useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { MyContext } from '../../App';


const Login = () => {

    const [isShowPassword, setIsShowPassword] = useState(false);
    const [formFields, setFormFields] = useState({
        email: '',
        password: ''
    });

    const context = useContext(MyContext);
    const history = useNavigate();

    const forgotPassword = () => {

        context.openAlertBox("Success", "OTP Send")
        history("/verify");   
              
       
        
    }


  return (
    <section className='section py-10'>
        <div className='container'>
            <div className='card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10'>
                <h3 className='text-center text-[18px] text-black'>Login to your accont</h3>

                <form action="/" className='w-full mt-5'>
                    <div className='form-group w-full mb-5'>
                        <TextField
                            type='email'
                           id="email"
                           label="Email Id *"
                           variant="outlined"
                           className='w-full'
                           name='name'
                        />
                    </div>

                    <div className='form-group w-full mb-5 relative'>
                        <TextField
                            type={isShowPassword===false ? 'password' : 'text'}
                           id="password"
                           label="Password *"
                           variant="outlined"
                           className='w-full'
                           name='password'
                        />
                        <Button type='submit' className='!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black'
                        onClick={()=> setIsShowPassword(!isShowPassword)}>
                            {
                                isShowPassword === false ? <IoMdEye className='text-[20px] opacity-75' /> : <IoMdEyeOff className='text-[20px] opacity-75' />
                            }
                        </Button>
                    </div>


                    <a className='link cursor-pointer text-[14px] font-[600]' onClick={forgotPassword}>Forgot Password?</a>


                    <div className='flex items-center w-full mt-3 mb-3'>
                        <Button className='btn-org btn-lg w-full'>Login</Button>
                    </div>

                    <p className='text-center'>Not Registered? <Link className='link text-[14px] font-[600] text-primary' to="/register">Sign UP</Link></p>

                    <p className='text-center font-[500]'>Or continue with social account</p>


                    <Button className='flex gap-3 w-full !bg-[#f1f1f1] btn-lg !text-black'
                    >
                        <FcGoogle className='text-[20px]' />
                        Login with Google
                    </Button>

                </form>
            </div>
        </div>
    </section>
  )
}

export default Login;