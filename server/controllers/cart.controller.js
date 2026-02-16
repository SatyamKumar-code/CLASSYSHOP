import CartProductModel from '../models/cart.model.js';
import UserModel from '../models/user.model.js';

export const addToCartItemController = async ( req, res, ) => {
    try {
        const userId = req.userId;
        const { productTitle, image, rating, price, oldPrice, quantity, subTotal, countInStock, productId, discount, size, weight, ram, brand } = req.body;

        if ( !productTitle ) {
            return res.status(400).json({
                message: "provide productTitle",
                error: true,
                success: false
            })
        }
        if ( !image ) {
            return res.status(400).json({
                message: "provide image",
                error: true,
                success: false
            })
        }
        if ( rating === undefined || rating === null ) {
            return res.status(400).json({
                message: "provide rating",
                error: true,
                success: false
            })
        }
        if ( price === undefined || price === null ) {
            return res.status(400).json({
                message: "provide price",
                error: true,
                success: false
            })
        }
        if ( quantity === undefined || quantity === null ) {
            return res.status(400).json({
                message: "provide quantity",
                error: true,
                success: false
            })
        }

        if ( subTotal === undefined || subTotal === null ) {
            return res.status(400).json({
                message: "provide subTotal",
                error: true,
                success: false
            })
        }

        if ( countInStock === undefined || countInStock === null ) {
            return res.status(400).json({
                message: "provide countInStock",
                error: true,
                success: false
            })
        }
        if ( !productId ) {
            return res.status(400).json({
                message: "provide productId",
                error: true,
                success: false
            })
        }

        const checkItemCart = await CartProductModel.findOne({
            userId: userId,
            productId: productId
        })

        if( checkItemCart ) {
            return res.status(409).json({
                message: "Item already in cart",
                error: true,
                success: false
            })
        }

        const cartItem = new CartProductModel({
            productTitle: productTitle,
            image: image,
            rating: rating,
            quantity: quantity,
            price: price,
            oldPrice: oldPrice,
            discount: discount,
            size: size,
            weight: weight,
            ram: ram,
            brand: brand,
            subTotal: subTotal,
            countInStock: countInStock,
            userId: userId,
            productId: productId
        })

        const save = await cartItem.save();

        return res.status(201).json({
            message: "Item add Successfully",
            success: true,
            error: false,
            data: save
        })


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const getCartItemController = async ( req, res, ) => {
    try {
        const userId = req.userId;

        const cartItems = await CartProductModel.find({ 
            userId: userId 
        })


        return res.status(200).json({
            success: true,
            error: false,
            data: cartItems
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
} 

export const updateCartItemQtyController = async ( req, res ) => {
    try {
        const userId = req.userId;
        const { _id, qty, subTotal, size, weight, ram } = req.body;

        if ( !_id || qty === undefined || qty === null || subTotal === undefined || subTotal === null ) {
            return res.status(402).json({
                message: "provide _id, qty and subTotal",
                error: true,
                success: false
            })
        }

        const updateCartitem = await CartProductModel.updateOne(
            {
                _id: _id,
                userId: userId
            }, 
            {
            quantity: qty,
            subTotal: subTotal,
            size: size,
            weight: weight,
            ram: ram
            },
            { new: true }
        );

        return res.status(200).json({
            message: "Update cart item",
            success: true,
            error: false,
            data: updateCartitem
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const deleteCartItemController = async ( req, res ) => {
    try {

        const userId = req.userId;
        const { id } = req.params;


        if(!id) {
            return res.status(400).json({
                message: "provide id",
                error: true,
                success: false
            })
        }        const deleteCartItem = await CartProductModel.deleteOne({
            _id: id,
            userId: userId
        });

        if(!deleteCartItem) {
            return res.status(404).json({
                message: "The product in the cart is not found",
                error: true,
                success: false
            })
        }


        return res.status(200).json({
            message: "Item remove",
            success: true,
            error: false, 
            data: deleteCartItem
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const emptyCartController = async (req, res) => {
    try {
        const userId = req.params.id; //middleware se aayega

        await CartProductModel.deleteMany({ userId: userId });

        return res.status(200).json({
            success: true,
            error: false,
        })


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
} 