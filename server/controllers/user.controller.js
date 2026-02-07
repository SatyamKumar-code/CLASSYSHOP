import UserModel from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sendEmailFun from '../config/sendEmail.js';
import VerificationEmail from '../utils/verifyEmailTemplate.js';
import generateAccessToken from '../utils/generatedAccessToken.js';
import generateRefreshToken from '../utils/generatedRefreshToken.js';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.cloudinary_Config_Cloud_Name,
    api_key: process.env.cloudinary_Config_api_key,
    api_secret: process.env.cloudinary_Config_api_secret,
    secure: true,
})

export async function registerUserController(req, res) {
    try {
        let user;
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "provide all required fields",
                error: true,
                success: false
            });
        }

        user = await UserModel.findOne({ email });

        if (user) {
            return res.status(409).json({
                message: "User already Registered with this email",
                error: true,
                success: false
            });
        }

        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new UserModel({
            name,
            email,
            password: hashedPassword,
            otp: verifyCode,
            otp_expiry: Date.now() + 10 * 60 * 1000 // 10 minutes from now
        });

        await user.save();

        await sendEmailFun({
            to: email,
            subject: "Verify email from Classifyshop App",
            text: "",
            html: VerificationEmail(name, verifyCode)
        })

        const token = jwt.sign(
            { email: user.email, id: user._id },
            process.env.JSON_WEB_TOKEN_SECRET_KEY,
        )

        return res.status(201).json({
            success: true,
            error: false,
            message: "User registered successfully! Please verify your email.",
            token: token

        });
    } catch (error) {
        return res.status(500).json({
            messsage: error.message || error,
            error: true,
            success: false
        })
    }
}


export async function verifyEmailController(req, res) {
    try {
        const { email, otp } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User not found",
                error: true,
                success: false
            });
        }

        const isCodeValid = user.otp === otp;
        const isNotExpired = user.otp_expiry > Date.now();

        if (isCodeValid && isNotExpired) {
            user.verify_email = true;
            user.otp = null;
            user.otp_expiry = null;
            await user.save();
            return res.status(200).json({
                success: true,
                error: false,
                message: "Email verified successfully!"
            })
        } else if (!isCodeValid) {
            return res.status(400).json({
                error: true,
                success: false,
                message: "Invalid  OTP"
            })
        } else {
            return res.status(400).json({
                error: true,
                success: false,
                message: "OTP expired"
            })
        }
    } catch (error) {
        return res.status(500).json({
            messsage: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function authWithGoogleController(req, res) {
    const { name, email, avatar, mobile, role } = req.body;

    try {
        const existingUser = await UserModel.findOne({ email: email });

        if (!existingUser) {
            const user = await UserModel.create({
                name: name,
                mobile: mobile,
                email: email,
                password: "null",
                avatar: avatar,
                role: role,
                verify_email: true,
                signUpWithGoogle: true
            });

            await user.save();

            const accesstoken = await generateAccessToken(user._id);
            const refreshToken = await generateRefreshToken(user._id)

            await UserModel.findByIdAndUpdate(user?._id, {
                last_login_date: Date.now()
            })

            const cookiesOptions = {
                httpOnly: true,
                secure: true,
                sameSite: "None"
            }
            res.cookie('accessToken', accesstoken, cookiesOptions)
            res.cookie('refreshToken', refreshToken, cookiesOptions)

            return res.status(201).json({
                message: "Login successfully",
                error: false,
                success: true,
                user: {
                    accessToken,
                    refreshToken,
                }
            })
        } else {
            const accesstoken = await generateAccessToken(existingUser._id);
            const refreshToken = await generateRefreshToken(existingUser._id);

            await UserModel.findByIdAndUpdate(existingUser?._id, {
                last_login_date: Date.now()
            })

            const cookiesOptions = {
                httpOnly: true,
                secure: true,
                sameSite: "None"
            }
            res.cookie('accessToken', accesstoken, cookiesOptions)
            res.cookie('refreshToken', refreshToken, cookiesOptions)

            return res.json({
                message: "Login successfully",
                error: false,
                success: true,
                user: {
                    accesstoken,
                    refreshToken,
                }
            })
        }

    } catch (error) {
        return res.status(500).json({
            messsage: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function loginUserController(req, res) {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User not registered",
                error: true,
                success: false
            });

        }

        if (user.status !== "Active") {
            return res.status(400).json({
                message: "Contact to admin",
                error: true,
                success: false
            })
        }

        if (user.verify_email !== true) {
            return res.status(400).json({
                message: "Your Email is not verified yet. Please verify your email first.",
                error: true,
                success: false
            })
        }

        const CheckPassword = await bcrypt.compare(password, user.password);

        if (!CheckPassword) {
            return res.status(400).json({
                message: "Check your password",
                error: true,
                success: false
            });
        }

        const accesstoken = await generateAccessToken(user._id);
        const refreshToken = await generateRefreshToken(user._id);

        const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
            last_login_date: Date.now()
        })

        const cookiesOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }
        res.cookie('accessToken', accesstoken, cookiesOptions)
        res.cookie('refreshToken', refreshToken, cookiesOptions)

        return res.json({
            message: "Login successfully",
            error: false,
            success: true,
            user: {
                accesstoken,
                refreshToken,
            }
        })
    } catch (error) {
        return res.status(500).json({
            messsage: error.message || error,
            error: true,
            success: false
        })
    }
}


