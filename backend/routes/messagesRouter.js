import { Router } from 'express';
import messagesController from '../controllers/messagesController.js';
import {jwtAuthenticate} from "../middleware/jwtAuthenticate.js";

const messagesRouter = Router();

messagesRouter.get('/:postId/messages', messagesController.messagesGet);
messagesRouter.post('/:postId/messages', messagesController.messageCreatePost);
messagesRouter.put('/:postId/messages/like', messagesController.messageLikePut);
messagesRouter.put('/:postId/messages/unlike', messagesController.messageUnlikePut);


// Protect DELETE route for messages
messagesRouter.delete('/:postId/messages/:messageId', jwtAuthenticate, messagesController.messageDelete);

export default messagesRouter;