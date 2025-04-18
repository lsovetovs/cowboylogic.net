import express from "express";
import authController from "../controllers/authController.js";
import { validateBody } from "../middleware/validateBody.js";
import {
  authRegisterSchema,
  authLoginSchema,
} from "../schemas/authSchema.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post(
  "/register",
  validateBody(authRegisterSchema),
  authController.registerUser
);

router.post(
  "/login",
  validateBody(authLoginSchema),
  authController.loginUser
);

router.post("/logout", authController.logoutUser);
router.get("/me", protect, authController.getCurrentUser);


export default router;
