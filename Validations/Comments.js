import Joi from "joi";

export const createCommentSchema = Joi.object({
  content: Joi.string().trim().min(1).required().messages({
    "string.empty": "Content cannot be empty",
    "any.required": "Content is required",
  }),

  postId: Joi.number().integer().positive().required().messages({
    "number.base": "Post ID must be a number",
    "number.integer": "Post ID must be an integer",
    "number.positive": "Post ID must be a positive number",
    "any.required": "Post ID is required",
  }),
});
