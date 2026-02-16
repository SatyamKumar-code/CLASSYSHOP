import { Router } from 'express';
import auth from '../middlewares/auth.js';
import { createOrderController, getOrderDetailsController } from '../controllers/order.controller.js';

const orderRouter = Router();

orderRouter.post('/create', auth, createOrderController);
orderRouter.get('/order-list', auth, getOrderDetailsController);

export default orderRouter;