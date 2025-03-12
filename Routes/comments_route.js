import express from "express";
import { createCommentSchema } from "../Validations/Comments.js";
import {
  createComment,
  deleteComment,
  getAllCommentsForPost,
  getAllUserComments,
  updateComment,
} from "../Controller/comments_controller.js";
import Validate from "../Middlewares/Validations.js";
import Authenticate from "../Middlewares/Authenticate.js";

const commentsRouter = express.Router();

commentsRouter.use(Authenticate);

commentsRouter
  .route("/")
  .get(getAllUserComments)
  .post(Validate(createCommentSchema, "body"), createComment);

commentsRouter.get("/:postId", getAllCommentsForPost);

commentsRouter.route("/:id").patch(updateComment).delete(deleteComment);

export default commentsRouter;
