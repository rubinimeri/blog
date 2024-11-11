import prisma from '../prisma/prismaClient.js'
import asyncHandler from 'express-async-handler'
import CustomError from "../utils/customError.js";

const postsGet =  asyncHandler(async (req, res) => {
    const posts = await prisma.post.findMany();
    return res.status(200).json(posts);
})

const postGet =  asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const post = await prisma.post.findUnique({ where: { id: postId } });

    if (!post) {
        throw new CustomError(`Post with ID ${postId} not found`, 404);
    }

    return res.status(200).json(post);
})

const postsCreatePost =  asyncHandler(async (req, res) => {
    // TODO: use jwt to get user id
    const { id } = await prisma.user.findFirst();

    const { title, content } = req.body;
    if (!title || !content) {
        throw new CustomError("Title and content are required", 400);
    }

    const post = await prisma.post.create({
            data: { title, content, authorId: id}
    })
    return res.status(200).json(post);
})

const postsUpdatePut=  asyncHandler(async (req, res) => {
    const { postId } = req.params;

    const { title, content } = req.body;
    if (!title || !content) {
        throw new CustomError("Title and content are required", 400);
    }

    const post = await prisma.post.update({
        data: { title, content },
        where: { id: postId }
    })
    return res.status(200).json(post);
})

const postDelete =  asyncHandler(async (req, res) => {
    const { postId } = req.params;

    const post = await prisma.post.delete({
        where: { id: postId }
    })
    return res.status(200).json(post);
})

export default {
    postsGet,
    postGet,
    postsCreatePost,
    postsUpdatePut,
    postDelete
}