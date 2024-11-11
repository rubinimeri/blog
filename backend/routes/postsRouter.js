import { Router } from 'express';
import postsController from '../controllers/postsController.js';
import {jwtAuthenticate} from "../middleware/jwtAuthenticate.js";

const postsRouter = Router();

postsRouter.get('/', postsController.postsGet);
postsRouter.get('/:postId', postsController.postGet);

// Protect POST PUT DELETE routes
postsRouter.use(jwtAuthenticate)

postsRouter.post('/', postsController.postsCreatePost);
postsRouter.put('/:postId', postsController.postsUpdatePut);
postsRouter.delete('/:postId', postsController.postDelete);

export default postsRouter;