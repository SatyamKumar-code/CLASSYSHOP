import { Router } from 'express';
import auth from '../middlewares/auth.js';
import upload from "../middlewares/multer.js";
import { createProduct, getAllProducts, getAllProductsByCatId, getAllProductsByCatName, uploadImages } from '../controllers/product.controller.js';

const productRouter = Router();
productRouter.post('/uploadImages', auth, upload.array('images'), uploadImages)
productRouter.post('/create', auth, createProduct)
productRouter.get('/getAllProducts', getAllProducts);
productRouter.get('/getAllProductsByCatId/:id', getAllProductsByCatId);
productRouter.get('/getAllProductsByCatName', getAllProductsByCatName);


export default productRouter;