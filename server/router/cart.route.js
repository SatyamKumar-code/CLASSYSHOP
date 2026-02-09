import { Router } from 'express';
import auth from '../middlewares/auth.js';
import { addToCartItemController, deleteCartItemController, getCartItemController, updateCartItemQtyController } from '../controllers/cart.controller.js';

const cartRouter = Router();

cartRouter.post('/add', auth, addToCartItemController);
cartRouter.get('/get', auth, getCartItemController);
cartRouter.put('/update-qty', auth, updateCartItemQtyController);
cartRouter.delete('/delete-cart-item/:id', auth, deleteCartItemController);

export default cartRouter;