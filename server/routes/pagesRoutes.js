// // server/routes/pagesRoutes.js
// import express from "express";
// import { getPage, createPage, updatePage } from "../controllers/pagesController.js";
// import ctrlWrapper from "../helpers/ctrlWrapper.js";
// import { protect, isAdmin } from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.get("/:slug", ctrlWrapper(getPage));
// router.post("/", protect, isAdmin, ctrlWrapper(createPage));
// router.put("/:slug", protect, isAdmin, ctrlWrapper(updatePage));

// export default router;
// server/routes/pagesRoutes.js
import express from "express";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import Page from "../models/Page.js";
import HttpError from "../helpers/HttpError.js";

const router = express.Router();

// 📄 GET page by slug — створює, якщо не існує
router.get("/:slug", ctrlWrapper(async (req, res) => {
  const { slug } = req.params;

  let page = await Page.findOne({ where: { slug } });

  if (!page) {
    page = await Page.create({ slug, content: "" }); // автостворення пустої сторінки
  }

  res.json(page);
}));

// ➕ POST create new page (використовується рідко)
router.post("/", protect, isAdmin, ctrlWrapper(async (req, res) => {
  const { slug, content } = req.body;

  const existing = await Page.findOne({ where: { slug } });
  if (existing) throw HttpError(400, "Page already exists");

  const page = await Page.create({ slug, content });
  res.status(201).json(page);
}));

// ✏️ PUT update or create page by slug
router.put("/:slug", protect, isAdmin, ctrlWrapper(async (req, res) => {
  const { slug } = req.params;
  const { content } = req.body;

  let page = await Page.findOne({ where: { slug } });

  if (page) {
    page.content = content;
    await page.save();
    return res.json({ message: "Page updated" });
  }

  await Page.create({ slug, content });
  res.status(201).json({ message: "Page created" });
}));

export default router;
