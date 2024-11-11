import { Router } from 'express';
import messagesController from '../controllers/messagesController.js';
import {jwtAuthenticate} from "../middleware/jwtAuthenticate.js";

const messagesRouter = Router();

messagesRouter.get('/:postId/messages', messagesController.messagesGet);
messagesRouter.post('/:postId/messages', messagesController.messageCreatePost);

// Protect DELETE route for messages
messagesRouter.use(jwtAuthenticate);

messagesRouter.delete('/:postId/messages/:messageId', messagesController.messageDelete);

export default messagesRouter;