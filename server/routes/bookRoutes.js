import express from "express";
import bookController from "../controllers/bookController.js";

import { protect, isAdmin } from "../middleware/authMiddleware.js";

import {
  createBookSchema,
  updateBookSchema,
} from "../schemas/bookSchema.js";

import { validateBody } from "../middleware/validateBody.js";

const router = express.Router();
const {
    createBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook,
  } = bookController;

router.get("/", getBooks); // всі книги
router.get("/:id", getBookById); // конкретна книга
router.delete("/:id", protect, isAdmin, deleteBook); // видалення

router.post(
  "/",
  protect,
  isAdmin,
  validateBody(createBookSchema),
  createBook
);

router.put(
  "/:id",
  protect,
  isAdmin,
  validateBody(updateBookSchema),
  updateBook
);

export default router;
