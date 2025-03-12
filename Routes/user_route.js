import express from "express";
import Validate from "../Middlewares/Validations.js";
import { loginValidationSchema, registerValidationSchema } from "../Validations/Authentication.js";
import { login, register } from "../Controller/user_controller.js";
const router = express.Router();

router.post("/register", Validate(registerValidationSchema, "body"), register);
router.post("/login", Validate(loginValidationSchema, "body"), login);

export default router;
