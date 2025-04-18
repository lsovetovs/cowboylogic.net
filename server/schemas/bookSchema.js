// server/schemas/bookSchemas.js
import Joi from "joi";

export const createBookSchema = Joi.object({
  title: Joi.string().min(2).max(255).required(),
  author: Joi.string().min(2).max(255).required(),
  description: Joi.string().allow("").max(2000),
  price: Joi.number().precision(2).positive().required(),
  imageUrl: Joi.string().uri().optional(),
  inStock: Joi.boolean().optional(),
});

export const updateBookSchema = Joi.object({
  title: Joi.string().min(2).max(255),
  author: Joi.string().min(2).max(255),
  description: Joi.string().allow("").max(2000),
  price: Joi.number().precision(2).positive(),
  imageUrl: Joi.string().uri(),
  inStock: Joi.boolean(),
}).min(1); // при оновленні хоча б одне поле обов'язкове
