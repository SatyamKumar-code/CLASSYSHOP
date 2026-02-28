import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Provide name"]
    },
    email: {
        type: String,
        required: [true, "Provide email"],
        unique: true
    },
    password: {
        type: String,
    },
    avatar: {
        type: String,
        default: ""
    },
    mobile: {
        type: Number,
        default: null
    },
    verify_email : {
        type: Boolean,
        default: false
    },
    access_token : {
        type: String,
        default: ""
    },
    refresh_token : {
        type: String,
        default: ""
    },
    last_login_date : {
        type: Date,
        default: ""
    },
    status : {
        type: String,
        enum : ["Active", "Inactive", "Suspended"],
        default: "Active"
    },
    address_details: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "address"
        }
    ],
    orderHistory: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "order"
        }
    ],
    otp : {
        type: String,
    },
    otp_expiry : {
        type: Date,
    },
    role : {
        type: String,
        enum : ["ADMIN", "USER"],
        default: "USER"
    },
    signUpWithGoogle: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

const UserModel = mongoose.model("User", userSchema);

export default UserModel;