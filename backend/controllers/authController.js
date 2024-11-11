import prisma from "../prisma/prismaClient.js";
import passport from "../strategies/jwtStrategy.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import CustomError from "../utils/customError.js";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import {validateLogin, validateSignUp} from "../middleware/validateFields.js"
import { config } from 'dotenv';
import { jwtAuthenticate } from "../middleware/jwtAuthenticate.js";
config();

const signUp = [
    validateSignUp,
    asyncHandler(async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Validation Error',
            })
        }

        const { username, email, password } = req.body;

        const checkUsername = await prisma.user.findUnique({ where: { username } })
        if (checkUsername) {
            throw new CustomError(`Username already exists`, 409);
        }

        const checkEmail = await prisma.user.findUnique({ where: { email } })
        if (checkEmail) {
            throw new CustomError(`Email already exists`, 409);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        })

        delete user.password;

        jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) {
                throw new CustomError(err.message, 409);
            }
            return res.status(200).json({
                token,
                message: 'Token created successfully!'
            })
        })
    })
]

const login = [
    validateLogin,
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Validation Error',
            })
        }
        next()
    }),
    jwtAuthenticate,
    (req, res) => {
        return res.status(200).json({ user: req.user });
    }
]

export default {
    signUp,
    login
}