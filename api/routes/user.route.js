import express from 'express'
import { testConnect } from '../controllers/user.controller.js';
import joiValidation from '../middleware/joiValidation.js';
import { signUpValidationSchema } from '../validations/auth.validation.js';


const router = express.Router();




router.post('/test',joiValidation(signUpValidationSchema),testConnect)

export default router;