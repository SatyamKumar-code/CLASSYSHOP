import { Router } from 'express';
import auth from '../middlewares/auth.js';
import upload from "../middlewares/multer.js";
import { createProduct, getAllProducts, getAllProductsByPrice, getAllProductsByCatId, getAllProductsByCatName, getAllProductsBySubCatId, getAllProductsBySubCatName, getAllProductsByThirdLavelCatId, getAllProductsByThirdLavelCatName, uploadImages, getAllProductsByRating, getProductsCount, getAllFeaturedProducts, deleteProduct, getProduct, removeImageFromCloudinary, updateProduct, deleteMultipleProduct, createProductRAMS, deleteProductRAMS, deleteMultipleProductRams, updateProductRam, getProductRam, getProductRamById } from '../controllers/product.controller.js';

const productRouter = Router();
productRouter.post('/uploadImages', auth, upload.array('images'), uploadImages)
productRouter.post('/create', auth, createProduct)
productRouter.get('/getAllProducts', getAllProducts);
productRouter.get('/getAllProductsByCatId/:id', getAllProductsByCatId);
productRouter.get('/getAllProductsByCatName', getAllProductsByCatName);
productRouter.get('/getAllProductsBySubCatId/:id', getAllProductsBySubCatId);
productRouter.get('/getAllProductsBySubCatName', getAllProductsBySubCatName);
productRouter.get('/getAllProductsByThirdLavelCat/:id', getAllProductsByThirdLavelCatId);
productRouter.get('/getAllProductsByThirdLavelCatName', getAllProductsByThirdLavelCatName);
productRouter.get('/getAllProductsByPrice', getAllProductsByPrice);
productRouter.get('/getAllProductsByRating', getAllProductsByRating);
productRouter.get('/getAllProductsCount', getProductsCount);
productRouter.get('/getAllFeaturedProducts', getAllFeaturedProducts);
productRouter.delete('/deleteMultiple', deleteMultipleProduct);
productRouter.delete('/deleteImage', auth, removeImageFromCloudinary);
productRouter.delete('/:id',auth, deleteProduct);
productRouter.get('/:id', getProduct);
productRouter.put('/updateProduct/:id', auth, updateProduct);
productRouter.post('/productRAMS/create', auth, createProductRAMS)
productRouter.delete('/productRAMS/:id', auth, deleteProductRAMS);
productRouter.put('/productRAMS/:id', auth, updateProductRam);
productRouter.delete('/productRAMS/deleteMultipleRams', auth, deleteMultipleProductRams);
productRouter.get('/productRAMS/get', getProductRam);
productRouter.get('/productRAMS/:id', getProductRamById)


export default productRouter;