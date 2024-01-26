import express from "express";
import { verifyAuthToken, isAdmin } from "../middleware/verifyAuthToken.js";
import { createComment } from "../controllers/comment.controller.js";
const router = express.Router();

router.post("/create", verifyAuthToken, createComment);
export default router;
