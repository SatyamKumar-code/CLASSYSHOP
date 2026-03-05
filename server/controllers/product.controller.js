import ProductModel from '../models/product.model.js';
import ProductRAMSModel from '../models/productRAMS.js';
import productWEIGHTModel from '../models/productWEIGHT.js';
import productSIZESModel from '../models/productSIZE.js';

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
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// upload banner images
var bannerImages = [];
export async function uploadBannerImages(req, res) {
    try {
        bannerImages = [];

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
                    bannerImages.push(result.secure_url);
                    fs.unlinkSync(`uploads/${req.files[i].filename}`);
                }
            );
        }


        return res.status(200).json({
            images: bannerImages,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
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
            bannerImage: bannerImages,
            isDisplayOnHomeBanner: req.body.isDisplayOnHomeBanner,
            brand: req.body.brand,
            price: req.body.price,
            oldPrice: req.body.oldPrice,
            catName: req.body.catName,
            category: req.body.category,
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
            message: error.message || error,
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



        const products = await ProductModel.aggregate([
            { $sample: { size: perPage || 20 } },
        ]);

        const populatedProducts = await ProductModel.populate(products, { path: "category" });

        if(!populatedProducts) {
            return res.status(404).json({
                error: true,
                success: false
            });
        }

        return res.status(200).json({
            error: false,
            success: true,
            products: populatedProducts,
            totalPages: totalPages,
            page: page,
        });


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
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



        const products = await ProductModel.aggregate([
            { $match: { catId: req.params.id } },
            { $sample: { size: perPage } },
        ]);

        const populatedProducts = await ProductModel.populate(products, { path: "category" });

        if(!populatedProducts) {
            return res.status(404).json({
                error: true,
                success: false
            });
        }

        return res.status(200).json({
            error: false,
            success: true,
            products: populatedProducts,
            totalPages: totalPages,
            page: page,
        });


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
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



        const products = await ProductModel.aggregate([
            { $match: { catName: req.query.catName } },
            { $sample: { size: perPage } },
        ]);

        const populatedProducts = await ProductModel.populate(products, { path: "category" });

        if(!populatedProducts) {
            return res.status(404).json({
                error: true,
                success: false
            });
        }

        return res.status(200).json({
            error: false,
            success: true,
            products: populatedProducts,
            totalPages: totalPages,
            page: page,
        });


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
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



        const products = await ProductModel.aggregate([
            { $match: { subCatId: req.params.id } },
            { $sample: { size: perPage } },
        ]);

        const populatedProducts = await ProductModel.populate(products, { path: "category" });

        if(!populatedProducts) {
            return res.status(404).json({
                error: true,
                success: false
            });
        }

        return res.status(200).json({
            error: false,
            success: true,
            products: populatedProducts,
            totalPages: totalPages,
            page: page,
        });


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
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



        const products = await ProductModel.aggregate([
            { $match: { subCatName: req.query.subCatName } },
            { $sample: { size: perPage } },
        ]);

        const populatedProducts = await ProductModel.populate(products, { path: "category" });

        if(!populatedProducts) {
            return res.status(404).json({
                error: true,
                success: false
            });
        }

        return res.status(200).json({
            error: false,
            success: true,
            products: populatedProducts,
            totalPages: totalPages,
            page: page,
        });


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
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



        const products = await ProductModel.aggregate([
            { $match: { thirdsubCatId: req.params.id } },
            { $sample: { size: perPage } },
        ]);

        const populatedProducts = await ProductModel.populate(products, { path: "category" });

        if(!populatedProducts) {
            return res.status(404).json({
                error: true,
                success: false
            });
        }

        return res.status(200).json({
            error: false,
            success: true,
            products: populatedProducts,
            totalPages: totalPages,
            page: page,
        });


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
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



        const products = await ProductModel.aggregate([
            { $match: { thirdsubCat: req.query.thirdsubCat } },
            { $sample: { size: perPage } },
        ]);

        const populatedProducts = await ProductModel.populate(products, { path: "category" });

        if(!populatedProducts) {
            return res.status(404).json({
                error: true,
                success: false
            });
        }

        return res.status(200).json({
            error: false,
            success: true,
            products: populatedProducts,
            totalPages: totalPages,
            page: page,
        });


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//get all products by price
export async function getAllProductsByPrice(req, res) {
    let productList = [];

    if (req.query.catId !== "" && req.query.catId !== undefined) {
        const productListArr = await ProductModel.aggregate([
            { $match: { catId: req.query.catId } },
            { $sample: { size: 1000 } },
        ]);
        productList = await ProductModel.populate(productListArr, { path: "category" });
    }

    if (req.query.subCatId !== "" && req.query.subCatId !== undefined) {
        const productListArr = await ProductModel.aggregate([
            { $match: { subCatId: req.query.subCatId } },
            { $sample: { size: 1000 } },
        ]);
        productList = await ProductModel.populate(productListArr, { path: "category" });
    }

    if (req.query.thirdsubCatId !== "" && req.query.thirdsubCatId !== undefined) {
        const productListArr = await ProductModel.aggregate([
            { $match: { thirdsubCatId: req.query.thirdsubCatId } },
            { $sample: { size: 1000 } },
        ]);
        productList = await ProductModel.populate(productListArr, { path: "category" });
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
            const result = await ProductModel.aggregate([
                { $match: { rating: parseInt(req.query.rating), catId: req.query.catId } },
                { $sample: { size: perPage } },
            ]);
            products = await ProductModel.populate(result, { path: "category" });
        }

        if (req.query.subCatId !== undefined) {
            const result = await ProductModel.aggregate([
                { $match: { rating: parseInt(req.query.rating), subCatId: req.query.subCatId } },
                { $sample: { size: perPage } },
            ]);
            products = await ProductModel.populate(result, { path: "category" });
        }

        if (req.query.thirdsubCatId !== undefined) {
            const result = await ProductModel.aggregate([
                { $match: { rating: parseInt(req.query.rating), thirdsubCatId: req.query.thirdsubCatId } },
                { $sample: { size: perPage } },
            ]);
            products = await ProductModel.populate(result, { path: "category" });
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

//get all products count 
export async function getProductsCount(req, res ) {
    try {
        const productCount = await ProductModel.countDocuments();

        if(!productCount) {
            return res.status(404).json({
                message: "No products found",
                error: true,
                success: false
            });
        }

        return res.status(200).json({
            error: false,
            success: true,
            productCount: productCount
        })


    } catch (error) {
        return res.status(500).json({
            messsage: error.message || error,
            error: true,
            success: false
        })
    }
}

//get all featured products
export async function getAllFeaturedProducts(req, res) {
    try {

        const products = await ProductModel.aggregate([
            { $match: { isFeatured: true } },
            { $sample: { size: 20 } },
        ]);

        const populatedProducts = await ProductModel.populate(products, { path: "category" });

        if (!populatedProducts) {
            return res.status(404).json({
                error: true,
                success: false
            });
        }

        return res.status(200).json({
            error: false,
            success: true,
            products: populatedProducts,
        });


    } catch (error) {
        return res.status(500).json({
            messsage: error.message || error,
            error: true,
            success: false
        })
    }
}

// delete product
export async function deleteProduct(req, res) {
    const product = await ProductModel.findById(req.params.id).populate("category");

    if (!product) {
        return res.status(404).json({
            message: "Product not found",
            error: true,
            success: false
        });
    }

    const images = product.images;

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

    const deletedProduct = await ProductModel.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
        return res.status(400).json({
            message: "Product not deleted! ",
            error: true,
            success: false
        });
    }

    return res.status(200).json({
        message: "Product deleted!",
        error: false,
        success: true
    });
}

//get single product by id
export async function getProduct(req, res) {
    try {
        const product = await ProductModel.findById(req.params.id).populate("category");

        if(!product) {
            return res.status(404).json({
                message: "Product not found",
                error: true,
                success: false
            });
        }
        return res.status(200).json({
            error: false,
            success: true,
            product: product
        });


    } catch (error) {
        return res.status(500).json({
            messsage: error.message || error,
            error: true,
            success: false
        })
    }
}

//remove image from cloudinary
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

// delete multiple products
export async function deleteMultipleProduct(req, res) {
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
            const product = await ProductModel.findById(ids[i]);

            const images = product.images;
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
            await ProductModel.deleteMany({ _id: { $in: ids }});

            return res.status(200).json({
                message: "Products deleted successfully",
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

// Update Product
export async function updateProduct(req, res) {
    try {
        const product = await ProductModel.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                subCat: req.body.subCat,
                description: req.body.description,
                images: req.body.images,
                bannerImage: req.body.bannerImage,
                bannerTitlename: req.body.bannerTitlename,
                isDisplayOnHomeBanner: req.body.isDisplayOnHomeBanner,
                brand: req.body.brand,
                price: req.body.price,
                oldPrice: req.body.oldPrice,
                catId: req.body.catId,
                catName: req.body.catName,
                subCat: req.body.subCat,
                subCatId: req.body.subCatId,
                category: req.body.category,
                thirdsubCat: req.body.thirdsubCat,
                thirdsubCatId: req.body.thirdsubCatId,
                countInStock: req.body.countInStock,
                rating: req.body.rating,
                isFeatured: req.body.isFeatured,
                discount: req.body.discount,
                productRam: req.body.productRam,
                size: req.body.size,
                productWeight: req.body.productWeight,
            },
            { new: true }
        )

        if (!product) {
            return res.status(400).json({
                message: "Product not updated",
                error: true,
                success: false
            });
        }

        imagesArr = [];

        return res.status(200).json({
            message: "Product updated",
            error: false,
            success: true,
        });

    } catch (error) {
        return res.status(500).json({
            messsage: error.message || error,
            error: true,
            success: false
        })
    }
}
// // Product RAMS Controllers
export async function createProductRAMS(req, res) {
    try {
        let productRAMS = new ProductRAMSModel({
            Ram: req.body.Ram,
        })

        productRAMS = await productRAMS.save();
        
        if( !productRAMS ) {
            res.status(400).json({
                message: "Product RAMS not created",
                error: true,
                success: false
            })
        }

        return res.status(201).json({
            message: "Product RAMS created successfully",
            error: false,
            success: true,
            product: productRAMS
        })


    } catch (error) {
        return res.status(500).json({
            messsage: error.message || error,
            error: true,
            success: false
        })
    }
}

// delete productRAMS
export async function deleteProductRAMS(req, res) {
    const productRams = await ProductRAMSModel.findById(req.params.id);

    if (!productRams) {
        return res.status(404).json({
            message: "Item not found",
            error: true,
            success: false
        });
    }


    const deletedProductRams = await ProductRAMSModel.findByIdAndDelete(req.params.id);

    if (!deletedProductRams) {
        return res.status(400).json({
            message: "Product RAMS not deleted! ",
            error: true,
            success: false
        });
    }

    return res.status(200).json({
        message: "Product RAMS deleted!",
        error: false,
        success: true
    });
}


// Update Product RAMS
export async function updateProductRam(req, res) {
    try {
        const productRam = await ProductRAMSModel.findByIdAndUpdate(
            req.params.id,
            {
                Ram: req.body.Ram,
                
            },
            { new: true }
        )

        if (!productRam) {
            return res.status(400).json({
                message: "Product RAMS not updated",
                error: true,
                success: false
            });
        }

        return res.status(200).json({
            message: "Product RAM is updated",
            error: false,
            success: true,
        });

    } catch (error) {
        return res.status(500).json({
            messsage: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function getProductRam(req, res) {
    try {
        const productRam = await ProductRAMSModel.find();

        if(!productRam) {
            return res.status(404).json({
                error: true,
                success: false
            })
        }

        return res.status(200).json({
            error: false,
            success: true,
            data: productRam
        })

    } catch (error) {
        return res.status(500).json({
            messsage: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function getProductRamById(req, res) {
    try {
        const productRam = await ProductRAMSModel.findById(req.params.id);

        if(!productRam) {
            return res.status(404).json({
                error: true,
                success: false
            })
        }

        return res.status(200).json({
            error: false,
            success: true,
            data: productRam
        })

    } catch (error) {
        return res.status(500).json({
            messsage: error.message || error,
            error: true,
            success: false
        })
    }
}





// // Product WEIGHT Controllers
export async function createProductWEIGHT(req, res) {
    try {
        let productWEIGHT = new productWEIGHTModel({
            weight: req.body.weight,
        })

        productWEIGHT = await productWEIGHT.save();
        
        if( !productWEIGHT ) {
            res.status(400).json({
                message: "Product WEIGHT not created",
                error: true,
                success: false
            })
        }

        return res.status(201).json({
            message: "Product WEIGHT created successfully",
            error: false,
            success: true,
            product: productWEIGHT
        })


    } catch (error) {
        return res.status(500).json({
            messsage: error.message || error,
            error: true,
            success: false
        })
    }
}

// delete productWEIGHT
export async function deleteProductWEIGHT(req, res) {
    const productWeight = await productWEIGHTModel.findById(req.params.id);

    if (!productWeight) {
        return res.status(404).json({
            message: "Item not found",
            error: true,
            success: false
        });
    }


    const deletedProductWeight = await productWEIGHTModel.findByIdAndDelete(req.params.id);

    if (!deletedProductWeight) {
        return res.status(400).json({
            message: "Product WEIGHT not deleted! ",
            error: true,
            success: false
        });
    }

    return res.status(200).json({
        message: "Product WEIGHT deleted!",
        error: false,
        success: true
    });
}


// Update Product WEIGHT
export async function updateProductWEIGHT(req, res) {
    try {
        const productWEIGHT = await productWEIGHTModel.findByIdAndUpdate(
            req.params.id,
            {
                weight: req.body.weight,
                
            },
            { new: true }
        )

        if (!productWEIGHT) {
            return res.status(400).json({
                message: "Product WEIGHT not updated",
                error: true,
                success: false
            });
        }

        return res.status(200).json({
            message: "Product WEIGHT is updated",
            error: false,
            success: true,
        });

    } catch (error) {
        return res.status(500).json({
            messsage: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function getProductWeight(req, res) {
    try {
        const productWeight = await productWEIGHTModel.find();

        if(!productWeight) {
            return res.status(404).json({
                error: true,
                success: false
            })
        }

        return res.status(200).json({
            error: false,
            success: true,
            data: productWeight
        })

    } catch (error) {
        return res.status(500).json({
            messsage: error.message || error,
            error: true,
            success: false
        })
    }
}

// get single productWEIGHT by id
export async function getProductWeightById(req, res) {
    try {
        const productWeight = await productWEIGHTModel.findById(req.params.id);

        if(!productWeight) {
            return res.status(404).json({
                error: true,
                success: false
            })
        }

        return res.status(200).json({
            error: false,
            success: true,
            data: productWeight
        })

    } catch (error) {
        return res.status(500).json({
            messsage: error.message || error,
            error: true,
            success: false
        })
    }
}

// Product SIZE Controllers
export async function createProductSIZE(req, res) {
    try {
        let productSIZE = new productSIZESModel({
            size: req.body.size,
        })

        productSIZE = await productSIZE.save();
        
        if( !productSIZE ) {
            res.status(400).json({
                message: "Product SIZE not created",
                error: true,
                success: false
            })
        }

        return res.status(201).json({
            message: "Product SIZE created successfully",
            error: false,
            success: true,
            product: productSIZE
        })


    } catch (error) {
        return res.status(500).json({
            messsage: error.message || error,
            error: true,
            success: false
        })
    }
}

// delete productSIZE
export async function deleteProductSIZE(req, res) {
    const productSize = await productSIZESModel.findById(req.params.id);

    if (!productSize) {
        return res.status(404).json({
            message: "Item not found",
            error: true,
            success: false
        });
    }


    const deletedProductSize = await productSIZESModel.findByIdAndDelete(req.params.id);

    if (!deletedProductSize) {
        return res.status(400).json({
            message: "Product SIZE not deleted! ",
            error: true,
            success: false
        });
    }

    return res.status(200).json({
        message: "Product SIZE deleted!",
        error: false,
        success: true
    });
}


// Update Product Size
export async function updateProductSIZE(req, res) {
    try {
        const productSIZE = await productSIZESModel.findByIdAndUpdate(
            req.params.id,
            {
                size: req.body.size,
                
            },
            { new: true }
        )

        if (!productSIZE) {
            return res.status(400).json({
                message: "Product SIZE not updated",
                error: true,
                success: false
            });
        }

        return res.status(200).json({
            message: "Product SIZE is updated",
            error: false,
            success: true,
        });

    } catch (error) {
        return res.status(500).json({
            messsage: error.message || error,
            error: true,
            success: false
        })
    }
}

// get all productSIZE
export async function getProductSize(req, res) {
    try {
        const productSize = await productSIZESModel.find();

        if(!productSize) {
            return res.status(404).json({
                error: true,
                success: false
            })
        }

        return res.status(200).json({
            error: false,
            success: true,
            data: productSize
        })

    } catch (error) {
        return res.status(500).json({
            messsage: error.message || error,
            error: true,
            success: false
        })
    }
}

// get single productSIZE by id
export async function getProductSizeById(req, res) {
    try {
        const productSize = await productSIZESModel.findById(req.params.id);

        if(!productSize) {
            return res.status(404).json({
                error: true,
                success: false
            })
        }

        return res.status(200).json({
            error: false,
            success: true,
            data: productSize
        })

    } catch (error) {
        return res.status(500).json({
            messsage: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function filters(req, res) {
    const { catId, subCatId, thirdsubCatId, minPrice, maxPrice, rating, page, limit } = req.body;

    const filter = {};

    if(catId?.length) {
        filter.catId = { $in: catId };
    }
    if(subCatId?.length) {
        filter.subCatId = { $in: subCatId };
    }
    if(thirdsubCatId?.length) {
        filter.thirdsubCatId = { $in: thirdsubCatId };
    }
    if(minPrice || maxPrice) {
        filter.price = {$gte: +minPrice || 0, $lte: +maxPrice || Infinity};
    }

    if(rating?.length) {
        filter.rating = { $in: rating };
    }

    try {

        const result = await ProductModel.aggregate([
            { $match: filter },
            { $sample: { size: parseInt(limit) || 20 } },
        ]);
        const products = await ProductModel.populate(result, { path: "category" });

        const total = await ProductModel.countDocuments(filter);

        return res.status(200).json({
            error: false,
            success: true,
            products: products,
            total: total,
            page: parseInt(page),
            totalPages: Math.ceil(total / limit)
        })

    } catch (error) {
        return res.status(500).json({
            messsage: error.message || error,
            error: true,
            success: false
        })
    }

}

const sortItems = (products, sortBy, order) => {
    return products.sort((a, b) => {
        if(sortBy === 'name') {
            return order === 'asc' 
                ? a.name.localeCompare(b.name) 
                : b.name.localeCompare(a.name);
        }
        if(sortBy === 'price') {
            return order === 'asc' ? a.price - b.price : b.price - a.price;
        }

        return 0;
    })
}

export async function sortBy(req, res) {
    const { products, sortBy, order } = req.body;
    const sortedItems = sortItems([...products?.products], sortBy, order);

    return res.status(200).json({
        error: false,
        success: true,
        products: sortedItems,
        page: 0,
        totalPages: 0
    })
}

export async function searchProductsController(req, res) {
    try {
        const { query, page = 1, limit = 10 } = req.body;

        if (!query) {
            return res.status(400).json({
                message: "Query is required",
                error: true,
                success: false
            });
        }

        const products = await ProductModel.find(
            { $text: { $search: query } },
            { score: { $meta: "textScore" } } // relevance score
        )
        .sort({ score: { $meta: "textScore" } }) // best match first
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .populate("category")
        .lean();

        const total = await ProductModel.countDocuments({
            $text: { $search: query }
        });

        if (!products.length) {
            return res.status(404).json({
                message: "No products found",
                error: true,
                success: false
            });
        }

        return res.status(200).json({
            error: false,
            success: true,
            products: products,
            total: total,
            page: parseInt(page),
            totalPages: Math.ceil(total / limit)
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export const getAllProductsBanner = async (req, res) => {
    try {
        const banners = await ProductModel.aggregate([
            { $match: { isDisplayOnHomeBanner: true } },
            { $project: { bannerImage: 1, _id: 1 } },
            { $sample: { size: 100 } },
        ]);
        if(!banners) {
            return res.json({
                message: "No banners found",
                success: false,
                error: true
            })
        }
        return res.status(200).json({
            success: true,
            error: false,
            banners: banners
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const getAllFashionProducts = async (req, res) => {
    try {
        const category = req.query.category;
        const result = await ProductModel.aggregate([
            { $match: { catName: category } },
            { $sample: { size: 50 } },
        ]);
        const faishionProducts = await ProductModel.populate(result, { path: "category" });
        if(!faishionProducts) {
            return res.json({
                message: "No fashion products found",
                success: false,
                error: true
            })
        }

        return res.status(200).json({
            success: true,
            error: false,
            products: faishionProducts
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}


// Get random category sections with products for home page
export const getRandomCategorySections = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 6; // number of sections to show

        // Get all distinct catName, subCat, thirdsubCat from products
        const [catNames, subCats, thirdSubCats] = await Promise.all([
            ProductModel.distinct("catName", { catName: { $ne: "", $ne: null } }),
            ProductModel.distinct("subCat", { subCat: { $ne: "", $ne: null } }),
            ProductModel.distinct("thirdsubCat", { thirdsubCat: { $ne: "", $ne: null } }),
        ]);

        // Build all possible sections with type info
        let allSections = [];

        catNames.forEach((name) => {
            if (name && name.trim() !== "") {
                allSections.push({ name, type: "catName", field: "catName" });
            }
        });

        subCats.forEach((name) => {
            if (name && name.trim() !== "") {
                allSections.push({ name, type: "subCat", field: "subCat" });
            }
        });

        thirdSubCats.forEach((name) => {
            if (name && name.trim() !== "") {
                allSections.push({ name, type: "thirdsubCat", field: "thirdsubCat" });
            }
        });

        // Shuffle array randomly (Fisher-Yates)
        for (let i = allSections.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allSections[i], allSections[j]] = [allSections[j], allSections[i]];
        }

        // Pick limited sections
        const selectedSections = allSections.slice(0, limit);

        // Fetch products randomly for each selected section using $sample
        const sectionsWithProducts = await Promise.all(
            selectedSections.map(async (section) => {
                const products = await ProductModel.aggregate([
                    { $match: { [section.field]: section.name } },
                    { $sample: { size: 15 } },
                ]);

                // Populate category field after aggregation
                const populatedProducts = await ProductModel.populate(products, { path: "category" });

                return {
                    sectionName: section.name,
                    type: section.type,
                    products: populatedProducts,
                };
            })
        );

        // Filter out sections with no products
        const finalSections = sectionsWithProducts.filter(
            (s) => s.products && s.products.length > 0
        );

        return res.status(200).json({
            error: false,
            success: true,
            sections: finalSections,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}