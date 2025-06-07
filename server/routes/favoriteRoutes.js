import express from "express";
import favoriteController from "../controllers/favoriteController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", favoriteController.getFavorites);
router.post("/", favoriteController.addFavorite);
router.delete("/:bookId", favoriteController.removeFavorite);

export default router;
