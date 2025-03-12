import express from "express";
import Validate from "../Middlewares/Validations.js";
import { registerValidationSchema } from "../Validations/Authentication.js";
import { register } from "../Controller/Authenticate.js";
const router = express.Router();

router.post("/register", Validate(registerValidationSchema, "body"), register);

export default router;
