import { Router } from 'express';
import usersController from '../controllers/usersController.js';

const usersRouter = Router();

usersRouter.get('/', usersController.usersGet)

export default usersRouter;