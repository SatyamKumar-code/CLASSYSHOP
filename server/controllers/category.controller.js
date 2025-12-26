import CategoryModel from '../models/category.model.js';

import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';


cloudinary.config({
    cloud_name: process.env.cloudinary_Config_Cloud_Name,
    api_key: process.env.cloudinary_Config_api_key,
    api_secret: process.env.cloudinary_Config_api_secret,
    secure: true,
});


// image upload
var imagesArr = [];

export async function uploadImages(req, res) {
    try {
        imagesArr = [];

        const image = req.files;

        const option = {
            use_filename: true,
            unique_filename: false,
            overwrite: false,
        };

        for (let i = 0; i < image?.length; i++) {
            const img = await cloudinary.uploader.upload(
                image[i].path,
                option,
                function (error, result) {
                    imagesArr.push(result.secure_url);
                    fs.unlinkSync(`uploads/${req.files[i].filename}`);
                }
            );
        }


        return res.status(200).json({
            images: imagesArr,
        });

    } catch (error) {
        return res.status(500).json({
            messsage: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function createCategory(req, res) {
    try {
        let category = new CategoryModel({
            name: req.body.name,
            images: imagesArr,
            parentId: req.body.parentId,
            parentCatName: req.body.parentCatName,
        })
        if( !category ) {
            return res.status(400).json({
                message: "Category not created",
                error: true,
                success: false
            })
        }

        category = await category.save();

        imagesArr = [];

        return res.status(201).json({
            message: "Category created successfully",
            error: false,
            success: true,
            category,
        })

    } catch (error) {
        return res.status(500).json({
            messsage: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function getCategories(req, res) {
    try {
        const categories = await CategoryModel.find();
        const categoryMap = {};

        categories.forEach(cat => {
            categoryMap[cat._id] = { ...cat._doc, Children: [] };
        })

        const rootCategories = [];

        categories.forEach(cat => {
            if (cat.parentId) {
                categoryMap[cat.parentId].Children.push(categoryMap[cat._id]);
            } else {
                rootCategories.push(categoryMap[cat._id]);
            }
        })

        return res.status(200).json({
            error: false,
            success: true,
            categories: rootCategories,
        });


    } catch (error) {
        return res.status(500).json({
            messsage: error.message || error,
            error: true,
            success: false
        })
    }
}