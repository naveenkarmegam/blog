import express from "express";
import { verifyAuthToken, isAdmin } from "../middleware/verifyAuthToken.js";
import {
  createComment,
  getComment,
} from "../controllers/comment.controller.js";
const router = express.Router();

router.post("/create", verifyAuthToken, createComment);
router.get("/get-post-comments/:postId", getComment);
export default router;
