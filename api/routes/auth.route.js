import express from "express";
import { logInWithGoogle, signIn, signUp } from "../controllers/auth.controller.js";
import joiValidation from "../middleware/joiValidation.js";
import {
  signUpValidationSchema,
  signInValidationSchema,
} from "../validations/auth.validation.js";

const router = express.Router();

router.post("/sign-up", joiValidation(signUpValidationSchema), signUp);
router.post("/sign-in", joiValidation(signInValidationSchema), signIn);
router.post("/login-with-google",logInWithGoogle);

export default router;
