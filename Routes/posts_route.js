import express from "express";
import Validate from "../Middlewares/Validations.js";
import { createPostValidationSchema } from "../Validations/Posts.js";
import { createPost, getAllPosts, getSinglePost, updatePost } from "../Controller/posts_controller.js.js";
import Authenticate from "../Middlewares/Authenticate.js";

const postRouter = express.Router();

postRouter.use(Authenticate);

postRouter.route("/").get(getAllPosts).post(Validate(createPostValidationSchema, "body"), createPost);

postRouter.route("/:id").get(getSinglePost).patch(updatePost).delete();

export default postRouter;
