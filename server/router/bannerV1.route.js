import { Router } from 'express';
import auth from '../middlewares/auth.js';
import upload from '../middlewares/multer.js';
import { addBanner, deleteBanner, getBanner, getBanners, updatedBanner, uploadImages } from '../controllers/bannerV1.controller.js';
import { removeImageFromCloudinary } from '../controllers/category.controller.js';

const bannerRouter = Router();

bannerRouter.post('/uploadImages', auth, upload.array('images'), uploadImages);
bannerRouter.post('/add', auth, addBanner);
bannerRouter.get('/', getBanners);
bannerRouter.get('/:id', getBanner);
bannerRouter.delete('/deleteImage', auth, removeImageFromCloudinary);
bannerRouter.delete('/:id', auth, deleteBanner);
bannerRouter.put('/:id', auth, updatedBanner)

export default bannerRouter;