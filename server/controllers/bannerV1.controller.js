import BannerV1Model from "../models/bannerV1.model.js";

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
            message: error.message || 'Image upload failed',
            error: true,
            success: false
        })
    }
}

export async function addBanner(req, res) {
    try {
        let banner = new BannerV1Model({
            bannerTitle: req.body.bannerTitle,
            images: imagesArr,
            catId: req.body.catId,
            subCatId: req.body.subCatId,
            thirdsubCatId: req.body.thirdsubCatId,
            price: req.body.price,
            alignInfo: req.body.alignInfo,
        })
        if( !banner ) {
            return res.status(400).json({
                message: "Banner not created",
                error: true,
                success: false
            })
        }

        banner = await banner.save();

        imagesArr = [];

        return res.status(201).json({
            message: "Banner created successfully",
            error: false,
            success: true,
            banner: banner,
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function getBanners(req, res) {
    try {
        const banners = await BannerV1Model.find();
        
        if(!banners) {
            res.status(404).json({
                message: "No banners found",
                error: true,
                success: false
            });
        }

        return res.status(200).json({
            error: false,
            success: true,
            banners: banners,
        });


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function getBanner(req, res) {
    try {
        const banner = await BannerV1Model.findById(req.params.id);

        if(!banner) {
            res.status(500).json({
                message: "the banner with the given ID was not found.",
                success: false,
                error: true,
            });
        } 

        res.status(200).json({
            error: false,
            success: true,
            banner: banner,
        })


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function deleteBanner(req, res) {
    try {
        const banner = await BannerV1Model.findById(req.params.id);
        const images = banner.images;

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

        

        const deletedBanner = await BannerV1Model.findByIdAndDelete(req.params.id);

        if(!deletedBanner) {
            return res.status(400).json({
                message: "Banner not deleted",
                error: true,
                success: false
            })
        }

        res.status(200).json({
            message: "Banner deleted!",
            error: false,
            success: true
        });
        
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function updatedBanner(req, res) {
    try {
        const banner = await BannerV1Model.findByIdAndUpdate(
            req.params.id,
            {
                bannerTitle: req.body.bannerTitle,
                images: imagesArr.length > 0 ? imagesArr[0] : req.body.images,
                catId: req.body.catId,
                subCatId: req.body.subCatId,
                thirdsubCatId: req.body.thirdsubCatId,
                price: req.body.price,
                alignInfo: req.body.alignInfo,
            },
            { new: true }
        );

        if (!banner) {
            return res.status(400).json({
                message: "Banner not updated",
                error: true,
                success: false
            });
        }

        imagesArr = [];

        res.status(200).json({
            error: false,
            success: true,
            banner: banner,
        });


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}