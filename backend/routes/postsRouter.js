import { Router } from 'express';
import postsController from '../controllers/postsController.js';

const postsRouter = Router();

postsRouter.get('/', postsController.postsGet);
postsRouter.get('/:postId', postsController.postGet);
postsRouter.post('/', postsController.postsCreatePost);
postsRouter.put('/:postId', postsController.postsUpdatePut);
postsRouter.delete('/:postId', postsController.postDelete);

export default postsRouter;