import CartProductModel from '../models/cartproduct.model.js';
import UserModel from '../models/user.model.js';

export const addToCartItemController = async ( req, res, ) => {
    try {
        const userId = req.userId;
        const { productId } = req.body;

        if ( !productId ) {
            return res.status(402).json({
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
            })
        }

        const cartItem = new CartProductModel({
            quantity: 1,
            userId: userId,
            productId: productId
        })

        const save = await cartItem.save();

        const updateCartUser = await UserModel.updateOne({ _id : userId }, {
            $push: {
                shopping_cart: productId
            }
        })

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
        }).populate('productId');


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
        const { _id, qty } = req.body;

        if ( !_id || !qty ) {
            return res.status(402).json({
                message: "provide _id and qty",
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
            quantity: qty
            }
        );

        return res.status(200).json({
            message: "Update cart",
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
        const { _id, productId } = req.body;


        if(!_id) {
            return res.status(402).json({
                message: "provide _id",
                error: true,
                success: false
            })
        }
        const deleteCartItem = await CartProductModel.deleteOne({
            _id: _id,
            userId: userId
        });

        if(!deleteCartItem) {
            return res.status(404).json({
                message: "The product in the cart is not found",
                error: true,
                success: false
            })
        }

        const user = await UserModel.findOne({
            _id : userId
        })

        const cartItems = user?.shopping_cart;

        const updatedUserCart = [...cartItems.slice(0, cartItems.indexOf(productId)), ...cartItems.slice(cartItems.indexOf(productId) + 1)];

        user.shopping_cart = updatedUserCart;

        await user.save();


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