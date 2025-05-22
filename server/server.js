import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { sequelize } from "./config/db.js";
import { seedSuperAdmin } from "./seeds/seedSuperAdmin.js";

import "./models/Book.js";
import "./models/CartItem.js";
import "./models/Order.js";
import "./models/OrderItem.js";



import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import pagesRoutes from "./routes/pagesRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import newsletterRoutes from "./routes/newsletterRoutes.js";
import webhookRoutes from "./routes/webhookRoutes.js";



import { errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/pages", pagesRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/webhook", webhookRoutes);


// Error middleware
app.use(errorHandler);

// Connect to DB and start server
connectDB().then(async () => {
  // await sequelize.sync(); 

  if (process.env.NODE_ENV !== "production") {
    await seedSuperAdmin();
  }

  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
