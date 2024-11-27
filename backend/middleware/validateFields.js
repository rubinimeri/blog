import { body } from "express-validator";
import DOMPurify from "dompurify";

const isRequired = 'is required';
const minCharacters = (c) => `must have at least ${c} characters`;


const validateSignUp = [
    body("username")
        .trim()
        .notEmpty().withMessage(`Username ${isRequired}`)
        .isLength({ min: 2 }).withMessage(`Username ${minCharacters(2)}`)
        .escape(),
    body("email")
        .trim()
        .notEmpty().withMessage(`Email ${isRequired}`)
        .isEmail().withMessage(`Email is improper format`)
        .escape(),
    body("password")
        .notEmpty().withMessage(`Password ${isRequired}`)
        .isLength({ min: 5 }).withMessage(`Password ${minCharacters(5)}`)
        .trim()
        .escape(),
    body("confirmPassword")
        .custom((value, { req }) => {
            return value === req.body.password;
        }).withMessage("Passwords must match")
        .trim()
        .escape()
]

const validateLogin = [
    body("email")
        .trim()
        .notEmpty().withMessage(`Email ${isRequired}`)
        .isEmail().withMessage(`Email is improper format`)
        .escape(),
    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 5 }).withMessage(`Password ${minCharacters(5)}`)
        .trim()
        .escape(),
]

const validateMessage = [
    body("username")
        .trim()
        .notEmpty().withMessage(`Username ${isRequired}`)
        .isLength({ min: 2 }).withMessage(`Username ${minCharacters(2)}`)
        .escape(),
    body("content")
        .trim()
        .isLength({ min: 2 }).withMessage(`Content ${minCharacters(2)}`)
        .escape()
]

const validatePost = [
    body("title")
        .trim()
        .notEmpty().withMessage(`Title ${isRequired}`)
        .isLength({ min: 2 }).withMessage(`Title ${minCharacters(2)}`)
        .custom((value, { req }) => DOMPurify.sanitize(value)),
    body("content")
        .trim()
        .isLength({ min: 2 }).withMessage(`Content ${minCharacters(2)}`)
        .custom((value, { req }) => DOMPurify.sanitize(value, { ALLOWED_TAGS: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'li', 'ol'] })),
]

export  {
    validateLogin,
    validateSignUp,
    validateMessage,
    validatePost
}