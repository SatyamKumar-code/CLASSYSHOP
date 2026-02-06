import BlogModel from '../models/blog.models.js';

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

export async function addBlog(req, res) {
    try {
        let blog = new BlogModel({
            title: req.body.title,
            images: imagesArr,
            description: req.body.description,
        });
        if( !blog ) {
            return res.status(400).json({
                message: "Blog not added",
                error: true,
                success: false
            })
        }

        blog = await blog.save();

        imagesArr = [];

        return res.status(201).json({
            message: "Blog added successfully",
            error: false,
            success: true,
            blog,
        })

    } catch (error) {
        return res.status(500).json({
            messsage: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function getBlogs(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage);
        const totalPosts = await BlogModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);


        if(page > totalPages) {
            return res.status(404).json({
                message: "Page not found",
                success: false,
                error: true
            })
        }



        const blogs = await BlogModel.find()
            .skip((page -1) * perPage)
            .limit(perPage)
            .exec();

        if(!blogs || blogs.length === 0) {
            return res.status(404).json({
                error: true,
                success: false
            });
        }

        return res.status(200).json({
            error: false,
            success: true,
            blogs: blogs,
            totalPages: totalPages,
            page: page,
        });

    } catch (error) {
        return res.status(500).json({
            messsage: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function getBlog(req, res) {
    try {
        const blog = await BlogModel.findById(req.params.id);

        if(!blog) {
            res.status(500).json({
                message: "the blog with the given ID was not found.",
                success: false,
                error: true,
            });
        } 

        res.status(200).json({
            error: false,
            success: true,
            blog: blog,
        })


    } catch (error) {
        return res.status(500).json({
            messsage: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function deleteBlog(req, res) {
    try {
        const blog = await BlogModel.findById(req.params.id);
        const images = blog.images;

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

       

        const deletedBlog = await BlogModel.findByIdAndDelete(req.params.id);

        if(!deletedBlog) {
            return res.status(400).json({
                message: "Blog not deleted",
                error: true,
                success: false
            })
        }

        res.status(200).json({
            message: "Blog deleted!",
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

export async function updatedBlog(req, res) {
    try {
        const blog = await BlogModel.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                images: imagesArr.length > 0 ? imagesArr[0] : req.body.images,
                description: req.body.description,
            },
            { new: true }
        );

        if (!blog) {
            return res.status(400).json({
                message: "Blog not updated",
                error: true,
                success: false
            });
        }

        imagesArr = [];

        res.status(200).json({
            error: false,
            success: true,
            blog: blog,
        });


    } catch (error) {
        return res.status(500).json({
            messsage: error.message || error,
            error: true,
            success: false
        });
    }
}