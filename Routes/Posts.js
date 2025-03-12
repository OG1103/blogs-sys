import express from "express";
import Validate from "../Middlewares/Validations.js";
import { createPostValidationSchema } from "../Validations/Posts.js";
import { createPost, getAllPosts, getSinglePost, updatePost } from "../Controller/Posts.js";

const router = express.Router();

router.post("/post", Validate(createPostValidationSchema, "body"), createPost);
router.get("/posts", getAllPosts);
router.get("/post/:id", getSinglePost);
router.patch("/post/:id", updatePost);

router.delete("/post/:id");

export default router;
