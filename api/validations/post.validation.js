import joi from "joi";

export const postValidationSchema = joi.object({
    title: joi.string().min(3).required().messages({
        'string.empty': '{{#label}} is not allowed to be empty',
        'string.min': '{{#label}} length must be at least {{#limit}} characters long',
    }),
    content: joi.string().min(3).required().messages({
        'string.empty': '{{#label}} is not allowed to be empty',
        'string.min': '{{#label}} length must be at least {{#limit}} characters long',
    })
  });