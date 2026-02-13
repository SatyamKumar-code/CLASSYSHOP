import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    address_line1 : {
        type : String,
        default : ""
    },
    city : {
        type : String,
        default : ""
    },
    state : {
        type : String,
        default : ""
    },
    pincode : {
        type : String,
    },
    country : {
        type : String,
    },
    mobile : {
        type : Number,
        default : null
    },
    selected : {
        type : Boolean,
        default : true
    },
    landmark : {
        type : String,
    },
    addressType: {
        type : String,
        enum: ["Home", "Office"],
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        default : ""
    }

}, { timestamps : true }); 

const AddressModel = mongoose.model("address", addressSchema);

export default AddressModel;