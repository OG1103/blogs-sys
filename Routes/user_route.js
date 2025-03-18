import express from "express";
import Validate from "../Middlewares/Validations.js";
import { loginValidationSchema, registerValidationSchema } from "../Validations/Authentication.js";
import { login, logout, register, getUser, verifyEmail, resetPassword, forgotPassword } from "../Controller/user_controller.js";
import Authenticate from "../Middlewares/Authenticate.js";
const userRouter = express.Router();

userRouter.get("/",Authenticate,getUser);
userRouter.post("/register", Validate(registerValidationSchema, "body"), register);
userRouter.post("/login", Validate(loginValidationSchema, "body"), login);
userRouter.post("/logout",logout)
userRouter.post("/verify",verifyEmail)
userRouter.post("/reset-password",resetPassword)
userRouter.post("/forgot-password",forgotPassword)

export default userRouter;
