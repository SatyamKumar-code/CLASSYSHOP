import MyListModel from '../models/myList.model.js';

export const addToMyListController = async ( req, res ) => {
    try {
        const userId = req.userId;
        const { productId, productTitle, image, rating, price, oldPrice, brand, discount } = req.body;

        const item = await MyListModel.findOne({
            userId: userId,
            productId: productId
        })

        if( item ) {
            return res.status(400).json({
                message: "Item alredy in my list"
            })
        }

        const myList = new MyListModel({
            productId,
            productTitle,
            image,
            rating,
            price,
            oldPrice,
            brand,
            discount,
            userId
        })

        const save = await myList.save();

        return res.status(200).json({
            error: false,
            success: true,
            message: "The product saved in the my list",
        })


    } catch ( error ) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const deleteToMyListController = async ( req, res ) => {
    try {
        const myListItem = await MyListModel.findById(req.params.id);
        if(!myListItem) {
            return res.status(404).json({
                error: true,
                success: false,
                message: "The item with given id was not found"
            })
        }

        const deleteItem = await MyListModel.findByIdAndDelete(req.params.id);

        if(!deleteItem) {
            return res.status(404).json({
                error: true,
                success: false,
                message: "The item is not deleted"
            })
        }

        return res.status(200).json({
            error: false,
            success: true,
            message: "The item removed from My List"
        })


    } catch ( error ) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const getMyListController = async ( req, res ) => {
    try {
        const userId = req.userId;

        const myListItems = await MyListModel.find({
            userId: userId
        })


        return res.status(200).json({
            error: false,
            success: true,
            data: myListItems
        })


    } catch ( error ) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}