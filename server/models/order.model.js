import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    products : [
        {
            productId : {
                type: String
            },
            productTitle : {
                type: String
            },
            quantity : {
                type: Number
            },
            price : {
                type: Number
            },
            image : {
                type: String
            },
            subTotal : {
                type: Number
            }
        }
    ],
    paymentId: {
        type: String,
        default: ""
    },
    payment_status: {
        type: String,
        default: ""
    },
    order_status: {
        type: String,
        default: "pending"
    },
    delivery_address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "address"
    },
    totalAmt: {
        type: Number,
        default: 0
    }

} , { timestamps : true });

// Add index for createdAt to optimize sorting by date
orderSchema.index({ userId: 1 });
orderSchema.index({ createdAt: -1 });
orderSchema.index({userId: 1, createdAt: -1 });

const OrderModel = mongoose.model("order", orderSchema);

export default OrderModel;