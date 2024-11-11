import { Router } from 'express';
import messagesController from '../controllers/messagesController.js';

const messagesRouter = Router();

messagesRouter.get('/:postId/messages', messagesController.messagesGet);
messagesRouter.post('/:postId/messages', messagesController.messageCreatePost);
messagesRouter.delete('/:postId/messages/:messageId', messagesController.messageDelete);

export default messagesRouter;