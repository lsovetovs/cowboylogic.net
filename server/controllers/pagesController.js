// // server/controllers/pagesController.js
// import Page from "../models/Page.js";

// export const getPage = async (req, res) => {
//   const { slug } = req.params;
//   const page = await Page.findOne({ where: { slug } });

//   if (!page) return res.status(404).json({ message: "Page not found" });
//   res.json(page);
// };

// export const createPage = async (req, res) => {
//   const { slug, content } = req.body;

//   const existing = await Page.findOne({ where: { slug } });
//   if (existing) return res.status(400).json({ message: "Page already exists" });

//   const page = await Page.create({ slug, content });
//   res.status(201).json(page);
// };

// export const updatePage = async (req, res) => {
//   const { slug } = req.params;
//   const { content } = req.body;

//   const page = await Page.findOne({ where: { slug } });

//   if (page) {
//     page.content = content;
//     await page.save();
//     return res.json({ message: "Page updated" });
//   } else {
//     await Page.create({ slug, content });
//     return res.status(201).json({ message: "Page created" });
//   }
// };
// server/controllers/pagesController.js
import Page from "../models/Page.js";
import HttpError from "../helpers/HttpError.js";

export const getPage = async (req, res) => {
  const { slug } = req.params;

  let page = await Page.findOne({ where: { slug } });

  // ✅ Створюємо сторінку, якщо не існує
  if (!page) {
    page = await Page.create({ slug, content: "" });
  }

  res.json(page);
};

export const createPage = async (req, res) => {
  const { slug, content } = req.body;

  const existing = await Page.findOne({ where: { slug } });
  if (existing) throw HttpError(400, "Page already exists");

  const page = await Page.create({ slug, content });
  res.status(201).json(page);
};

export const updatePage = async (req, res) => {
  const { slug } = req.params;
  const { content } = req.body;

  let page = await Page.findOne({ where: { slug } });

  if (page) {
    page.content = content;
    await page.save();
    return res.json({ message: "Page updated" });
  }

  // ✅ Якщо не існує — створюємо автоматично
  await Page.create({ slug, content });
  res.status(201).json({ message: "Page created" });
};
