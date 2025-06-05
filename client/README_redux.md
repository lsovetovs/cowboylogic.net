# 🧩 Redux in CowboyLogic

## 🇺🇸 English

We use Redux Toolkit for global state: cart, books, pages, notifications, auth.

## 🇺🇦 Українською

Ми використовуємо Redux Toolkit для глобального стану: кошик, книги, сторінки, нотифікації, автентифікація.

### Slices:
- `authSlice.js`
- `cartSlice.js`
- `bookSlice.js`
- `pageSlice.js`
- `notificationSlice.js`

All connected via `store.jsx` and wrapped in `<Provider>` in `main.jsx`.
