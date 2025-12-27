import ProductModel from '../models/product.model.js';

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


//create product
export async function createProduct( req, res) {
    try {
        let product = new ProductModel({
            name: req.body.name,
            description: req.body.description,
            images: imagesArr,
            brand: req.body.brand,
            price: req.body.price,
            oldPrice: req.body.oldPrice,
            catName: req.body.catName,
            catId: req.body.catId,
            subCatId: req.body.subCatId,
            subCat: req.body.subCat,
            thirdsubCat: req.body.thirdsubCat,
            thirdsubCatId: req.body.thirdsubCatId,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            isFeatured: req.body.isFeatured,
            discount: req.body.discount,
            productRam: req.body.productRam,
            size: req.body.size,
            productWeight: req.body.productWeight,
        })


        product = await product.save();
        
        if( !product ) {
            res.status(400).json({
                message: "Product not created",
                error: true,
                success: false
            })
        }

        imagesArr = [];

        return res.status(201).json({
            message: "Product created successfully",
            error: false,
            success: true,
            product: product
        })
 

    } catch (error) {
        return res.status(500).json({
            messsage: error.message || error,
            error: true,
            success: false
        })
    }
}

//get all products
export async function getAllProducts(req, res) {
    try {

        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage);
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);


        if(page > totalPages) {
            return res.status(404).json({
                message: "Page not found",
                success: false,
                error: true
            })
        }



        const products = await ProductModel.find().populate("category")
            .skip((page -1) * perPage)
            .limit(perPage)
            .exec();

        if(!products) {
            return res.status(404).json({
                error: true,
                success: false
            });
        }

        return res.status(200).json({
            error: false,
            success: true,
            products: products,
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

//get all products by category id
export async function getAllProductsByCatId(req, res) {
    try {

        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 1000;


        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);


        if(page > totalPages) {
            return res.status(404).json({
                message: "Page not found",
                success: false,
                error: true
            })
        }



        const products = await ProductModel.find({
            catId: req.params.id
        }).populate("category")
            .skip((page -1) * perPage)
            .limit(perPage)
            .exec();

        if(!products) {
            return res.status(404).json({
                error: true,
                success: false
            });
        }

        return res.status(200).json({
            error: false,
            success: true,
            products: products,
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

//get all products by category name
export async function getAllProductsByCatName(req, res) {
    try {

        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 1000;


        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);


        if(page > totalPages) {
            return res.status(404).json({
                message: "Page not found",
                success: false,
                error: true
            })
        }



        const products = await ProductModel.find({
            catName: req.query.catName
        }).populate("category")
            .skip((page -1) * perPage)
            .limit(perPage)
            .exec();

        if(!products) {
            return res.status(404).json({
                error: true,
                success: false
            });
        }

        return res.status(200).json({
            error: false,
            success: true,
            products: products,
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


//get all products by Sub category id
export async function getAllProductsBySubCatId(req, res) {
    try {

        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 1000;


        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);


        if(page > totalPages) {
            return res.status(404).json({
                message: "Page not found",
                success: false,
                error: true
            })
        }



        const products = await ProductModel.find({
            subCatId: req.params.id
        }).populate("category")
            .skip((page -1) * perPage)
            .limit(perPage)
            .exec();

        if(!products) {
            return res.status(404).json({
                error: true,
                success: false
            });
        }

        return res.status(200).json({
            error: false,
            success: true,
            products: products,
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

//get all products by Sub category name
export async function getAllProductsBySubCatName(req, res) {
    try {

        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 1000;


        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);


        if(page > totalPages) {
            return res.status(404).json({
                message: "Page not found",
                success: false,
                error: true
            })
        }



        const products = await ProductModel.find({
            subCatName: req.query.subCatName
        }).populate("category")
            .skip((page -1) * perPage)
            .limit(perPage)
            .exec();

        if(!products) {
            return res.status(404).json({
                error: true,
                success: false
            });
        }

        return res.status(200).json({
            error: false,
            success: true,
            products: products,
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



//get all products by ThirdLavel category id
export async function getAllProductsByThirdLavelCatId(req, res) {
    try {

        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 1000;


        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);


        if(page > totalPages) {
            return res.status(404).json({
                message: "Page not found",
                success: false,
                error: true
            })
        }



        const products = await ProductModel.find({
            thirdLavelCatId: req.params.id
        }).populate("category")
            .skip((page -1) * perPage)
            .limit(perPage)
            .exec();

        if(!products) {
            return res.status(404).json({
                error: true,
                success: false
            });
        }

        return res.status(200).json({
            error: false,
            success: true,
            products: products,
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

//get all products by ThirdLavel category Name
        export async function getAllProductsByThirdLavelCatName(req, res) {
            try {

        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 1000;


        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);


        if(page > totalPages) {
            return res.status(404).json({
                message: "Page not found",
                success: false,
                error: true
            })
        }



        const products = await ProductModel.find({
            thirdsubCat: req.query.thirdsubCat
        }).populate("category")
            .skip((page -1) * perPage)
            .limit(perPage)
            .exec();

        if(!products) {
            return res.status(404).json({
                error: true,
                success: false
            });
        }

        return res.status(200).json({
            error: false,
            success: true,
            products: products,
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

//get all products by price
export async function getAllProductsByPrice(req, res) {
    let productList = [];

    if (req.query.catId !== "" && req.query.catId !== undefined) {
        const productListArr = await ProductModel.find({
            catId: req.query.catId,
        }).populate("category");

        productList = productListArr;
    }

    if (req.query.subCatId !== "" && req.query.subCatId !== undefined) {
        const productListArr = await ProductModel.find({
            subCatId: req.query.subCatId,
        }).populate("category");

        productList = productListArr;
    }

    if (req.query.thirdsubCatId !== "" && req.query.thirdsubCatId !== undefined) {
        const productListArr = await ProductModel.find({
            thirdsubCatId: req.query.thirdsubCatId,
        }).populate("category");

        productList = productListArr;
    }

    const filteredProducts = productList.filter((product) => {
        if (req.query.minPrice && product.price < parseInt(+req.query.minPrice)) {
            return false;
        }
        if (req.query.maxPrice && product.price > parseInt(+req.query.maxPrice)) {
            return false;
        }
        return true;
    });

    return res.status(200).json({
        error: false,
        success: true,
        products: filteredProducts,
        totalPages: 0,
        page: 0,
    });
}



//get all products by Rating
        export async function getAllProductsByRating(req, res) {
            try {

        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 1000;


        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);


        if(page > totalPages) {
            return res.status(404).json({
                message: "Page not found",
                success: false,
                error: true
            })
        }


        let products = [];

        if (req.query.catId !== undefined) {
            products = await ProductModel.find({
                rating: req.query.rating,
                catId: req.query.catId,

            }).populate("category")
                .skip((page - 1) * perPage)
                .limit(perPage)
                .exec();
        }

        if (req.query.subCatId !== undefined) {
            products = await ProductModel.find({
                rating: req.query.rating,
                subCatId: req.query.subCatId,
                
            }).populate("category")
                .skip((page - 1) * perPage)
                .limit(perPage)
                .exec();
        }

        if (req.query.thirdsubCatId !== undefined) {
            products = await ProductModel.find({
                rating: req.query.rating,
                thirdsubCatId: req.query.thirdsubCatId,
                
            }).populate("category")
                .skip((page - 1) * perPage)
                .limit(perPage)
                .exec();
        }

        

        if(!products) {
            return res.status(404).json({
                error: true,
                success: false
            });
        }

        return res.status(200).json({
            error: false,
            success: true,
            products: products,
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