import prisma from '../prisma/prismaClient.js'
import asyncHandler from "express-async-handler";
import CustomError from "../utils/customError.js";

const messagesGet = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const messages = await prisma.message.findMany({
        where: { postId }
    })
    return res.status(200).json(messages);
})

const messageCreatePost =  asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const { username, content, avatarUrl } = req.body;
    if (!username || !content) {
        throw new CustomError("Username and content are required", 400);
    }
    if (!avatarUrl) {
        throw new CustomError("Avatar URL is required", 400);
    }
    const message = await prisma.message.create({
        data: {
            username,
            content,
            avatarUrl,
            postId
        }
    })
    return res.status(200).json(message);
})

const messageLikePut =  asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const { messageId } = req.body;

    const findMessage = await prisma.message.findUnique({
        where: { postId, id: messageId },
    })

    const newMessage = await prisma.message.update({
        where: { postId, id: messageId },
        data: {
            likes: findMessage.likes + 1
        }
    })
    return res.status(200).json(newMessage);
})

const messageUnlikePut =  asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const { messageId } = req.body;

    const findMessage = await prisma.message.findUnique({
        where: { postId, id: messageId },
    })

    const newMessage = await prisma.message.update({
        where: { postId, id: messageId },
        data: {
            likes: findMessage.likes - 1
        }
    })
    return res.status(200).json(newMessage);
})

const messageDelete =  asyncHandler(async (req, res) => {
    const { messageId } = req.params;
    const message = await prisma.message.delete({
        where: { id: messageId }
    })
    return res.status(200).json(message);
})

export default {
    messagesGet,
    messageCreatePost,
    messageLikePut,
    messageUnlikePut,
    messageDelete
}