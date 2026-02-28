import OrderModel from "../models/order.model.js";
import ProductModel from "../models/product.model.js";
import CartProductModel from "../models/cart.model.js";
import UserModel from "../models/user.model.js";
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

        if (!order) {
            res.status(500).json({
                success: false,
                error: true,
                message: "Error in creating order"

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
            success: true,
            error: false,
            message: "Order Placed",
            order: order
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error in creating order",
            error: error.message || error
        });
    }
}

export const getOrderDetailsController = async (req, res) => {
    try {
        const userid = req.userId; // order id
        const orderlist = await OrderModel.find({ userId: userid }).populate('delivery_address userId');

        if (!orderlist) {
            return res.status(404).json({
                message: "No orders found for this user",
                error: true,
                success: false
            });
        }

        return res.status(200).json({
            message: "Order list",
            error: false,
            success: true,
            data: orderlist
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function getAllOrderDetailsController(req, res) {
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

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

function getPayPalClient() {
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
                success: false,
                message: "Cart is empty",
                error: "No items found in cart"
            });
        }

        const totalInInr = getCartTotalInInr(cartItems);
        if (!totalInInr || totalInInr <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid cart total",
                error: "Cart total must be greater than 0"
            });
        }

        // Validate amount
        if (!clientAmountInInr || clientAmountInInr <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid order amount",
                error: "Amount must be greater than 0"
            });
        }

        if (Math.abs(clientAmountInInr - totalInInr) > 0.01) {
            return res.status(400).json({
                success: false,
                message: "Order total mismatch",
                error: "Cart total does not match request"
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
            success: false,
            message: "Error creating PayPal order",
            error: error.message || JSON.stringify(error)
        });
    }
}

