import Joi from "joi";
const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const authRegisterSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .pattern(emailRegexp)
    .required()
    .messages({
      "string.pattern.base": "Email must be in a valid format like user@example.com",
    }),
  password: Joi.string().min(6).max(50).required(),
  role: Joi.string().valid("user", "admin").optional(),
});

export const authLoginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .pattern(emailRegexp)
    .required()
    .messages({
      "string.pattern.base": "Email must be in a valid format like user@example.com",
    }),
  password: Joi.string().required(),
});
