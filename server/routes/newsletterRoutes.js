// routes/newsletterRoutes.js
import express from "express";
import newsletterController from "../controllers/newsletterController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/subscribe", newsletterController.subscribe);
router.post("/send", protect, isAdmin, newsletterController.sendNewsletter);

export default router;