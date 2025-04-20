// server/routes/pagesRoutes.js
import express from "express";
import Page from "../models/Page.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// 📄 GET page by slug
router.get("/:slug", ctrlWrapper(async (req, res) => {
  const { slug } = req.params;
  const page = await Page.findOne({ where: { slug } });
  if (!page) throw HttpError(404, "Page not found");
  res.json(page);
}));

// ✅ POST create a new page
router.post("/", protect, isAdmin, ctrlWrapper(async (req, res) => {
  const { slug, content } = req.body;

  const existing = await Page.findOne({ where: { slug } });
  if (existing) throw HttpError(400, "Page already exists");

  const page = await Page.create({ slug, content });
  res.status(201).json(page);
}));

// ✏️ PUT update page content
router.put("/:slug", protect, isAdmin, ctrlWrapper(async (req, res) => {
  const { slug } = req.params;
  const { content } = req.body;

  const page = await Page.findOne({ where: { slug } });
  if (!page) throw HttpError(404, "Page not found");

  page.content = content;
  await page.save();
  res.json({ message: "Page updated" });
}));

export default router;
