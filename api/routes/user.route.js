import express from "express";
import verifyAuthToken from "../middleware/verifyAuthToken.js";
import { updateValidationSchema } from "../validations/user.validation.js";
import joiValidation from "../middleware/joiValidation.js";
import { deleteUser, updateUser } from "../controllers/user.controller.js";


const router = express.Router();

router.put('/update/:id',verifyAuthToken,updateUser);
router.delete('/delete/:id',verifyAuthToken,deleteUser);

export default router;
