import { Router } from "express";
import auth from '../middlewares/auth.js';
import { AddAddressesController, deleteAddressController, editAddressController, getAddressesController, getSingleAddressController } from "../controllers/address.controller.js";

const addressRouter = Router();

addressRouter.post('/add', auth, AddAddressesController);
addressRouter.get('/get', auth, getAddressesController);
addressRouter.get('/:id', auth, getSingleAddressController);
addressRouter.delete('/:id', auth, deleteAddressController);
addressRouter.put('/:id', auth, editAddressController);

export default addressRouter;