import { Router } from 'express';
import usersController from '../controllers/usersController.js';
import {jwtAuthenticate} from "../middleware/jwtAuthenticate.js";

const usersRouter = Router();

usersRouter.get('/', usersController.usersGet);
usersRouter.get('/:userId', usersController.userGet);

// Protect DELETE route
usersRouter.use(jwtAuthenticate);

usersRouter.delete('/:userId', usersController.userDelete);

export default usersRouter;