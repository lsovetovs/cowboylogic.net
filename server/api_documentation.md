# 📘 API Documentation — Cowboylogic Strategies / Publishing

This documentation describes all available REST API endpoints for the backend of Cowboylogic. It follows best practices for clarity, consistency, and role-based access awareness.

---

## 🌐 Base URL

- **Local**: `http://localhost:5000/api`
- **Production**: `http://clpit.duckdns.org:64660/api`

---

## 🔐 Authentication Endpoints (`/auth`)

| Method | Endpoint                    | Description                              | Access        |
|--------|-----------------------------|------------------------------------------|----------------|
| POST   | `/auth/register`            | Register new user                        | Public         |
| POST   | `/auth/login`               | Login with email and password            | Public         |
| POST   | `/auth/request-code`        | Request 2FA verification code            | Public         |
| POST   | `/auth/verify-code`         | Verify 2FA code and receive JWT token    | Public         |
| POST   | `/auth/logout`              | Invalidate JWT token                     | Authenticated  |
| GET    | `/auth/me`                  | Get current user info                    | Authenticated  |
| GET    | `/auth/google`              | Initiate Google login                    | Public         |
| GET    | `/auth/google/callback`     | Google login callback                    | Public         |

---

## 📚 Book Endpoints (`/books`)

| Method | Endpoint        | Description         | Access       |
|--------|-----------------|---------------------|--------------|
| GET    | `/books`        | Get all books       | Public       |
| GET    | `/books/:id`    | Get book by ID      | Public       |
| POST   | `/books`        | Create book         | Admin only   |
| PUT    | `/books/:id`    | Update book         | Admin only   |
| DELETE | `/books/:id`    | Delete book         | Admin only   |

---

## 🛒 Cart Endpoints (`/cart`)

| Method | Endpoint        | Description                  | Access         |
|--------|-----------------|------------------------------|----------------|
| GET    | `/cart`         | Get user's cart              | Authenticated  |
| POST   | `/cart`         | Add item to cart             | Authenticated  |
| PATCH  | `/cart/:id`     | Update item quantity         | Authenticated  |
| DELETE | `/cart/:id`     | Remove item from cart        | Authenticated  |
| DELETE | `/cart`         | Clear entire cart            | Authenticated  |

---

## 📦 Order Endpoints (`/orders`)

| Method | Endpoint            | Description               | Access         |
|--------|---------------------|---------------------------|----------------|
| GET    | `/orders`           | Get current user's orders | Authenticated  |
| GET    | `/orders/all`       | Get all orders            | Admin only     |
| POST   | `/orders`           | Create a new order        | Authenticated  |
| PATCH  | `/orders/:id/status`| Update order status       | Admin only     |
| DELETE | `/orders/:id`       | Delete an order           | Admin only     |

---

## 📄 Page Endpoints (`/pages`)

| Method | Endpoint         | Description                       | Access       |
|--------|------------------|-----------------------------------|--------------|
| GET    | `/pages/:slug`   | Get page content by slug          | Public       |
| POST   | `/pages`         | Create new page                   | Admin only   |
| PUT    | `/pages/:slug`   | Update existing page content      | Admin only   |

---

## 📬 Newsletter Endpoints (`/newsletter`)

| Method | Endpoint               | Description              | Access       |
|--------|------------------------|--------------------------|--------------|
| POST   | `/newsletter/subscribe`| Subscribe to newsletter  | Public       |
| POST   | `/newsletter/send`     | Send newsletter          | Admin only   |

---

## 🧾 Contact Endpoint (`/contact`)

| Method | Endpoint      | Description              | Access       |
|--------|---------------|--------------------------|--------------|
| POST   | `/contact`    | Send contact form data   | Public       |

---

## 👥 User Management (`/users`) — SuperAdmin Only

| Method | Endpoint                 | Description              | Access         |
|--------|--------------------------|--------------------------|----------------|
| GET    | `/users`                | Get all users            | SuperAdmin     |
| PATCH  | `/users/:id/role`       | Update user role         | SuperAdmin     |
| DELETE | `/users/:id`            | Delete user              | SuperAdmin     |

---

## 🔔 Stripe Webhook (`/webhook/stripe`)

| Method | Endpoint              | Description                         | Access   |
|--------|-----------------------|-------------------------------------|----------|
| POST   | `/webhook/stripe`     | Stripe payment webhook handler      | Stripe   |

### 📦 Example Payload

```json
{
  "id": "evt_1OaL5hK2hZTf5aAbcXJjIYbY",
  "type": "payment_intent.succeeded",
  "data": {
    "object": {
      "id": "pi_3OaL4xK2hZTf5aAb1GJhUYd2",
      "amount": 2500,
      "currency": "usd",
      "status": "succeeded",
      "metadata": {
        "userId": "42",
        "bookId": "17"
      }
    }
  }
}
```

### 🔒 Security Notes
- Always verify Stripe signature using your Stripe secret.
- Process `payment_intent.succeeded` events only.
- Log and handle any mismatches or errors.

---

## 🧩 Notes
- All admin and superadmin routes are protected by middleware (`isAdmin`, `isSuperAdmin`, `requireRole`).
- 2FA flow requires `request-code` then `verify-code`.
- JWT-based sessions use `Authorization: Bearer <token>`.
- Superadmin activity is logged in `logs/superadmin.log`.

---

_Last updated: 2025-05-23_