import { Router } from "express";
import auth from '../middlewares/auth.js';
import { AddAddressesController, deleteAddressController, getAddressesController } from "../controllers/address.controller.js";

const addressRouter = Router();

addressRouter.post('/add', auth, AddAddressesController);
addressRouter.get('/get', auth, getAddressesController);
addressRouter.delete('/:id', auth, deleteAddressController);

export default addressRouter;