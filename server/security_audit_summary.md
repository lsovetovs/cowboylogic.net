
# 🛡️ Security Audit Summary — Cowboylogic Strategies / Publishing

📅 Date / Дата: 2025-05-22

---

## ✅ Main Security Mechanisms / Основні механізми безпеки

### 🔐 JWT Authentication / JWT-автентифікація
- Protected routes verify tokens via `protect` middleware.
- Token is extracted from the `Authorization` header.
- If the user is not found — request is rejected (401).
- On success, `req.user` includes `id`, `email`, `role`, `isSuperAdmin`.

- Захищені маршрути перевіряють токен через middleware `protect`.
- Токен зчитується з заголовка `Authorization`.
- Якщо користувача не знайдено — повертається помилка 401.
- У разі успіху `req.user` містить `id`, `email`, `role`, `isSuperAdmin`.

---

### 🧠 Roles & Authorization / Ролі та авторизація
- Roles: `user`, `admin`, `superadmin` as defined in the `User` model.
- `isAdmin` and `isSuperAdmin` middlewares enforce access control.
- `requireRole([roles])` provides flexible multi-role checks.

- Ролі: `user`, `admin`, `superadmin` згідно з моделлю `User`.
- Middleware `isAdmin` і `isSuperAdmin` контролюють доступ.
- `requireRole([roles])` дозволяє перевірку доступу для кількох ролей.

---

### 🚫 Rate Limiting / Обмеження частоти запитів
- `POST /auth/login` is protected by `authLimiter.js` (10 attempts per 15 min).
- Prevents brute-force password guessing.

- `POST /auth/login` захищено через `authLimiter.js` (10 спроб за 15 хв).
- Захищає від брутфорс-атак.

---

### 📝 Logging / Логування
- `protect` middleware logs user activity: email, role, method, and route.
- Critical superadmin actions are logged to `logs/superadmin.log`.

- Middleware `protect` веде логування дій: email, роль, метод і маршрут.
- Важливі дії супер адміна логуються у `logs/superadmin.log`.

---

## 🔧 Middleware Overview / Огляд middleware

| Name / Назва           | Description / Опис                                      |
|------------------------|----------------------------------------------------------|
| `protect`              | Verifies JWT, sets `req.user` / Перевіряє JWT, зберігає користувача |
| `isAdmin`              | Restricts to role "admin" / Доступ лише для "admin"      |
| `isSuperAdmin`         | Restricts to superadmins / Доступ лише для супер адмінів |
| `requireRole([...])`   | Flexible role check / Гнучка перевірка ролей            |
| `authLimiter`          | Rate limit for login / Обмеження частоти запитів до логіну |

---

## 📁 Superadmin Logging / Логування супер адміна

- Path / Шлях: `logs/superadmin.log`
- Logs actions: role changes, `/users` access, deletions.
- Format / Формат: `[timestamp] SuperAdmin: email performed "action" on target`

---

## 🛡 Summary / Висновок

The system adheres to core security practices:
- Authentication and user identity protection
- Brute-force protection via rate limiting
- Role-based access control
- Centralized logging for auditing

Система відповідає ключовим практикам безпеки:
- Надійна автентифікація та захист особистих даних
- Захист від брутфорсу через обмеження частоти
- Контроль доступу за ролями
- Централізоване логування для аудиту


### ✅ Two-Factor Auth (2FA)
- Email-based code sent via `POST /auth/request-code`
- Verification via `POST /auth/verify-code`
- Login attempt logged, and code expires after 5 minutes