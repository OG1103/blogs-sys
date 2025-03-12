import Joi from "joi";

// Joi Validation Schema for Posts
export const createPostValidationSchema = Joi.object({
  title: Joi.string().max(100).required().messages({
    "string.base": "Title must be a string.",
    "string.empty": "Title is required.",
    "string.max": "Title cannot exceed 100 characters.",
    "any.required": "Title is required.",
  }),

  description: Joi.string().max(100).required().messages({
    "string.base": "Description must be a string.",
    "string.empty": "Description is required.",
    "string.max": "Description cannot exceed 100 characters.",
    "any.required": "Description is required.",
  }),
});
