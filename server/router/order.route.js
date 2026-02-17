import { Router } from 'express';
import auth from '../middlewares/auth.js';
import { captureOrderPayPalController, createOrderController, createOrderPayPalController, getOrderDetailsController } from '../controllers/order.controller.js';

const orderRouter = Router();

orderRouter.post('/create', auth, createOrderController);
orderRouter.get('/order-list', auth, getOrderDetailsController);
orderRouter.get('/create-order-paypal', auth, createOrderPayPalController);
orderRouter.post('/capture-order-paypal', auth, captureOrderPayPalController);

export default orderRouter;