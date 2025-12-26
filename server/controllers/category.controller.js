import CategoryModel from '../models/category.model.js';

import { v2 as cloudinary } from 'cloudinary';
import { error } from 'console';
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

export async function getCategoriesCount(req, res) {
    try {
        const categoriesCount = await CategoryModel.countDocuments({ parentId: undefined });

        if(!categoriesCount) {
            return res.status(500).json({
                success: false,
                error: true,
            });
        }else{
            res.send({
                categoryCount: categoriesCount,
            })
        }
    } catch (error) {
        return res.status(500).json({
            messsage: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function getSubCategoriesCount(req, res) {
    try {
        const categories = await CategoryModel.find();

        if(!categories) {
            return res.status(500).json({
                success: false,
                error: true,
            });
        }else{
            const subCatList = [];
            for (let cat of categories) {
                if(cat.parentId !== undefined) {
                    subCatList.push(cat);
                }
            }
            res.send({
                subCategoriesCount: subCatList.length,
            })
        }
    } catch (error) {
        return res.status(500).json({
            messsage: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function getCategory(req, res) {
    try {
        const category = await CategoryModel.findById(req.params.id);

        if(!category) {
            res.status(500).json({
                message: "the category with the given ID was not found.",
                success: false,
                error: true,
            });
        } 

        res.status(200).json({
            error: false,
            success: true,
            category: category,
        })


    } catch (error) {
        return res.status(500).json({
            messsage: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function removeImageFromCloudinary(request, response) {
    try {
        const imgUrl = request.query.img;

        const urlArr = imgUrl.split("/");
        const image = urlArr[urlArr.length - 1];

        const imageName = image.split(".")[0];

        if (imageName) {
            const res = await cloudinary.uploader.destroy(
                imageName,
                (error, result) => {

                }
            );
            if (res) {
                response.status(200).send(res);
            }
        }

    } catch (error) {
        return response.status(500).json({
            messsage: error.message || error,
            error: true,
            success: false
        })
    }
}    

export async function deleteCategory(req, res) {
    try {
        const category = await CategoryModel.findById(req.params.id);
        const images = category.images;

        let img = "";
        for (img of images) {
            const imgUrl = img;
            const urlArr = imgUrl.split("/");
            const image = urlArr[urlArr.length - 1];

            const imageName = image.split(".")[0];

            if (imageName) {
                cloudinary.uploader.destroy(imageName, (error, result) => {
                    //console.log(result, error);
                });
            }
        }

        const subCategory = await CategoryModel.find({
            parentId: req.params.id
        });

        for (let i=0; i<subCategory.length; i++) {

            const thirdsubCategory = await CategoryModel.find({
                parentId: subCategory[i]._id
            })

            for (let i=0; i < thirdsubCategory.length; i++) {
                const deletedThirdSubCat = await CategoryModel.findByIdAndDelete(thirdsubCategory[i]._id);
            }

            const deletedSubCat = await CategoryModel.findByIdAndDelete(subCategory[i]._id);
        }

        const deletedCat = await CategoryModel.findByIdAndDelete(req.params.id);

        if(!deletedCat) {
            return res.status(400).json({
                message: "Category not deleted",
                error: true,
                success: false
            })
        }

        res.status(200).json({
            message: "Category deleted!",
            error: false,
            success: true
        });
        
    } catch (error) {
        return res.status(500).json({
            messsage: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function updatedCategory(req, res) {
    try {
        const category = await CategoryModel.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                images: imagesArr.length > 0 ? imagesArr[0] : req.body.images,
                parentId: req.body.parentId,
                parentCatName: req.body.parentCatName,
            },
            { new: true }
        );

        if (!category) {
            return res.status(400).json({
                message: "Category not updated",
                error: true,
                success: false
            });
        }

        imagesArr = [];

        res.status(200).json({
            error: false,
            success: true,
            category: category,
        });


    } catch (error) {
        return res.status(500).json({
            messsage: error.message || error,
            error: true,
            success: false
        });
    }
}