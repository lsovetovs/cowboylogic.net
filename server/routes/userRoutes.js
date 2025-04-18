import express from "express";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import userController from "../controllers/userController.js";

const router = express.Router();

router.patch("/:id/role", protect, isAdmin, userController.updateUserRole);
router.get("/", protect, isAdmin, userController.getAllUsers);
router.delete("/:id", protect, isAdmin, userController.deleteUser);

export default router;
