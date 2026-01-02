import AddressModel from "../models/address.model.js";
import UserModel from "../models/user.model.js";

export const AddAddressesController = async (req, res) => {
    try {
        const { address_line1, city, state, pincode, country, mobile, status, selected } = req.body;
        const userId = req.userId;

        if (!address_line1 || !city || !state || !pincode || !country || !mobile || !userId ) {
            return res.status(400).json({
                message: "All fields are required",
                error: true,
                success: false,
            });
        }

        const address = new AddressModel({
            address_line1,
            city,
            state,
            pincode,
            country,
            mobile,
            status,
            userId,
            selected
        })

        const savedAddress = await address.save();

        const updateUser = await UserModel.updateOne({ _id: userId }, { 
            $push: { 
                address_details: savedAddress?._id
            } 
        });

        return res.status(201).json({
            message: "Address added successfully",
            error: false,
            success: true,
            data: savedAddress
        });

    } catch (error) {
        return res.status(500).json({
        message: error.message || error,
        error: true,
        success: false,
        })
    }
}


export const getAddressesController = async (req, res) => {
    try {
        const address = await AddressModel.find({ userId: req?.query?.userId });

        if( !address ){
            return res.status(404).json({
                message: "No addresses found",
                error: true,
                success: false,
            });
        } else {
            const updateUser = await UserModel.updateOne({ _id: req?.query?.userId }, {
                $push: {
                    address_details: address?._id
                }
            });

            return res.status(200).json({
                message: "Addresses fetched successfully",
                error: false,
                success: true,
                address: address
            });
                
        }

        


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}
