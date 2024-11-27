import { Router } from 'express';
import commentsController from '../controllers/commentsController.js';
import {jwtAuthenticate} from "../middleware/jwtAuthenticate.js";
import {validateMessage} from "../middleware/validateFields.js";

const commentsRouter = Router();

commentsRouter.get('/:postId/comments', commentsController.commentsGet);
commentsRouter.post('/:postId/comments', validateMessage, commentsController.commentCreatePost);
commentsRouter.put('/:postId/comments/:commentId', commentsController.commentLikePut);

// Protect DELETE route for comments
commentsRouter.delete('/:postId/comments/:commentId', jwtAuthenticate, commentsController.commentDelete);

export default commentsRouter;