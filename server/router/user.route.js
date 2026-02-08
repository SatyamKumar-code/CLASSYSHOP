import { Router } from "express";
import { addReview, authWithGoogleController, forgotPasswordController, getReviews, loginUserController, logoutController, refreshToken, registerUserController, removeImageFromCloudinary, resetpassword, resetpasswordOtp, updateUserDetails, userAvatarController, userDetails, verifyEmailController, verifyForgotPasswordOtp } from "../controllers/user.controller.js";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";

const userRouter = Router();

userRouter.post("/register", registerUserController);
userRouter.post("/verifyEmail", verifyEmailController);
userRouter.post("/login", loginUserController);
userRouter.post("/authWithGoogle", authWithGoogleController);
userRouter.get("/logout", auth, logoutController);
userRouter.put("/user-avatar", auth, upload.array('avatar'), userAvatarController);
userRouter.delete("/deleteImage", auth, removeImageFromCloudinary);
userRouter.put("/:id", auth, updateUserDetails);
userRouter.post('/forget-password', forgotPasswordController);
userRouter.post('/verify-forgot-password-otp', verifyForgotPasswordOtp);
userRouter.post("/reset-password", resetpassword);
userRouter.post("/reset-passwordwithotp", resetpasswordOtp)
userRouter.post("/refresh-token", refreshToken);
userRouter.get("/user-details", auth, userDetails);
userRouter.post("/addReview", auth, addReview);
userRouter.get("/getReviews", getReviews); 

export default userRouter;