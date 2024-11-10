import { Router } from 'express';
import postsController from '../controllers/postsController.js';

const postsRouter = Router();

postsRouter.get('/', postsController.postsGet)

export default postsRouter;