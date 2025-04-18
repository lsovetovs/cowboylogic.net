import express from "express";
import cartController from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", cartController.getCart);
router.post("/", cartController.addToCart);
router.patch("/:itemId", cartController.updateQuantity);
router.delete("/:itemId", cartController.deleteItem);
router.delete("/", cartController.clearCart);

export default router;
