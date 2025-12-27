import { Router } from 'express';
import auth from '../middlewares/auth.js';
import { addToMyListController, deleteToMyListController, getMyListController } from '../controllers/mylist.controller.js';

const mylistRouter = Router();

mylistRouter.post('/add', auth, addToMyListController);
mylistRouter.get('/', auth, getMyListController);
mylistRouter.delete('/:id', auth, deleteToMyListController);

export default mylistRouter;