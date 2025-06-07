import Book from "../models/Book.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import fs from "fs";
import path from "path";

const createBook = async (req, res) => {
  const { title, author, description, price, inStock } = req.body;

  const serverUrl = `${req.protocol}://${req.get("host")}`;

  const newBook = {
    title,
    author,
    description,
    price,
    inStock: inStock === "true" || inStock === true,
    imageUrl: req.file
      ? `${serverUrl}/uploads/${req.file.filename}`
      : req.body.imageUrl || null,
  };

  const book = await Book.create(newBook);
  res.status(201).json(book);
};

const updateBook = async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (!book) throw HttpError(404, "Book not found");

  const serverUrl = `${req.protocol}://${req.get("host")}`;
  const updateData = {
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    price: req.body.price,
    inStock: req.body.inStock === "true" || req.body.inStock === true,
  };

  if (req.file) {
    // 🧼 Очистити попереднє локальне зображення
    if (book.imageUrl && book.imageUrl.includes("/uploads/")) {
      const filename = book.imageUrl.split("/uploads/")[1];
      const oldPath = path.resolve("public", "uploads", filename);
      if (fs.existsSync(oldPath)) {
        fs.unlink(oldPath, (err) => {
          if (err) console.warn("⚠️ Failed to delete old image:", err.message);
        });
      }
    }

    updateData.imageUrl = `${serverUrl}/uploads/${req.file.filename}`;
  } else if (req.body.imageUrl) {
    updateData.imageUrl = req.body.imageUrl;
  }

  await book.update(updateData);
  res.json(book);
};

const getBooks = async (req, res) => {
  const books = await Book.findAll();
  res.json(books);
};

const getBookById = async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (!book) throw HttpError(404, "Book not found");
  res.json(book);
};

const deleteBook = async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (!book) throw HttpError(404, "Book not found");

  // 🧼 Очистити файл, якщо локальний
  if (book.imageUrl && book.imageUrl.includes("/uploads/")) {
    const filename = book.imageUrl.split("/uploads/")[1];
    const filePath = path.resolve("public", "uploads", filename);
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        if (err) console.warn("❌ Error deleting image:", err.message);
      });
    }
  }

  await book.destroy();
  res.json({ message: "Book deleted" });
};

export default {
  createBook: ctrlWrapper(createBook),
  getBooks: ctrlWrapper(getBooks),
  getBookById: ctrlWrapper(getBookById),
  updateBook: ctrlWrapper(updateBook),
  deleteBook: ctrlWrapper(deleteBook),
};
