import express from "express";
import { verifyAuthToken, isAdmin } from "../middleware/verifyAuthToken.js";
import {
  createComment,
  deleteComment,
  editComment,
  getComment,
  getComments,
  likeComment,
} from "../controllers/comment.controller.js";
const router = express.Router();

router.post("/create", verifyAuthToken, createComment);
router.get("/get-post-comments/:postId", getComment);
router.put("/likeComment/:commentId", verifyAuthToken, likeComment);
router.put("/editComment/:commentId", verifyAuthToken, editComment);
router.delete("/deleteComment/:commentId", verifyAuthToken, deleteComment);
router.get("/get-comments", verifyAuthToken, isAdmin, getComments);

export default router;
