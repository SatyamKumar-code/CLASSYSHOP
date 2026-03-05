import { Router } from 'express';
import auth from '../middlewares/auth.js';
import upload from '../middlewares/multer.js';
import { addBanner, deleteBanner, getBanner, getBanners, updatedBanner, uploadImages } from '../controllers/bannerV2.controller.js';


const bannerV2Router = Router();

bannerV2Router.post('/uploadImages', auth, upload.array('images'), uploadImages);
bannerV2Router.post('/add', auth, addBanner);
bannerV2Router.get('/', getBanners);
bannerV2Router.get('/:id', getBanner);
bannerV2Router.delete('/:id', auth, deleteBanner);
bannerV2Router.put('/:id', auth, updatedBanner)

export default bannerV2Router;