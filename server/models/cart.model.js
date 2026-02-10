import mongoose from "mongoose";

const cartProductSchema = new mongoose.Schema({
    productTitle : {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
    },
    oldPrice: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    subTotal: {
        type: Number,
        required: true
    
    },
    size: {
        type: String,
    },
    weight: {
        type: String,
    },
    ram: {
        type: String,
    },
    productId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Provide product ID"]
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Provide user ID"]
    },
    countInStock: {
        type: Number,
        required: true
    },
},{ timestamps: true });

const CartProductModel = mongoose.model("cart", cartProductSchema);

export default CartProductModel;