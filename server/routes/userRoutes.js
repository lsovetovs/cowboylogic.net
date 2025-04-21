// server/routes/userRoutes.js
import express from "express";
import { protect, isSuperAdmin } from "../middleware/authMiddleware.js";
import userController from "../controllers/userController.js";

const router = express.Router();

// 🔐 лише super admin
router.get("/", protect, isSuperAdmin, userController.getAllUsers);
router.patch("/:id/role", protect, isSuperAdmin, userController.updateUserRole);
router.delete("/:id", protect, isSuperAdmin, userController.deleteUser);

export default router;
