import prisma from '../prisma/prismaClient.js'
import asyncHandler from "express-async-handler";
import CustomError from "../utils/customError.js";

const commentsGet = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const { sortValue } = req.query;

    const validSortValues = ["asc", "desc", "likes"];

    if (!validSortValues.includes(sortValue)) {
        throw new CustomError(`Invalid sort value: ${sortValue}`, 400);
    }

    if (sortValue === "asc" || sortValue === "desc") {
        const comments = await prisma.comment.findMany({
            where: { postId },
            orderBy: {
                createdAt: sortValue
            }
        })
        return res.status(200).json(comments);
    }

    const comments = await prisma.comment.findMany({
        where: { postId },
        orderBy: {
            likes: "desc"
        }
    })
    return res.status(200).json(comments);
})

const commentCreatePost =  asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const { username, content, avatarUrl } = req.body;
    if (!username || !content) {
        throw new CustomError("Username and content are required", 400);
    }
    if (!avatarUrl) {
        throw new CustomError("Avatar URL is required", 400);
    }
    const comment = await prisma.comment.create({
        data: {
            username,
            content,
            avatarUrl,
            postId
        }
    })
    return res.status(200).json(comment);
})

const commentLikePut =  asyncHandler(async (req, res) => {
    const { postId, commentId } = req.params;
    const { liked } = req.body;

    const findComment = await prisma.comment.findUnique({
        where: { postId, id: commentId },
    })

    const newComment = await prisma.comment.update({
        where: { postId, id: commentId },
        data: {
            likes: liked === "true" ? findComment.likes + 1 : findComment.likes - 1
        }
    })
    return res.status(200).json(newComment);
})

const commentDelete =  asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const comment = await prisma.comment.delete({
        where: { id: commentId }
    })
    return res.status(200).json(comment);
})

export default {
    commentsGet,
    commentCreatePost,
    commentLikePut,
    commentDelete
}