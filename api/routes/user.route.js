import express from "express";
import {verifyAuthToken} from "../middleware/verifyAuthToken.js";
import { updateValidationSchema } from "../validations/user.validation.js";
import joiValidation from "../middleware/joiValidation.js";
import { deleteUser, signOut, updateUser } from "../controllers/user.controller.js";


const router = express.Router();

router.put('/update/:id',verifyAuthToken,updateUser);
router.delete('/delete/:id',verifyAuthToken,deleteUser);
router.post('/sign-out',signOut);

export default router;
