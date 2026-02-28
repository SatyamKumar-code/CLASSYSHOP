import { Router } from 'express';
import auth from '../middlewares/auth.js';
import { captureOrderPayPalController, createOrderController, createOrderPayPalController, getAllOrderDetailsController, getOrderDetailsController, getTotalOrdersCountController, totalSalesController, totalUsersController, updateOrderStatusController } from '../controllers/order.controller.js';

const orderRouter = Router();

orderRouter.post('/create', auth, createOrderController);
orderRouter.get('/order-list', auth, getOrderDetailsController);
orderRouter.get('/order-lists', auth, getAllOrderDetailsController);
orderRouter.get('/create-order-paypal', auth, createOrderPayPalController);
orderRouter.post('/capture-order-paypal', auth, captureOrderPayPalController);
orderRouter.put('/order-status/:id', auth, updateOrderStatusController);
orderRouter.get('/count', auth, getTotalOrdersCountController);
orderRouter.get('/sales', auth, totalSalesController);
orderRouter.get('/users', auth, totalUsersController);

export default orderRouter;