import { Router } from "express";
import auth from '../middlewares/auth.js';
import { AddAddressesController } from "../controllers/address.controller.js";

const addressRouter = Router();

addressRouter.post('/add', auth, AddAddressesController);

export default addressRouter;