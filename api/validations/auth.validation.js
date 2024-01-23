import joi from 'joi';


export const signUpValidationSchema = joi.object({
    username:joi.string().min(3).max(15).required().messages({
        "string.empty":"username cannot be empty",
        "string.min":"username must be have {#limit}",
        "string.max":"username must be have {#limit}"
    }),
    email:joi.string().email().required().messages({
        "string.empty":"email cannot be empty",
        "string.email": "Invalid email address",
    }),
    password:joi.string().min(8).max(15).required().messages({
        "string.empty":"password cannot be empty",
        "string.min":"password must be have {#limit}",
        "string.max":"password must be have {#limit}"
    }),
    confirmPassword:joi.string().valid(joi.ref('password')).required().messages({
        "any.only": "Passwords do not match",
    })
})