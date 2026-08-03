# KRES

Персональный сайт-визитка Nastya Kres. React + Vite + Tailwind CSS + Framer Motion.

## Запуск

Нужен [Node.js 20+](https://nodejs.org).

```bash
npm install
```

```bash
npm run dev
```

Сайт откроется на `http://localhost:5173`.

Сборка в папку `dist`:

```bash
npm run build
```

## Что где менять

| Задача                | Файл                                     |
| --------------------- | ---------------------------------------- |
| Ссылки и тексты карточек | `src/data/links.js`                   |
| Имя, описание, чипы   | `src/data/profile.js`                    |
| Фотографии и стикеры  | `src/assets/images/` (см. README внутри) |
| Цвета и шрифты        | `tailwind.config.js`                     |
| Анимации              | `src/lib/motion.js`                      |
| Атмосферы карточек    | `src/components/CardAtmosphere.jsx`      |

**Порядок карточек** = порядок массива в `src/data/links.js`.
Поле `featured: true` делает карточку широкой на десктопе (сейчас — YouTube).

## Картинки

Фоны и стикеры подключаются по имени файла, без импортов в коде.
Положил `youtube.webp` в `src/assets/images/` — карточка сразу его показывает.
Подробности: [`src/assets/images/README.md`](src/assets/images/README.md).

Пока файлов нет, каждая карточка рисует собственную анимированную атмосферу
(океан с китом, неоновая лаборатория, городские огни и т.д.) — сайт выглядит
законченным и без фотографий.

## Деплой

### Netlify

Всё уже настроено в `netlify.toml`. Подключи репозиторий — Netlify сам
подставит команду и папку. Либо вручную:

- Build command: `npm run build`
- Publish directory: `dist`

### Cloudflare Pages

- Framework preset: **Vite**
- Build command: `npm run build`
- Build output directory: `dist`
- Environment variable: `NODE_VERSION` = `20`

Заголовки кэширования лежат в `public/_headers` — работают на обеих платформах.

## Особенности

- Полностью адаптивно: одна колонка на телефоне, две на десктопе.
- Уважает `prefers-reduced-motion` — анимации отключаются системно.
- Анимации только на `transform` / `opacity` / `filter` → плавно на мобильных.
- Внешние ссылки открываются с `rel="noopener noreferrer"`.
- Шрифт Inter грузится с Google Fonts, есть системный фолбэк.
