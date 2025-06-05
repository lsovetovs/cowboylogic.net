# API Endpoints Reference

This file contains a list of main API routes based on the structure of the project in `server/routes/`. Each route is prefixed with `/api`.

---

## 📚 Books
- `GET /api/books` — Get all books
- `GET /api/books/:id` — Get a book by ID
- `POST /api/books` — Create a new book (admin only)
- `PUT /api/books/:id` — Update book (admin only)
- `DELETE /api/books/:id` — Delete book (admin only)

## 👤 Auth
- `POST /api/auth/request-code` — Request a login verification code (for 2FA)
- `POST /api/auth/verify-code` — Verify code and get token

- `POST /api/auth/register` — Register new user
- `POST /api/auth/login` — Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` — Get current user
- `GET /api/auth/google` — Google auth init
- `GET /api/auth/google/callback` — Google auth callback

## 🛒 Cart
- `GET /api/cart` — Get user's cart
- `POST /api/cart` — Add item to cart
- `PATCH /api/cart/:id` — Update quantity
- `DELETE /api/cart` — Clear cart
- `DELETE /api/cart/:id` — Remove item from cart

## 📦 Orders
- `GET /api/orders` — Get user orders (user)
- `GET /api/orders/all` — Get all orders (admin)
- `POST /api/orders` — Create new order
- `PATCH /api/orders/:id/status` — Update qrder status
- `DELETE /api/orders/:id` — Delete order

## 📄 Pages
- `GET /api/pages/:slug` — Get page content by slug
- `POST /api/pages/` — Create new page
- `PUT /api/pages/:slug` — Update page content (admin)

## 📬 Newsletter
- `POST /api/newsletter/subscribe` — Subscribe to newsletter
- `POST /api/newsletter/send` — Send newsletter (admin)

## 🧾 Contact
- `POST /api/contact` — Send contact message

## 👥 Users
- `GET /api/users` — Get all users (superadmin only, logs access)
- `PATCH /api/users/:id/role` — Change user role (superadmin only, logs action)
- `DELETE /api/users/:id` — Delete user (superadmin only, logs action)

## 🌐 Webhook
- `POST /api/webhook/stripe` — Stripe payment webhook

---

🔐 **Notes:**
- Routes like `POST /books`, `PUT /pages/:slug`, `GET /users` are protected and require admin/superadmin roles.
- Superadmin activity is logged in `logs/superadmin.log` via `logger.js`.
- Google Auth is handled via `auth/google` and `auth/google/callback`.
