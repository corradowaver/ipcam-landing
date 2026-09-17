# GitHub Pages

Адрес публикации: <https://corradowaver.github.io/ipcam-landing/>.

Workflow `.github/workflows/pages.yml` публикует сайт после push в `master`.
Повторный запуск доступен через Actions → Deploy landing to GitHub Pages → Run workflow.
Сначала выполняются `npm ci`, установка Chromium, `npm run check` и
`npm run test:pages`. Только успешная сборка передаётся в GitHub Pages.
Node.js берётся из `.node-version`; версии официальных Actions закреплены SHA.
Дополнительные токены или секреты для публикации не нужны.

## Первоначальная настройка GitHub

В Settings → Pages → Build and deployment выбери Source: **GitHub Actions**.
Для приватного репозитория GitHub требует тариф с поддержкой Pages;
на GitHub Free репозиторий должен быть публичным.
Сам сайт Pages публикуется для всех посетителей.

## Сборка и маршруты

```sh
npm run build:pages
npm run test:pages
```

Режим `pages` в Vite задаёт базовый адрес `/ipcam-landing/`. Навигация,
логотип, кнопки переходов и возврат с 404 используют этот адрес.
Список путей находится в `src/app/route-paths.ts`: его используют и
приложение, и сборка статических входных HTML-файлов.

После сборки `dist` содержит `index.html`, `404.html`, ассеты и отдельный
`index.html` для каждой из четырёх внутренних страниц. Поэтому прямой переход
и reload `/ipcam-landing/services/` работают без серверного SPA fallback.
GitHub добавляет завершающий `/` к адресам каталогов; приложение понимает
обе формы URL. Неизвестный адрес возвращает HTTP 404 с навигацией сайта.
Это клиентское приложение: дополнительные HTML-входы не являются SSR.

`test:pages` собирает Pages-версию и проверяет её на обычном статическом сервере
без SPA fallback (`scripts/serve-pages.js`, порт 4175). Playwright проверяет
прямые входы, обновление всех пяти страниц, загрузку изображений, тему,
историю переходов, якоря и 404 на desktop и мобильном viewport.

Команды `build` и Docker сохраняют корневой базовый адрес `/`.
Обе сборки записываются в `dist`: перед локальным просмотром корневой версии
после Pages-тестов повтори `npm run build`.

## Содержание публикации

В Pages-артефакт попадает только `dist`, без исходников макетов и документации.
Форма остаётся локальной, без отправки данных. Индексация остаётся отключённой
через `noindex, nofollow`, пока демонстрационные цены и кейсы не заменены
утверждённым содержанием.

Официальные инструкции:
[Vite: GitHub Pages](https://vite.dev/guide/static-deploy.html#github-pages),
[GitHub: custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
