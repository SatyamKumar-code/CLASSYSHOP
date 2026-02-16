import { Router } from 'express';
import auth from '../middlewares/auth.js';
import { addToCartItemController, deleteCartItemController, emptyCartController, getCartItemController, updateCartItemQtyController } from '../controllers/cart.controller.js';

const cartRouter = Router();

cartRouter.post('/add', auth, addToCartItemController);
cartRouter.get('/get', auth, getCartItemController);
cartRouter.put('/update-qty', auth, updateCartItemQtyController);
cartRouter.delete('/delete-cart-item/:id', auth, deleteCartItemController);
cartRouter.delete('/emptyCart/:id', auth, emptyCartController);

export default cartRouter;