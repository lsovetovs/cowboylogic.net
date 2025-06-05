# ✅ TODO для фронту / Frontend TODO (v2025-06-05, revised)

## 🔐 Аутентифікація / Authentication
- [x] Login + 2FA
- [x] Google Login
- [x] Role-based routes (PrivateRoute, AdminRoute реалізовані)
- [ ] Form validation (ResetPasswordForm, ContactForm, EditBookForm не перевіряють дані)

## 🌍 Мультимовність / i18n
- [x] LoginForm, RegisterForm, Header, Footer вже перекладено
- [ ] Перекласти інші компоненти (CartPage, AdminDashboard, Orders...)
- [ ] Перекласти модалки (ImageInsertModal, TableInsertModal...)

## 🧱 Redux
- [x] Redux Toolkit реалізовано
- [x] Слайси: auth, cart, book, page, notification
- [x] Provider підключено в main.jsx

## ✍️ Editable Pages
- [x] EditablePage, Toolbar, Image/Link/Table модалки
- [x] Save зникає після збереження (whiteBackground реалізовано)
- [ ] Додати попередження перед вставкою (confirm modal)
- [ ] Перекласти інтерфейс вставки зображень

## 🧪 Тестування / Testing
- [ ] Налаштувати Vitest або React Testing Library
- [ ] Написати базові тести для slices і компонентів (наприклад: Cart, LoginForm)

## 💳 Stripe Integration
- [x] Webhook endpoint реалізовано на бекенді
- [x] SuccessPage, CancelPage створено
- [ ] Додати повідомлення / індикацію успішної оплати
- [ ] Додати логіку очищення кошика після замовлення

## ⚙️ Оптимізація / Enhancements
- [ ] MIME-валидація при вставці файлів (через модалку)
- [ ] Додати alt-тексти для зображень (SEO)
- [ ] Використовувати react-helmet для SEO
- [ ] Додати локальне кешування кошика (optional)
