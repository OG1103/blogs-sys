import express from "express";
import Validate from "../Middlewares/Validations.js";
import { loginValidationSchema, registerValidationSchema } from "../Validations/Authentication.js";
import { login, logout, register } from "../Controller/user_controller.js";
const userRouter = express.Router();

userRouter.post("/register", Validate(registerValidationSchema, "body"), register);
userRouter.post("/login", Validate(loginValidationSchema, "body"), login);
userRouter.post("/logout",logout)

export default userRouter;
