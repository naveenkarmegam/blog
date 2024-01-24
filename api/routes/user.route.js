import express from "express";
import verifyAuthToken from "../middleware/verifyAuthToken.js";
import { updateValidationSchema } from "../validations/user.validation.js";
import joiValidation from "../middleware/joiValidation.js";
import { updateUser } from "../controllers/user.controller.js";


const router = express.Router();

router.put('/update/:id',verifyAuthToken,updateUser)
export default router;
