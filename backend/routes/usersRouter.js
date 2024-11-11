import { Router } from 'express';
import usersController from '../controllers/usersController.js';

const usersRouter = Router();

usersRouter.get('/', usersController.usersGet);
usersRouter.get('/:userId', usersController.userGet);
usersRouter.delete('/:userId', usersController.userDelete);

export default usersRouter;