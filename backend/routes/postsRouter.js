import { Router } from 'express';
import postsController from '../controllers/postsController.js';
import {jwtAuthenticate} from "../middleware/jwtAuthenticate.js";
import {validatePost} from "../middleware/validateFields.js";
import upload from '../middleware/multerConfig.js'

const postsRouter = Router();

postsRouter.get('/', postsController.postsGet);
postsRouter.get('/all', jwtAuthenticate, postsController.postsGet)
postsRouter.get('/:postId', postsController.postGet);

postsRouter.use(jwtAuthenticate)

postsRouter.post('/', upload.single("file"), validatePost, postsController.postsCreatePost);
postsRouter.put('/:postId', upload.single("file"), validatePost, postsController.postsUpdatePut);
postsRouter.delete('/:postId', postsController.postDelete);

export default postsRouter;