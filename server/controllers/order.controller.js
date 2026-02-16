import OrderModel from "../models/order.model.js";
import ProductModel from "../models/product.model.js";

export const createOrderController = async (req, res) => {
    try {
        let order = new OrderModel({
            userId: req.body.userId,
            products: req.body.products,
            paymentId: req.body.paymentId,
            payment_status: req.body.payment_status,
            delivery_address: req.body.delivery_address,
            totalAmt: req.body.totalAmt,
            date: req.body.date
        });

        if(!order){
            res.status(500).json({
                success : false,
                error: true,
                message : "Error in creating order"
            
            })
        }

        for (let i = 0; i < req.body.products.length; i++) {
            await ProductModel.findByIdAndUpdate(
                req.body.products[i].productId,
                {
                    countInStock: parseInt(req.body.products[i].countInStock - req.body.products[i].quantity),
                },
                { new: true }
            )
        }

        order = await order.save();

        res.status(200).json({
            success : true,
            error: false,
            message : "Order Placed",
            order : order
        });


    }catch (error) {
        res.status(500).json({
            success : false,
            message : "Error in creating order",
            error : error.message || error
        });
    }
}

export  async function getOrderDetailsController(req, res) {
    try {
        const userid = req.userId; // order id

        const orderlist = await OrderModel.find({ userId: userid }).sort({ createdAt: -1 }).populate('delivery_address userId');

        return res.status(200).json({
            message: "Order list",
            error: false,
            success: true,
            data: orderlist,
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}