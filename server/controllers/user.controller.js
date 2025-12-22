import UserModel from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sendEmailFun from '../config/sendEmail.js';
import VerificationEmail from '../utils/verifyEmailTemplate.js';

export async function registerUserController( req, res ) {
    try {
        let user;
        const { name, email, password } = req.body;
        if( !name || !email || !password ) {
            return res.status(400).json({
                message: "provide all required fields",
                error: true,
                success: false
            });
        }

        user = await UserModel.findOne({ email });

        if( user ) {
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
            to : email,
            subject : "Verify email from Classifyshop App",
            text : "",
            html : VerificationEmail(name, verifyCode)
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

        if(!user) {
            return res.status(400).json({
                message: "User not found",
                error: true,
                success: false
            });
        }

        const isCodeValid = user.otp === otp;
        const isNotExpired = user.otp_expiry > Date.now();

        if(!isCodeValid && isNotExpired) {
            user.verify_email = true;
            user.otp = null;
            user.otp_expiry = null;
            await user.save();
            return res.status(200).json({
                success: true,
                error: false,
                message: "Email verified successfully!"
            })
        }else if (!isCodeValid) {
            return res.status(400).json({
                error: true,
                success: false,
                message: "Invalid  OTP"
            })
        }else {
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