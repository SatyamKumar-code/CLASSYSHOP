import HomeSliderModel from "../models/homeSlider.model.js";

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

export async function addHomeSlide(req, res) {
    try {
        let slide = new HomeSliderModel({
            images: imagesArr,
        })

        if( !slide ) {
            return res.status(400).json({
                message: "Slide not created",
                error: true,
                success: false
            })
        }

        slide = await slide.save();

        imagesArr = [];

        return res.status(201).json({
            message: "Slide created successfully",
            error: false,
            success: true,
            slide,
        })

    } catch (error) {
        return res.status(500).json({
            messsage: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function getHomeSlides(req, res) {
    try {
        const slides = await HomeSliderModel.find().sort({ createdAt: -1 });

        if( !slides ) {
            return res.status(404).json({
                message: "No slides found",
                error: true,
                success: false
            })
        }

        return res.status(200).json({
            error: false,
            success: true,
            data:slides,
        });



    } catch (error) {
        return res.status(500).json({
            messsage: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function getSlide(req, res) {
    try {
        const slide = await HomeSliderModel.findById(req.params.id);

        if(!slide) {
            res.status(500).json({
                message: "the slide with the given ID was not found.",
                success: false,
                error: true,
            });
        } 

        res.status(200).json({
            error: false,
            success: true,
            slide: slide,
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
                return response.status(200).json({
                    error: false,
                    success: true,
                    message: "Image deleted successfully"
                })
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

export async function deleteSlide(req, res) {
    try {
        const slide = await HomeSliderModel.findById(req.params.id);
        const images = slide.images;

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

        const deletedSlide = await HomeSliderModel.findByIdAndDelete(req.params.id);

        if(!deletedSlide) {
            return res.status(400).json({
                message: "Slide not deleted",
                error: true,
                success: false
            })
        }

        return res.status(200).json({
            message: "Slide deleted!",
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

export async function updatedSlide(req, res) {
    try {
        const slide = await HomeSliderModel.findByIdAndUpdate(
            req.params.id,
            {
                images: imagesArr.length > 0 ? imagesArr[0] : req.body.images,
            },
            { new: true }
        );

        if (!slide) {
            return res.status(400).json({
                message: "Slide not updated",
                error: true,
                success: false
            });
        }

        imagesArr = [];

        res.status(200).json({
            error: false,
            success: true,
            slide: slide,
            message: "Slide updated successfully"
        });


    } catch (error) {
        return res.status(500).json({
            messsage: error.message || error,
            error: true,
            success: false
        });
    }
}

// delete multiple Slides
export async function deleteMultipleSlides(req, res) {
    try {
        const { ids } = req.body; // Array of product IDs to be deleted

        if(!ids || !Array.isArray(ids)) {
            return res.status(400).json({
                error: true,
                success: false,
                message: "Invalid Input"
            })
        }

        for (let i=0; i<ids?.length; i++) {
            const slide = await HomeSliderModel.findById(ids[i]);

            const images = slide.images;
            let img="";

            for (img of images) {
                const imgUrl = img;
                const urlArr = imgUrl.split("/");
                const image = urlArr[urlArr.length - 1];

                const imageName = image.split(".")[0];

                if ( imageName ) {
                    cloudinary.uploader.destroy(imageName, (error, result) => {
                        //console.log(result, error);
                    });
                }
            }
        }

        try {
            await HomeSliderModel.deleteMany({ _id: { $in: ids }});

            return res.status(200).json({
                message: "Slides deleted successfully",
                error: false,
                success: true
            })

        } catch (error) {
            return res.status(500).json({
                messsage: error.message || error,
                error: true,
                success: false
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