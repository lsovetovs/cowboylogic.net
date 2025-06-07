import Favorite from "../models/Favorite.js";
import Book from "../models/Book.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";

// ➕ Додати книгу до обраного
const addFavorite = async (req, res) => {
  const { bookId } = req.body;
  const userId = req.user.id;

  const [favorite, created] = await Favorite.findOrCreate({
    where: { userId, bookId },
  });

  if (!created) throw HttpError(409, "Already in favorites");

  res.status(201).json({ message: "Added to favorites", favorite });
};

// ❌ Видалити книгу з обраного
const removeFavorite = async (req, res) => {
  const { bookId } = req.params;
  const userId = req.user.id;

  const deleted = await Favorite.destroy({ where: { userId, bookId } });

  if (!deleted) throw HttpError(404, "Not in favorites");

  res.json({ message: "Removed from favorites" });
};

// 📄 Отримати всі обрані книги юзера
const getFavorites = async (req, res) => {
  const userId = req.user.id;

  const favorites = await Favorite.findAll({
    where: { userId },
    include: Book,
  });

  res.json(favorites.map((f) => f.Book));
};

export default {
  addFavorite: ctrlWrapper(addFavorite),
  removeFavorite: ctrlWrapper(removeFavorite),
  getFavorites: ctrlWrapper(getFavorites),
};
