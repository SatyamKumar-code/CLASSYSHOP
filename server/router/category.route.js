import { Router } from 'express';
import auth from '../middlewares/auth.js';
import upload from '../middlewares/multer.js';
import { createCategory, getCategories, getCategoriesCount, getSubCategoriesCount, uploadImages } from '../controllers/category.controller.js';

const categoryRouter = Router();

categoryRouter.post('/uploadImages', auth, upload.array('images'), uploadImages);
categoryRouter.post('/create', auth, createCategory);
categoryRouter.get('/', auth, getCategories);
categoryRouter.get('/get/count', auth, getCategoriesCount);
categoryRouter.get('/get/count/subCat', auth, getSubCategoriesCount);


export default categoryRouter;  