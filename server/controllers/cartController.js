import CartItem from "../models/CartItem.js";
import Book from "../models/Book.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

const getCart = async (req, res) => {
  const items = await CartItem.findAll({
    where: { userId: req.user.id },
    include: Book,
  });
  res.json(items);
};

const addToCart = async (req, res) => {
  const { bookId, quantity = 1 } = req.body;

  const existing = await CartItem.findOne({
    where: { userId: req.user.id, bookId },
  });

  if (existing) {
    existing.quantity += quantity;
    await existing.save();
    return res.status(200).json(existing);
  }

  const item = await CartItem.create({
    userId: req.user.id,
    bookId,
    quantity,
  });

  res.status(201).json(item);
};

const updateQuantity = async (req, res) => {
  const { quantity } = req.body;
  const { itemId } = req.params;

  const item = await CartItem.findByPk(itemId);

  if (!item || item.userId !== req.user.id) {
    throw HttpError(404, "Cart item not found");
  }

  item.quantity = quantity;
  await item.save();
  res.json(item);
};

const deleteItem = async (req, res) => {
  const { itemId } = req.params;

  const item = await CartItem.findByPk(itemId);

  if (!item || item.userId !== req.user.id) {
    throw HttpError(404, "Cart item not found");
  }

  await item.destroy();
  res.json({ message: "Item deleted" });
};

const clearCart = async (req, res) => {
  await CartItem.destroy({ where: { userId: req.user.id } });
  res.json({ message: "Cart cleared" });
};

export default {
  getCart: ctrlWrapper(getCart),
  addToCart: ctrlWrapper(addToCart),
  updateQuantity: ctrlWrapper(updateQuantity),
  deleteItem: ctrlWrapper(deleteItem),
  clearCart: ctrlWrapper(clearCart),
};
