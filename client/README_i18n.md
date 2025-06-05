# 🌍 i18n Customization Guide / Гайд по мультимовності

## 1. File Structure / Структура
- Config: `src/i18n.js`
- Translations: `public/locales/{lang}/translation.json`

## 2. Usage / Використання
```js
import { useTranslation } from 'react-i18next';
const { t } = useTranslation();
<h1>{t('home.title')}</h1>
```

## 3. Add New Language / Додавання мови
- Create `public/locales/{newLang}/translation.json`
- Add language to `LanguageSwitcher.jsx`

## 4. Don't hardcode / Уникайте захардкоженого тексту
