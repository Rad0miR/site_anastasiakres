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

| Задача                     | Файл                                     |
| -------------------------- | ---------------------------------------- |
| Ссылки и подписи карточек  | `src/data/links.js`                      |
| Имя, описание, тексты кнопок | `src/data/profile.js`                  |
| Фотографии                 | `src/assets/images/` (см. README внутри) |
| Цвета и шрифты             | `tailwind.config.js`                     |
| Анимации                   | `src/lib/motion.js`                      |

**Порядок карточек** = порядок массива в `src/data/links.js`.
Поле `badge` рисует розовую плашку в углу карточки (сейчас — «Главная» у YouTube).

## Картинки

Подключаются по имени файла, без импортов в коде: положил `youtube.webp`
в `src/assets/images/` — карточка сразу его показывает. Расширение любое.
Подробности: [`src/assets/images/README.md`](src/assets/images/README.md).

## Раскладка

- **Телефон** — одна колонка, карточки 16:10, страница прокручивается.
- **Планшет** — две колонки.
- **Десктоп (от 1024px)** — высота ровно в экран: шапка, главный блок,
  сетка 3 × 2 и подвал. Все шесть соцсетей видны **без прокрутки**;
  карточки сами тянутся по высоте под размер окна.

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

- Уважает `prefers-reduced-motion` — движение гасится и в CSS, и в Framer Motion.
- Анимации только на `transform` / `opacity` → плавно на мобильных.
- Внешние ссылки открываются с `rel="noopener noreferrer"`.
- Шрифты Inter, Playfair Display и Marck Script грузятся с Google Fonts,
  есть системный фолбэк.
