import React, { useContext, useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { postData } from '../../utils/api';
import { MyContext } from '../../App';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseApp } from '../../firebase';

const auth = getAuth(firebaseApp);

const googleProvider = new GoogleAuthProvider();


const Login = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [formFields, setFormFields] = useState({
        name: '',
        email: '',
        password: ''
    });

    const context = useContext(MyContext);
    const history = useNavigate();

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormFields({
            ...formFields,
            [name]: value
        });
    }

    const valideValue = Object.values(formFields).every(el => el);

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsLoading(true);

        if(formFields.name === "") {
            context.alertBox("error", "Please enter full name")
            return false
        }
        if(formFields.email === "") {
            context.alertBox("error", "Please enter email")
            return false
        } 
        if(formFields.password === "") {
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
                history('/verify');
            } else {
                context.alertBox("error", res?.message);
                setIsLoading(false);
            }
            
        })
    }

    const authWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;

                const field = {
                    name: user.providerData[0].displayName,
                    email: user.providerData[0].email,
                    password: null,
                    avatar: user.providerData[0].photoURL,
                    mobile: user.providerData[0].phoneNumber,
                    role: "USER",
                    
                }

                postData("/api/user/authWithGoogle", field).then((res) => {
                    setIsLoading(false);
                    if (res?.error !== true) {
                        setIsLoading(false);
                        context.alertBox("Success", res?.message);
                        localStorage.setItem("accesstoken", res?.user?.accesstoken);
                        localStorage.setItem("refreshToken", res?.user?.refreshToken);

                        context.setIsLogin(true);
                        history('/');
                    } else {
                        context.alertBox("error", res?.message);
                        setIsLoading(false);
                    }
            
        })
                
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
            })
        
    }


  return (
    <section className='section py-10'>
        <div className='container'>
            <div className='card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10'>
                <h3 className='text-center text-[18px] text-black'>Register with a new accont</h3>

                <form className='w-full mt-5' onSubmit={handleSubmit}>

                    <div className='form-group w-full mb-5'>
                        <TextField
                            type='text'
                           id="name"
                           name='name'
                           value={formFields.name}
                           disabled={isLoading===true ? true : false}
                           label="Full Name"
                           variant="outlined"
                           className='w-full'
                           onChange={onChangeInput}
                        />
                    </div>

                    <div className='form-group w-full mb-5'>
                        <TextField
                            type='email'
                           id="email"
                           name='email'
                            value={formFields.email}
                            disabled={isLoading===true ? true : false}
                           label="Email Id *"
                           variant="outlined"
                           className='w-full'
                           onChange={onChangeInput}
                        />
                    </div>

                    <div className='form-group w-full mb-5 relative'>
                        <TextField
                            type={isShowPassword===false ? 'password' : 'text'}
                           id="password"
                            name='password'
                            value={formFields.password}
                            disabled={isLoading===true ? true : false}
                           label="Password *"
                           variant="outlined"
                           className='w-full'
                           onChange={onChangeInput}
                        />
                        <Button className='!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black'
                        onClick={()=> setIsShowPassword(!isShowPassword)}>
                            {
                                isShowPassword === false ? <IoMdEye className='text-[20px] opacity-75' /> : <IoMdEyeOff className='text-[20px] opacity-75' />
                            }
                        </Button>
                    </div>


                    <div className='flex items-center w-full mt-3 mb-3'>
                        <Button 
                        type='submit' 
                        disabled={!valideValue}
                        className='btn-org btn-lg w-full flex gap-3'
                        >
                            {
                                isLoading === true ? <CircularProgress color='inherit' />
                                :
                                "Register"
                            }
                            
                        </Button>
                    </div>

                    <p className='text-center'>Already have an account? <Link className='link text-[14px] font-[600] text-primary' to="/login">Login</Link></p>

                    <p className='text-center font-[500]'>Or continue with social account</p>


                    <Button className='flex gap-3 w-full !bg-[#f1f1f1] btn-lg !text-black'
                        onClick={authWithGoogle}
                    >
                        <FcGoogle className='text-[20px]' />
                        Sign Up with Google
                    </Button>

                </form>
            </div>
        </div>
    </section>
  )
}

export default Login;