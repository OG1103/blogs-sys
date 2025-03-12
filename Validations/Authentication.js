import Joi from "joi";

// Registration validation schema
export const registerValidationSchema = Joi.object({
  firstName: Joi.string().max(100).required().messages({
    "string.empty": "First name is required.",
    "string.max": "First name cannot exceed 100 characters.",
  }),
  lastName: Joi.string().max(100).required().messages({
    "string.empty": "Last name is required.",
    "string.max": "Last name cannot exceed 100 characters.",
  }),
  email: Joi.string().email().max(100).required().messages({
    "string.empty": "Email is required.",
    "string.email": "Email must be a valid email address.",
    "string.max": "Email cannot exceed 100 characters.",
  }),
  password: Joi.string().min(6).max(100).required().messages({
    "string.empty": "Password is required.",
    "string.min": "Password must be at least 6 characters long.",
    "string.max": "Password cannot exceed 100 characters.",
  }),
});

// Login validation schema
export const loginValidationSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required.",
    "string.email": "Email must be a valid email address.",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required.",
  }),
});
