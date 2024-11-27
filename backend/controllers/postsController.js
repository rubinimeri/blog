import prisma from '../prisma/prismaClient.js';
import asyncHandler from 'express-async-handler';
import CustomError from "../utils/customError.js";
import cloudinary from '../utils/cloudinaryConfig.js';

const postsGet =  asyncHandler(async (req, res) => {
    const {
        sort = 'createdAt',
        order = 'desc',
        search = ''
    } = req.query;

    const { user } = req;
    const validSortFields = ['createdAt', 'title', 'comments'];
    const validOrderValues = ['asc', 'desc'];

    if (!validSortFields.includes(sort)) {
        throw new CustomError(`Invalid sort field: ${sort}`, 400);
    }

    if (!validOrderValues.includes(order)) {
        throw new CustomError(`Invalid order value: ${order}`, 400);
    }

    const where = {
        title: {
            contains: search,
            mode: 'insensitive'
        },
        ...(user
            ? { authorId: user.id }
            : { isPublished: true }
        )
    }

    let orderBy;
    if (sort === 'comments') {
        orderBy = { [sort]: { _count: order } };
    } else {
        orderBy = { [sort]: order };
    }

    const posts = await prisma.post.findMany({
        where,
        orderBy,
        include: {
            author: {
                select: {
                    username: true,
                }
            },
            ...(user && { comments: true })
        }
    });
    return res.status(200).json(posts);
})

const postGet =  asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const post = await prisma.post.findUnique({
        where: { id: postId },
        include: {
            author: {
                select: {
                    username: true,
                },
            },
            comments: true
        }
    });

    if (!post) {
        throw new CustomError(`Post with ID ${postId} not found`, 404);
    }

    return res.status(200).json(post);
})



const postsCreatePost = asyncHandler(async (req, res) => {
    const user = req.user;

    const { title, content, isPublished } = req.body;
    if (!title || !content) {
        throw new CustomError("Title and content are required", 400);
    }

    const { file } = req;
    if (!file) {
        throw new CustomError("Image is required", 400);
    }

    await cloudinary.uploader.upload(file.path, async (err, result) => {
        if (err) {
            throw new CustomError(err.message, err.statusCode);
        }

        const post = await prisma.post.create({
            data: {
                title,
                content,
                imageUrl: result.url,
                authorId: user.id,
                cloudinaryId: result.public_id,
                isPublished: isPublished === "true",
            }
        })

        return res.status(200).json(post);
    })
})

const postsUpdatePut=  asyncHandler(async (req, res) => {
    const { postId } = req.params;

    const { title, content, isPublished } = req.body;
    if (!title || !content) {
        throw new CustomError("Title and content are required", 400);
    }

    const { file } = req;
    if (!file) {
        const post = await prisma.post.update({
            data: { title, content, isPublished: isPublished === "true" },
            where: { id: postId }
        })
        return res.status(200).json(post);
    }

    await cloudinary.uploader.upload(file.path, async (err, result) => {
        if (err) {
            throw new CustomError(err.message, err.statusCode);
        }

        // Delete previous image
        const previousPost = await prisma.post.findUnique({where: { id: postId }});
        cloudinary.uploader.destroy(previousPost.cloudinaryId);

        const post = await prisma.post.update({
            data: {
                title,
                content,
                imageUrl: result.url,
                cloudinaryId: result.public_id,
                isPublished: isPublished === "true",
            },
            where: {
                id: postId,
            }
        })

        return res.status(200).json(post);
    })
})

const postDelete =  asyncHandler(async (req, res) => {
    const { postId } = req.params;

    const post = await prisma.post.delete({
        where: { id: postId }
    })
    cloudinary.uploader.destroy(post.cloudinaryId);

    return res.status(200).json(post);
})

export default {
    postsGet,
    postGet,
    postsCreatePost,
    postsUpdatePut,
    postDelete
}