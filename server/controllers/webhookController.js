import Stripe from "stripe";
import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import CartItem from "../models/CartItem.js";
import Book from "../models/Book.js";
import User from "../models/User.js";
import { sendOrderConfirmationEmail } from "../services/emailService.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhookHandler = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const userId = session.metadata?.userId;
    const user = await User.findByPk(userId);
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

    res.status(200).json({ received: true });
  } else {
    res.status(200).json({ message: "Unhandled event type" });
  }
};
