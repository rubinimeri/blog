import { Router } from 'express';
import usersController from '../controllers/usersController.js';
import {jwtAuthenticate} from "../middleware/jwtAuthenticate.js";

const usersRouter = Router();


usersRouter.use(jwtAuthenticate);

usersRouter.get('/', usersController.usersGet);
usersRouter.get('/user', usersController.userGet);
usersRouter.delete('/:userId', usersController.userDelete);

export default usersRouter;