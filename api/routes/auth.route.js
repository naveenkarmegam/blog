import express from "express";
import { signUp } from "../controllers/user.controller.js";
import joiValidation from "../middleware/joiValidation.js";
import { signUpValidationSchema } from "../validations/auth.validation.js";

const router = express.Router();

router.post("/sign-up", joiValidation(signUpValidationSchema), signUp);

export default router;