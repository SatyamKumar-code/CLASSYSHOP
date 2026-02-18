import OrderModel from "../models/order.model.js";
import ProductModel from "../models/product.model.js";
import CartProductModel from "../models/cart.model.js";
import paypal from "@paypal/checkout-server-sdk";

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

        const { page = 1, limit = 5 } = req.query;
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;

        const orderlist = await OrderModel.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNum)
            .populate('delivery_address userId');

        const total = await OrderModel.countDocuments();

        return res.status(200).json({
            message: "Order list",
            error: false,
            success: true,
            data: orderlist,
            total: total,
            page: pageNum,
            totalPages: Math.ceil(total / limitNum)
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function getTotalOrdersCountController(req, res) {
    try {
        const ordersCount = await OrderModel.countDocuments();

        return res.status(200).json({
            error: false,
            success: true,
            count: ordersCount
        })

    }catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

function getPayPalClient(){
    const clientId = process.env.PAYPAL_MODE === "live" ? process.env.PAYPAL_CLIENT_ID_LIVE : process.env.PAYPAL_CLIENT_ID_SANDBOX;
    const clientSecret = process.env.PAYPAL_MODE === "live" ? process.env.PAYPAL_CLIENT_SECRET_LIVE : process.env.PAYPAL_CLIENT_SECRET_SANDBOX;
    const EXCHANGE_RATE_API_KEY = process.env.EXCHANGE_RATE_API_KEY;
    
    console.log("PayPal Mode:", process.env.PAYPAL_MODE);
    console.log("Client ID:", clientId ? "Present" : "MISSING");
    console.log("Client Secret:", clientSecret ? "Present" : "MISSING");
    
    if (!clientId || !clientSecret) {
        throw new Error("PayPal credentials are missing or empty");
    }
    
    const environment = 
        process.env.PAYPAL_MODE === "live"
        ? new paypal.core.LiveEnvironment(clientId, clientSecret)
        : new paypal.core.SandboxEnvironment(clientId, clientSecret);
    
    return new paypal.core.PayPalHttpClient(environment);
}

const EXCHANGE_RATE_URL = `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/INR`;

const getCartTotalInInr = (cartItems = []) => {
    return cartItems.reduce((total, item) => {
        const qty = Number(item?.quantity) || 0;
        const price = Number(item?.price) || 0;
        const subTotal = Number(item?.subTotal);
        const lineTotal = Number.isFinite(subTotal) ? subTotal : price * qty;
        return total + (Number.isFinite(lineTotal) ? lineTotal : 0);
    }, 0);
};

const convertInrToUsd = async (amountInInr) => {
    const resp = await fetch(EXCHANGE_RATE_URL);
    const respData = await resp.json();

    if (respData?.result !== "success") {
        throw new Error("Failed to fetch exchange rate");
    }

    const usdPerInrRate = respData?.conversion_rates?.USD;
    if (!usdPerInrRate) {
        throw new Error("Invalid exchange rate data");
    }

    return Number((amountInInr * usdPerInrRate).toFixed(2));
};

export const createOrderPayPalController = async (req, res) => {
    try {
        const userId = req.userId;
        const clientAmountInInr = parseFloat(req.query.totalAmount);

        const cartItems = await CartProductModel.find({ userId });
        if (!cartItems?.length) {
            return res.status(400).json({
                success : false,
                message : "Cart is empty",
                error : "No items found in cart"
            });
        }

        const totalInInr = getCartTotalInInr(cartItems);
        if (!totalInInr || totalInInr <= 0) {
            return res.status(400).json({
                success : false,
                message : "Invalid cart total",
                error : "Cart total must be greater than 0"
            });
        }

        // Validate amount
        if (!clientAmountInInr || clientAmountInInr <= 0) {
            return res.status(400).json({
                success : false,
                message : "Invalid order amount",
                error : "Amount must be greater than 0"
            });
        }

        if (Math.abs(clientAmountInInr - totalInInr) > 0.01) {
            return res.status(400).json({
                success : false,
                message : "Order total mismatch",
                error : "Cart total does not match request"
            });
        }

        const amountToCharge = await convertInrToUsd(totalInInr);

        const paypalRequest = new paypal.orders.OrdersCreateRequest();
        paypalRequest.prefer("return=representation");

        paypalRequest.requestBody({
            intent: "CAPTURE",
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: amountToCharge.toFixed(2)
                }
            }]
        })

        const client = getPayPalClient();
        const order = await client.execute(paypalRequest);
        return res.status(200).json({
            id: order.result.id
        });

    } catch (error) {
        console.error("PayPal Order Creation Error:", error);
        return res.status(500).json({
            success : false,
            message : "Error creating PayPal order",
            error : error.message || JSON.stringify(error)
        });
    }
}

export const captureOrderPayPalController = async (req, res) => {
    try {
        const { paymentId } = req.body;
        const userId = req.userId;

        if (!paymentId) {
            return res.status(400).json({
                success : false,
                message : "Payment ID is required",
                error : "Missing paymentId"
            });
        }

        const cartItems = await CartProductModel.find({ userId });
        if (!cartItems?.length) {
            return res.status(400).json({
                success : false,
                message : "Cart is empty",
                error : "No items found in cart"
            });
        }

        const totalInInr = getCartTotalInInr(cartItems);
        if (!totalInInr || totalInInr <= 0) {
            return res.status(400).json({
                success : false,
                message : "Invalid cart total",
                error : "Cart total must be greater than 0"
            });
        }

        const clientTotal = parseFloat(req.body.totalAmt);
        if (Number.isFinite(clientTotal) && Math.abs(clientTotal - totalInInr) > 0.01) {
            return res.status(400).json({
                success : false,
                message : "Order total mismatch",
                error : "Cart total does not match request"
            });
        }

        // Execute PayPal capture FIRST
        const paypalRequest = new paypal.orders.OrdersCaptureRequest(paymentId);
        paypalRequest.requestBody({});

        // Only save order if PayPal capture was successful
        const orderInfo = { 
            userId: userId,
            products: req.body.products,
            paymentId: req.body.paymentId,
            payment_status: req.body.payment_status,
            delivery_address: req.body.delivery_address,
            totalAmt: totalInInr,
            date: req.body.date
        }

        const order = new OrderModel(orderInfo);
        await order.save();

        for(let i = 0; i < req.body.products.length; i++) {
            await ProductModel.findByIdAndUpdate(
                req.body.products[i].productId,
                {
                    countInStock: parseInt(req.body.products[i].countInStock - req.body.products[i].quantity),
                },
                { new: true}
            );
        }

        return res.status(200).json({
            success : true,
            message : "Order Placed",
            order : order
        });
        
    } catch (error) {
        console.error("PayPal Capture Error:", error);
        return res.status(500).json({
            success : false,
            message : "Error in capturing PayPal order",
            error : error.message || JSON.stringify(error)
        });
    }
}

export const updateOrderStatusController = async (req, res) => {
    try {
        const { id, order_status } = req.body;

        const updatedOrder = await OrderModel.findByIdAndUpdate(
           {
              _id: id,
           },
           {
                order_status: order_status,
           },
           { new: true }
        );

        return res.status(200).json({
            success : true,
            error : false,
            message : "Order status updated",
            data : updatedOrder
        });

    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Error in updating order status",
            error : error.message || JSON.stringify(error)
        });
    }
}