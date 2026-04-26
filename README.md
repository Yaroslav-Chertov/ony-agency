# ONY — карьерная страница

> Карьерная страница ведущей дизайн-студии: вакансии, команда, форма отклика. SSR на Express + интеграция Bitrix API, уведомления в Telegram. Lighthouse 90+.

**Продакшн:** [join.ony.ru](https://join.ony.ru)

---

## О проекте

Карьерная страница для ONY — одной из ведущих дизайн-студий России. Задача: дать кандидатам актуальную информацию о вакансиях и команде, принимать отклики без ручного обновления контента.

Основная инженерная задача: интеграция с Bitrix API для динамической загрузки вакансий и маршрутизации откликов, плюс SSR для SEO и скорости загрузки.

---

## Стек

| Слой | Технология |
|---|---|
| UI | JavaScript, JSX (jtsx-loader) |
| Стили | SCSS (Sass) |
| Сервер | Node.js, Express 4 |
| Сборка | Gulp 5, esbuild |
| Анимации | Lottie Web |
| Слайдеры | Swiper, Tiny Slider |
| Формы | Inputmask, Validator.js |
| Уведомления | Telegraf (Telegram Bot API) |
| Интеграция | Bitrix API |
| Безопасность | Helmet |
| Линтинг | ESLint 9, eslint-plugin-jsx-a11y |

---

## Архитектура

```
src/
├── components/         # UI-компоненты (карточки вакансий, форма отклика, команда)
├── sections/           # Секции страницы
├── styles/             # Глобальные SCSS + модули по компонентам
├── api/                # Интеграция с Bitrix API
└── server/
    └── app.js          # Express SSR + роутинг + обработка форм
gulp.dev.js             # Конфигурация сборки (Gulp + esbuild)
```

**Ключевые решения:**

- **SSR на Express** — страницы рендерятся на сервере. Вакансии и данные команды доступны краулерам без JS, что критично для SEO карьерной страницы.
- **Bitrix API как источник данных** — вакансии загружаются динамически. HR обновляет данные в Bitrix — сайт отражает изменения без деплоя.
- **Telegram-уведомления через Telegraf** — отклики из формы дублируются в Telegram-бот рекрутинговой команды для оперативной обработки.
- **Helmet** — базовая защита Express-сервера: CSP, XSS-заголовки, скрытие fingerprint-информации.
- **Gulp + esbuild** — кастомный билд-пайплайн с полным контролем над обработкой ассетов.

---

## Интеграция с Bitrix API

- Динамическая загрузка актуальных вакансий — данные всегда актуальны без ручного обновления сайта
- Отправка откликов из формы напрямую в Bitrix CRM
- SSR-рендеринг данных вакансий — контент индексируется поисковиками

---

## Форма отклика

- Валидация полей через Validator.js на сервере
- Маскирование ввода через Inputmask (телефон, дата)
- Отправка данных в Bitrix API
- Дублирование уведомления в Telegram через Telegraf
- Обработка загрузки файлов (резюме) через express-fileupload

---

## Производительность

| Метрика | Результат |
|---|---|
| Lighthouse Performance | 90+ |
| Стратегия рендеринга | SSR (Express) |
| JS-бандл | esbuild, tree-shaking |

Применённые оптимизации:
- Lottie-анимации загружаются только при приближении к секции
- Критический CSS инлайнится, остальное загружается асинхронно
- Оптимизация и сжатие изображений в билд-пайплайне

---

## Локальный запуск

```bash
# Установка зависимостей
npm install

# Настройка окружения
cp .env.example .env
# Заполнить: BITRIX_API_URL, BITRIX_API_KEY, TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID

# Dev-сервер с hot reload
npm run dev

# Продакшн-сборка
npm run build

# Запуск сервера
npm run server
```

---

## Переменные окружения

| Переменная | Описание |
|---|---|
| `BITRIX_API_URL` | URL Bitrix REST API |
| `BITRIX_API_KEY` | Ключ доступа к Bitrix API |
| `TELEGRAM_BOT_TOKEN` | Токен Telegram-бота для уведомлений |
| `TELEGRAM_CHAT_ID` | ID чата для получения откликов |

---

## Что в планах

- Фильтрация вакансий по направлению и формату работы
- Страница отдельной вакансии с динамическим роутингом
- Улучшение доступности (a11y) — ARIA-атрибуты, keyboard navigation
- Кеширование ответов Bitrix API для снижения нагрузки

---

## Другие проекты

- [Structura — SaaS-планер продуктивности](https://github.com/Yaroslav-Chertov/structura) — Next.js 16, React 19, TypeScript, ЮКасса, Resend
- [GALITSKIY & GALITSKIY](https://github.com/Yaroslav-Chertov/galitskiy-and-galitskiy) — Vue 3, кастомный scroll-controller, Lighthouse 90+
- [Стажер Онлайн — HR-платформа](https://github.com/Yaroslav-Chertov/hr-platform) — Vue.js + SCSS + Django + REST API
- [Movies Explorer](https://github.com/Yaroslav-Chertov/movies-explorer-frontend) — Fullstack: React + Node.js + Express + MongoDB + JWT
