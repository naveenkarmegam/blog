import express from "express";
import {isAdmin, verifyAuthToken} from "../middleware/verifyAuthToken.js";
import { updateValidationSchema } from "../validations/user.validation.js";
import joiValidation from "../middleware/joiValidation.js";
import { deleteUser, getUser, signOut, updateUser } from "../controllers/user.controller.js";


const router = express.Router();

router.put('/update/:id',verifyAuthToken,updateUser);
router.delete('/delete/:id',verifyAuthToken,deleteUser);
router.post('/sign-out',signOut);
router.get('/get-users',verifyAuthToken,isAdmin,getUser)
export default router;
