import Book from "../models/Book.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

const createBook = async (req, res) => {
  const { title, author, description, price, imageUrl, inStock } = req.body;

  const book = await Book.create({
    title,
    author,
    description,
    price,
    imageUrl,
    inStock,
  });

  res.status(201).json(book);
};

const getBooks = async (req, res) => {
  const books = await Book.findAll();
  res.json(books);
};

const getBookById = async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (!book) {
    throw HttpError(404, "Book not found");
  }
  res.json(book);
};

// const updateBook = async (req, res) => {
//   const book = await Book.findByPk(req.params.id);
//   if (!book) {
//     throw HttpError(404, "Book not found");
//   }

//   await book.update(req.body);
//   res.json(book);
// };

const updateBook = async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (!book) {
    throw HttpError(404, "Book not found");
  }

  // ❗ Дозволені тільки ці поля
  const allowedFields = ["title", "author", "description", "price", "imageUrl", "inStock"];
  const updateData = {};

  for (const field of allowedFields) {
    if (req.body[field] !== undefined) {
      updateData[field] = req.body[field];
    }
  }

  await book.update(updateData);
  res.json(book);
};

const deleteBook = async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (!book) {
    throw HttpError(404, "Book not found");
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
