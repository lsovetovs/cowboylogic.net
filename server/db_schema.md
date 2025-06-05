# Database Schema Reference

This file describes the Sequelize models used in the project.

---

## 📘 Book
- `id`: INTEGER, primary key
- `title`: STRING
- `author`: STRING
- `description`: TEXT
- `price`: DECIMAL
- `imageURL`: STRING
- Associations: belongsToMany Orders (via OrderItem)

## 🧺 CartItem
- `id`: INTEGER, primary key
- `userId`: INTEGER
- `bookId`: INTEGER
- `quantity`: INTEGER
- Associations: belongsTo User, belongsTo Book

## 📦 Order
- `id`: INTEGER, primary key
- `userId`: INTEGER
- `totalPrice`: DECIMAL
- `status`: STRING (e.g. 'pending', 'completed')
- Associations: hasMany OrderItem

## 📚 OrderItem
- `id`: INTEGER, primary key
- `orderId`: INTEGER
- `bookId`: INTEGER
- `quantity`: INTEGER
- `price` : FLOAT
- Associations: belongsTo Order, belongsTo Book

## 📄 Page
- `id`: INTEGER, primary key
- `slug`: STRING (unique)
- `content`: TEXT
- Associations: none

## 📧 Subscriber
- `id`: INTEGER, primary key
- `email`: STRING
- Associations: none

## 👤 User
- `id`: INTEGER, primary key
- `email`: STRING (unique)
- `password`: STRING (hashed)
- `role`: ENUM ('user', 'admin', 'superadmin')
- `isSuperAdmin` : BOOLEAN
- Associations: hasMany CartItem, hasMany Orders

---

🧩 All foreign keys are set with associations in the Sequelize models.
🛡 SuperAdmin should not be deletable and has higher privileges.

## 🔑 LoginCode
- `id`: INTEGER, primary key
- `email`: STRING
- `code`: STRING
- `expiresAt`: DATE
- Associations: none
