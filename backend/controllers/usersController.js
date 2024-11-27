import prisma from '../prisma/prismaClient.js';
import asyncHandler from "express-async-handler";
import CustomError from "../utils/customError.js";

const usersGet = asyncHandler(async (req, res) => {
    const users = await prisma.user.findMany();
    return res.status(200).json(users);
})

const userGet = asyncHandler(async (req, res) => {
    const { user } = req;
    const checkUser = await prisma.user.findUnique({
        where: { id: user.id }
    });
    if (!checkUser) {
        throw new CustomError(`User with ID ${user.id} not found`, 404);
    }
    return res.status(200).json(checkUser);
})

const userDelete = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { posts: true }
    });
    if (!user) {
        throw new CustomError(`User with ID ${userId} not found`, 404);
    }

    // Delete comments from posts
    for (const post of user.posts) {
        await prisma.comment.deleteMany({
            where: { postId: post.id },
        })
    }
    // Delete posts
    await prisma.post.deleteMany({
        where: { authorId: userId },
    });

    // Delete user
    await prisma.user.delete({ where: { id: userId } });

    return res.status(200).json(user);
})

export default {
    usersGet,
    userGet,
    userDelete
}