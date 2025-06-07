import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import CartItem from "../models/CartItem.js";
import Book from "../models/Book.js";
import User from "../models/User.js";
import { sendOrderConfirmationEmail } from "../services/emailService.js";

export const squareWebhookHandler = async (req, res) => {
  const event = req.body;

  console.log("📥 Square Webhook received:", event?.type);

  if (event.type === "payment.updated") {
    const payment = event.data.object.payment;

    if (payment.status === "COMPLETED") {
      const userId = payment.metadata?.userId;
      const user = await User.findByPk(userId);

      if (!user) return res.status(404).json({ message: "User not found" });

      const cartItems = await CartItem.findAll({
        where: { userId },
        include: Book,
      });

      if (!cartItems.length) return res.status(200).json({ message: "Empty cart" });

      const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.quantity * item.Book.price,
        0
      );

      const order = await Order.create({
        userId,
        totalPrice,
        status: "completed",
      });

      const orderItems = cartItems.map((item) => ({
        orderId: order.id,
        bookId: item.bookId,
        quantity: item.quantity,
        price: item.Book.price,
      }));

      await OrderItem.bulkCreate(orderItems);
      await CartItem.destroy({ where: { userId } });

      try {
        await sendOrderConfirmationEmail({
          to: user.email,
          order,
          items: cartItems,
        });
      } catch (emailErr) {
        console.error("Email send error:", emailErr.message);
      }

      return res.status(200).json({ received: true });
    }
  }

  res.status(200).json({ message: "Unhandled event type" });
};
