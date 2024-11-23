import { Router } from 'express';
import postsController from '../controllers/postsController.js';
import {jwtAuthenticate} from "../middleware/jwtAuthenticate.js";
import {validatePost} from "../middleware/validateFields.js";

const postsRouter = Router();

postsRouter.get('/', postsController.postsGet);
postsRouter.get('/all', jwtAuthenticate, postsController.postsProtectedGet)
postsRouter.get('/:postId', postsController.postGet);

postsRouter.use(jwtAuthenticate)

postsRouter.post('/', validatePost, postsController.postsCreatePost);
postsRouter.put('/:postId', validatePost, postsController.postsUpdatePut);
postsRouter.delete('/:postId', postsController.postDelete);

export default postsRouter;