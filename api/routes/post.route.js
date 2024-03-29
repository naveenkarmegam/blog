import express from "express";
import { isAdmin, verifyAuthToken } from "../middleware/verifyAuthToken.js";
import joiValidation from "../middleware/joiValidation.js";
import { postValidationSchema } from "../validations/post.validation.js";
import { createPost, deletePost, getPost, updatePost } from "../controllers/post.controller.js";

const router = express.Router();

router.post(
  "/create-post",
  verifyAuthToken,
  isAdmin,
  joiValidation(postValidationSchema),
  createPost
);
router.get("/get-posts", getPost);

router.delete('/delete-post/:postId/:userId',verifyAuthToken,isAdmin,deletePost)
router.put('/update-post/:postId/:userId',verifyAuthToken,isAdmin,updatePost)

export default router;
