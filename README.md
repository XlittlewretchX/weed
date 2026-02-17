# Wedding Invite (React)

Одностраничное React-приложение — приглашение на свадьбу: фотографии, текст, место проведения, расписание, анкета гостя и ссылка на чат в Telegram.

## Стек

- **React** (Create React App)
- **CSS** без UI-библиотек

## Запуск проекта

```bash
npm install
npm start
```

Приложение откроется по адресу [http://localhost:3000](http://localhost:3000).

## Структура страницы

1. Пара фотографий (PhotoPair)
2. Имена и сердечко (PlusText)
3. Блоки текста (MainText, Text)
4. Одиночные фото с рамкой или без (PhotoSingle)
5. Дата и календарь
6. Карточка места проведения (LocationCard) с адресом и ссылкой на карты
7. Расписание дня (Schedule)
8. Дресс-код и палитра
9. Кнопка перехода в чат Telegram (TelegramButton)
10. Анкета гостя (GuestForm)
11. Финальное фото и подпись

По мере прокрутки блоки плавно появляются (анимация ScrollReveal). На фоне отображаются декоративные сердечки (BackgroundHearts).

## Компоненты

| Компонент | Описание |
|-----------|----------|
| **PhotoCard** | Карточка с рамкой, фото и подписью (title, description). Поддержка горизонтальных фото (`isLandscape`). |
| **PhotoPair** | Две перекрывающиеся PhotoCard с лёгким наклоном. |
| **PhotoSingle** | Одна фотография: с рамкой (`withFrame={true}`) или просто изображение (`withFrame={false}`). |
| **PlusText** | Две строки текста и изображение (например, имена + «=» + сердечко). |
| **MainText** | Крупный заголовок. |
| **Text** | Обычный текст с переносом по ширине. |
| **LocationCard** | Карточка места: заголовок, фото, адрес со ссылкой. Анимация при наведении. |
| **Schedule** | Список «время — описание» в виде карточки. |
| **TelegramButton** | Кнопка-ссылка в Telegram (иконка + текст). Проп `href` — URL или username. |
| **GuestForm** | Анкета: имя, посещение, количество гостей, предпочтения по алкоголю (чекбоксы-сердечки), комментарий. Отправка через Formspree. |
| **ScrollReveal** | Обёртка для анимации появления при скролле. Пропы: `delay`, `direction` (`up` \| `left` \| `right`). |
| **BackgroundHearts** | Фоновый слой со случайно разбросанными сердечками. Проп `count`. |

## Анкета гостя и приём ответов

Ответы анкеты уходят через [Formspree](https://formspree.io) (без своего бэкенда).

1. Зарегистрируйтесь на [formspree.io](https://formspree.io).
2. Создайте форму и скопируйте адрес вида `https://formspree.io/f/xxxxxxxx`.
3. В `App.jsx` в компоненте `GuestForm` укажите этот адрес в пропе `action`:

```jsx
<GuestForm
  action="https://formspree.io/f/ваш_id"
  title="Анкета гостя"
  submitLabel="Отправить"
/>
```

Ответы будут приходить на email, привязанный к аккаунту Formspree.

## Статика (картинки)

Изображения кладите в `public/image/` и подключайте так:

```jsx
src="/image/имя_файла.jpg"
```

## Адаптив и UX/UI

- Единый брейкпоинт для мобильных: **600px**.
- Учтены safe-area (вырезы, островки) на телефонах.
- Кнопки и чекбоксы не меньше 44–48px по высоте для удобного нажатия.
- Размер шрифта в полях ввода не меньше 16px (избегаем автозума на iOS).
- Поддержка `prefers-reduced-motion` для анимаций.

## Продакшн-сборка

```bash
npm run build
```

Результат в папке `build` — можно выкладывать на любой статичный хостинг.

## Деплой на GitHub Pages

1. **Укажите свой GitHub-username** в `package.json`: замените `YOUR_USERNAME` в поле `homepage` на ваш логин (например, `"homepage": "https://johndoe.github.io/weed"`).

2. **Создайте репозиторий** на GitHub и запушьте проект (если ещё не сделано):
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/weed.git
   git push -u origin main
   ```

3. **Опубликуйте сайт**:
   ```bash
   npm run deploy
   ```
   Скрипт соберёт проект и зальёт содержимое папки `build` в ветку `gh-pages`. GitHub начнёт отдавать сайт по адресу **https://YOUR_USERNAME.github.io/weed/** (иногда нужно подождать 1–2 минуты и при необходимости включить Pages в настройках репозитория: Settings → Pages → Source: Deploy from branch → ветка `gh-pages`).

При следующих изменениях достаточно снова выполнить `npm run deploy`.

## Скрипты (Create React App)

- `npm start` — режим разработки с hot reload.
- `npm run build` — сборка для продакшена.
- `npm test` — запуск тестов.

Подробнее: [документация Create React App](https://create-react-app.dev/docs/getting-started).
