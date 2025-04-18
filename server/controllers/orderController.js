import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import CartItem from "../models/CartItem.js";
import Book from "../models/Book.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

const createOrder = async (req, res) => {
  const userId = req.user.id;

  const cartItems = await CartItem.findAll({
    where: { userId },
    include: Book,
  });

  if (!cartItems.length) {
    throw HttpError(400, "Cart is empty");
  }

  const totalPrice = cartItems.reduce((sum, item) => {
    return sum + item.quantity * item.Book.price;
  }, 0);

  const order = await Order.create({
    userId,
    totalPrice,
    status: "pending",
  });

  const orderItems = cartItems.map((item) => ({
    orderId: order.id,
    bookId: item.bookId,
    quantity: item.quantity,
    price: item.Book.price,
  }));

  await OrderItem.bulkCreate(orderItems);

  await CartItem.destroy({ where: { userId } });

  res.status(201).json({ message: "Order placed", orderId: order.id });
};

const getUserOrders = async (req, res) => {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      include: {
        model: OrderItem,
        include: Book,
      },
      order: [["createdAt", "DESC"]],
    });
  
    res.json(orders);
  };
  
  const getAllOrders = async (req, res) => {
    if (req.user.role !== "admin") {
      throw HttpError(403, "Access denied. Admins only.");
    }
  
    const orders = await Order.findAll({
      include: [
        {
          model: OrderItem,
          include: Book,
        },
      ],
      order: [["createdAt", "DESC"]],
    });
  
    res.json(orders);
  };

  const updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    if (req.user.role !== "admin") {
      throw HttpError(403, "Only admins can update order status");
    }
  
    if (!["pending", "completed"].includes(status)) {
      throw HttpError(400, "Invalid status value");
    }
  
    const order = await Order.findByPk(id);
  
    if (!order) {
      throw HttpError(404, "Order not found");
    }
  
    order.status = status;
    await order.save();
  
    res.json({ message: "Order status updated", order });
  };
  

export default {
  createOrder: ctrlWrapper(createOrder),
  getUserOrders: ctrlWrapper(getUserOrders),
  getAllOrders: ctrlWrapper(getAllOrders),
  updateOrderStatus: ctrlWrapper(updateOrderStatus),
};
