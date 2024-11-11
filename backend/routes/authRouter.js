import authController from "../controllers/authController.js";
import { Router } from "express";

const authRouter = Router();

authRouter.post('/sign-up', authController.signUp);
authRouter.post('/login', authController.login)

export default authRouter;