export const captureOrderPayPalController = async (req, res) => {
    try {
        const { paymentId } = req.body;
        const userId = req.userId;

        if (!paymentId) {
            return res.status(400).json({
                success: false,
                message: "Payment ID is required",
                error: "Missing paymentId"
            });
        }

        const cartItems = await CartProductModel.find({ userId });
        if (!cartItems?.length) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty",
                error: "No items found in cart"
            });
        }

        const totalInInr = getCartTotalInInr(cartItems);
        if (!totalInInr || totalInInr <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid cart total",
                error: "Cart total must be greater than 0"
            });
        }

        const clientTotal = parseFloat(req.body.totalAmt);
        if (Number.isFinite(clientTotal) && Math.abs(clientTotal - totalInInr) > 0.01) {
            return res.status(400).json({
                success: false,
                message: "Order total mismatch",
                error: "Cart total does not match request"
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

        for (let i = 0; i < req.body.products.length; i++) {
            await ProductModel.findByIdAndUpdate(
                req.body.products[i].productId,
                {
                    countInStock: parseInt(req.body.products[i].countInStock - req.body.products[i].quantity),
                },
                { new: true }
            );
        }

        return res.status(200).json({
            success: true,
            message: "Order Placed",
            order: order
        });

    } catch (error) {
        console.error("PayPal Capture Error:", error);
        return res.status(500).json({
            success: false,
            message: "Error in capturing PayPal order",
            error: error.message || JSON.stringify(error)
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
            success: true,
            error: false,
            message: "Order status updated",
            data: updatedOrder
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in updating order status",
            error: error.message || JSON.stringify(error)
        });
    }
}

export const totalSalesController = async (req, res) => {
    try {
        const currentYear = new Date().getFullYear();

        const ordersList = await OrderModel.find()

        let totalSales = 0;
        let monthlySales = [
            {
                name: "Jan",
                TotalSales: 0
            },
            {
                name: "Feb",
                TotalSales: 0
            },
            {
                name: "Mar",
                TotalSales: 0
            },
            {
                name: "Apr",
                TotalSales: 0
            },
            {
                name: "May",
                TotalSales: 0
            },
            {
                name: "Jun",
                TotalSales: 0
            },
            {
                name: "Jul",
                TotalSales: 0
            },
            {
                name: "Aug",
                TotalSales: 0
            },
            {
                name: "Sep",
                TotalSales: 0
            },
            {
                name: "Oct",
                TotalSales: 0
            },
            {
                name: "Nov",
                TotalSales: 0
            },
            {
                name: "Dec",
                TotalSales: 0
            }
        ]


        for (let i = 0; i < ordersList.length; i++) {
            totalSales = totalSales + parseInt(ordersList[i]?.totalAmt);
            const str = JSON.stringify(ordersList[i]?.createdAt);
            const year = str.substr(1, 4);
            const monthStr = str.substr(6, 8);
            const month = parseInt(monthStr.substr(0, 2));

            if (currentYear == year) {

                if (month == 1) {
                    monthlySales[0] = {
                        name: "Jan",
                        TotalSales: monthlySales[0].TotalSales = parseInt(monthlySales[0].TotalSales) + parseInt(ordersList[i]?.totalAmt)
                    }
                }

                if (month == 2) {
                    monthlySales[1] = {
                        name: "Feb",
                        TotalSales: monthlySales[1].TotalSales = parseInt(monthlySales[1].TotalSales) + parseInt(ordersList[i]?.totalAmt)
                    }
                }

                if (month == 3) {
                    monthlySales[2] = {
                        name: "Mar",
                        TotalSales: monthlySales[2].TotalSales = parseInt(monthlySales[2].TotalSales) + parseInt(ordersList[i]?.totalAmt)
                    }
                }

                if (month == 4) {
                    monthlySales[3] = {
                        name: "Apr",
                        TotalSales: monthlySales[3].TotalSales = parseInt(monthlySales[3].TotalSales) + parseInt(ordersList[i]?.totalAmt)
                    }
                }

                if (month == 5) {
                    monthlySales[4] = {
                        name: "May",
                        TotalSales: monthlySales[4].TotalSales = parseInt(monthlySales[4].TotalSales) + parseInt(ordersList[i]?.totalAmt)
                    }
                }

                if (month == 6) {
                    monthlySales[5] = {
                        name: "Jun",
                        TotalSales: monthlySales[5].TotalSales = parseInt(monthlySales[5].TotalSales) + parseInt(ordersList[i]?.totalAmt)
                    }
                }

                if (month == 7) {
                    monthlySales[6] = {
                        name: "Jul",
                        TotalSales: monthlySales[6].TotalSales = parseInt(monthlySales[6].TotalSales) + parseInt(ordersList[i]?.totalAmt)
                    }
                }

                if (month == 8) {
                    monthlySales[7] = {
                        name: "Aug",
                        TotalSales: monthlySales[7].TotalSales = parseInt(monthlySales[7].TotalSales) + parseInt(ordersList[i]?.totalAmt)
                    }
                }

                if (month == 9) {
                    monthlySales[8] = {
                        name: "Sep",
                        TotalSales: monthlySales[8].TotalSales = parseInt(monthlySales[8].TotalSales) + parseInt(ordersList[i]?.totalAmt)
                    }
                }

                if (month == 10) {
                    monthlySales[9] = {
                        name: "Oct",
                        TotalSales: monthlySales[9].TotalSales = parseInt(monthlySales[9].TotalSales) + parseInt(ordersList[i]?.totalAmt)
                    }
                }

                if (month == 11) {
                    monthlySales[10] = {
                        name: "Nov",
                        TotalSales: monthlySales[10].TotalSales = parseInt(monthlySales[10].TotalSales) + parseInt(ordersList[i]?.totalAmt)
                    }
                }

                if (month == 12) {
                    monthlySales[11] = {
                        name: "Dec",
                        TotalSales: monthlySales[11].TotalSales = parseInt(monthlySales[11].TotalSales) + parseInt(ordersList[i]?.totalAmt)
                    }
                }
            }
        }

        return res.status(200).json({
            success: true,
            error: false,
            totalSales: totalSales,
            monthlySales: monthlySales
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in fetching total sales",
            error: error.message || JSON.stringify(error)
        });
    }
}

export const totalUsersController = async (req, res) => {
    try {
        const users = await UserModel.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" }
                    },
                    count: { $sum: 1 },
                },
            }, {
                $sort: { "_id.year": 1, "_id.month": 1 },
            },
        ]);

        let monthlyUsers = [
            {
                name: "Jan",
                TotalUsers: 0
            },
            {
                name: "Feb",
                TotalUsers: 0
            },
            {
                name: "Mar",
                TotalUsers: 0
            },
            {
                name: "Apr",
                TotalUsers: 0
            },
            {
                name: "May",
                TotalUsers: 0
            },
            {
                name: "Jun",
                TotalUsers: 0
            },
            {
                name: "Jul",
                TotalUsers: 0
            },
            {
                name: "Aug",
                TotalUsers: 0
            },
            {
                name: "Sep",
                TotalUsers: 0
            },
            {
                name: "Oct",
                TotalUsers: 0
            },
            {
                name: "Nov",
                TotalUsers: 0
            },
            {
                name: "Dec",
                TotalUsers: 0
            }
        ]

        for (let i = 0; i < users.length; i++) {
            if (users[i]?._id?.month === 1) {
                monthlyUsers[0] = {
                    name: "Jan",
                    TotalUsers: users[i]?.count
                }
            }
            if (users[i]?._id?.month === 2) {
                monthlyUsers[1] = {
                    name: "Feb",
                    TotalUsers: users[i]?.count
                }
            }
            if (users[i]?._id?.month === 3) {
                monthlyUsers[2] = {
                    name: "Mar",
                    TotalUsers: users[i]?.count
                }
            }
            if (users[i]?._id?.month === 4) {
                monthlyUsers[3] = {
                    name: "Apr",
                    TotalUsers: users[i]?.count
                }
            }
            if (users[i]?._id?.month === 5) {
                monthlyUsers[4] = {
                    name: "May",
                    TotalUsers: users[i]?.count
                }
            }
            if (users[i]?._id?.month === 6) {
                monthlyUsers[5] = {
                    name: "Jun",
                    TotalUsers: users[i]?.count
                }
            }
            if (users[i]?._id?.month === 7) {
                monthlyUsers[6] = {
                    name: "Jul",
                    TotalUsers: users[i]?.count
                }
            }
            if (users[i]?._id?.month === 8) {
                monthlyUsers[7] = {
                    name: "Aug",
                    TotalUsers: users[i]?.count
                }
            }
            if (users[i]?._id?.month === 9) {
                monthlyUsers[8] = {
                    name: "Sep",
                    TotalUsers: users[i]?.count
                }
            }
            if (users[i]?._id?.month === 10) {
                monthlyUsers[9] = {
                    name: "Oct",
                    TotalUsers: users[i]?.count
                }
            }
            if (users[i]?._id?.month === 11) {
                monthlyUsers[10] = {
                    name: "Nov",
                    TotalUsers: users[i]?.count
                }
            }
            if (users[i]?._id?.month === 12) {
                monthlyUsers[11] = {
                    name: "Dec",
                    TotalUsers: users[i]?.count
                }
            }

        }

        return res.status(200).json({
            success: true,
            error: false,
            TotalUsers: monthlyUsers
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in fetching total users",
            error: error.message || JSON.stringify(error)
        });
    }
}