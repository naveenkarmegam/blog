import express from "express";
import { verifyAuthToken, isAdmin } from "../middleware/verifyAuthToken.js";
import {
  createComment,
  editComment,
  getComment,
  likeComment,
} from "../controllers/comment.controller.js";
const router = express.Router();

router.post("/create", verifyAuthToken, createComment);
router.get("/get-post-comments/:postId", getComment);
router.put("/likeComment/:commentId", verifyAuthToken, likeComment);
router.put("/editComment/:commentId", verifyAuthToken, editComment);

export default router;