export async function logoutController(req, res) {
    try {
        const userid = req.userId

        const cookiesOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }

        res.clearCookie("accessToken", cookiesOptions);
        res.clearCookie("refreshToken", cookiesOptions);

        const removeRefreshToken = await UserModel.findByIdAndUpdate(userid, {
            refresh_token: ""
        })

        return res.status(200).json({
            message: "Logout successfully",
            error: false,
            success: true
        })


    } catch (error) {
        return res.status(500).json({
            messsage: error.message || error,
            error: true,
            success: false
        })
    }
}

// image upload
var imagesArr = [];

export async function userAvatarController(req, res) {
    try {
        imagesArr = [];

        const userId = req.userId;
        const image = req.files;

        const user = await UserModel.findById({ _id: userId });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false
            });
        }

        //first remove image from cloudinary
        const imgUrl = user.avatar;

        const urlArr = imgUrl.split("/");
        const avatar_image = urlArr[urlArr.length - 1];

        const imageName = avatar_image.split(".")[0];

        if (imageName) {
            const res = await cloudinary.uploader.destroy(
                imageName,
                (error, result) => {

                }
            );
        }


        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false
            });
        }

        const option = {
            use_filename: true,
            unique_filename: false,
            overwrite: false,
        };

        for (let i = 0; i < image?.length; i++) {
            const img = await cloudinary.uploader.upload(
                image[i].path,
                option,
                function (error, result) {
                    imagesArr.push(result.secure_url);
                    fs.unlinkSync(`uploads/${req.files[i].filename}`);
                }
            );
        }

        user.avatar = imagesArr[0];
        await user.save();

        return res.status(200).json({
            _id: userId,
            avatar: imagesArr[0],
        });

    } catch (error) {
        return res.status(500).json({
            messsage: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function removeImageFromCloudinary(request, response) {
    try {
        const imgUrl = request.query.img;

        const urlArr = imgUrl.split("/");
        const image = urlArr[urlArr.length - 1];

        const imageName = image.split(".")[0];

        if (imageName) {
            const res = await cloudinary.uploader.destroy(
                imageName,
                (error, result) => {

                }
            );
            if (res) {
                response.status(200).send(res);
            }
        }

    } catch (error) {
        return response.status(500).json({
            messsage: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function updateUserDetails(req, res) {
    try {
        const userId = req.userId;
        const { name, email, mobile, password } = req.body;

        const userExist = await UserModel.findById(userId);
        if (!userExist) {
            return res.status(400).send('The user cannot be Updated/1');
        }
        let verifyCode = "";


        if (email !== userExist.email) {
            verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        }
        let hashedPassword = "";

        if (password) {
            const salt = await bcrypt.genSalt(10);
            hashedPassword = await bcrypt.hash(password, salt);
        } else {
            hashedPassword = userExist.password;
        }

        const updateUser = await UserModel.findByIdAndUpdate(
            userId,
            {
                name: name,
                mobile: mobile,
                email: email,
                verify_email: email !== userExist.email ? false : true,
                password: hashedPassword,
                otp: verifyCode !== "" ? verifyCode : null,
                otp_expiry: verifyCode !== "" ? Date.now() + 600000 : ''
            },
            { new: true }
        )

        if (email !== userExist.email) {
            await sendEmailFun({
                to: email,
                subject: "verify email from Classifyshop App",
                text: "",
                html: VerificationEmail(name, verifyCode)
            })
        }

        return res.status(200).json({
            message: "User Updated Successfully",
            success: true,
            error: false,
            user: {
                _id: updateUser?._id,
                name: updateUser?.name,
                email: updateUser?.email,
                mobile: updateUser?.mobile,
                avatar: updateUser?.avatar
            }
        })

    } catch (error) {
        return res.status(500).json({
            messsage: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function forgotPasswordController(req, res) {
    try {
        const { email } = req.body;

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Email not available",
                error: true,
                success: false
            })
        } else {
            let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

            user.otp = verifyCode;
            user.otp_expiry = Date.now() + 10 * 60 * 1000; // 10 minutes from now

            await user.save();


            await sendEmailFun({
                to: email,
                subject: "Reset Password - Classifyshop App",
                text: "",
                html: VerificationEmail(user?.name, verifyCode)
            })

            return res.status(200).json({
                message: "Check your email",
                error: false,
                success: true
            })
        }



    } catch (error) {
        return res.status(500).json({
            messsage: "uu",
            error: true,
            success: false
        })
    }
}

export async function verifyForgotPasswordOtp(req, res) {
    try {
        const { email, otp } = req.body;

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Email not available",
                error: true,
                success: false
            })
        }

        if (!email || !otp) {
            return res.status(400).json({
                message: "Provide all required fields",
                error: true,
                success: false
            })
        }

        if (otp !== user.otp) {
            return res.status(400).json({
                message: "Invalid OTP",
                error: true,
                success: false
            })
        }

        const currentTime = new Date().toISOString();

        if (user.otp_expiry < currentTime) {
            return res.status(400).json({
                message: "OTP expired",
                error: true,
                success: false
            })
        }

        user.otp = null;
        user.otp_expiry = "";

        await user.save();

        return res.status(200).json({
            message: "Verify  OTP Successfully",
            error: false,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function resetpassword(req, res) {
    try {
        const { email, oldPassword, newPassword, confirmPassword } = req.body;
        if (!email || !newPassword || !confirmPassword) {
            return res.status(400).json({
                message: "Provide required fields email, newPassword, confirmPassword",
                error: true,
                success: false
            })
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Email is not available",
                error: true,
                success: false
            })
        }

        if(user?.signUpWithGoogle === false) {
            if (!oldPassword) {
                return res.status(400).json({
                    message: "Provide old password",
                    error: true,
                    success: false
                })
            }
            const checkPassword = await bcrypt.compare(oldPassword, user.password);

            if (!checkPassword) {
                return res.status(400).json({
                    message: "your old password is worng",
                    error: true,
                    success: false
                })
            }
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                message: "Password and ConfirmPassword must be same.",
                error: true,
                success: false
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        user.signUpWithGoogle = false;
        await user.save();

        return res.status(200).json({
            message: "Password reset successfully",
            error: false,
            success: true
        })

    }catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function resetpasswordOtp(req, res) {
    try {
        const { email, newPassword, confirmPassword } = req.body;
        if (!email || !newPassword || !confirmPassword) {
            return res.status(400).json({
                message: "Provide required fields email, newPassword, confirmPassword",
                error: true,
                success: false
            })
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Email is not available",
                error: true,
                success: false
            })
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                message: "Password and ConfirmPassword must be same.",
                error: true,
                success: false
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({
            message: "Password reset successfully",
            error: false,
            success: true
        })

    }catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function refreshToken(req, res) {
    try {
        const refreshToken = req.cookies.refreshToken || req?.headers?.authorization?.split(" ")[1];

        if (!refreshToken) {
            return res.status(401).json({
                message: "Invalid token",
                error: true,
                success: false
            })
        }

        const verified = await jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH_TOKEN);

        if (!verified) {
            return res.status(401).json({
                message: "token is expired",
                error: true,
                success: false
            })
        }

        const userId = verifyToken?._id;
        const newAccessToken = await generateAccessToken(userId);

        const cookiesOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }

        res.cookie('accessToken', newAccessToken, cookiesOptions);
        
        return res.status(200).json({
            message: "New access token generated successfully",
            error: false,
            success: true,
            data: {
                accessToken: newAccessToken
            }
        })


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function userDetails( req, res ) {
    try {
        const userId = req.userId;

        const user = await UserModel.findById(userId).select('-password -refresh_token').populate('address_details');

        return res.status(200).json({
            message: "User details",
            data: user,
            error: false,
            success: true,
        })
        
    } catch (error) {
        return res.status(500).json({
            message: "something went wrong",
            error: true,
            success: false
        })
    }
}