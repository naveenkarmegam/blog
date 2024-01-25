import express from 'express';
import { isAdmin, verifyAuthToken } from '../middleware/verifyAuthToken.js';
import joiValidation from '../middleware/joiValidation.js';
import {postValidationSchema} from '../validations/post.validation.js'
import { createPost, getPost } from '../controllers/post.controller.js';

const router = express.Router();

router.post('/create-post',verifyAuthToken,isAdmin,joiValidation(postValidationSchema),createPost)
router.get('/get-post',getPost)


export default router;