# Зависимости и совместимость

Проверено 9 сентября 2026 года по официальному реестру npm, списку релизов Node.js
и официальным образам Docker. Точные npm-версии находятся в `package.json`, дерево
установки — в `package-lock.json`; версии контейнеров закреплены в `Dockerfile`.

| Компонент            | Выбранная версия   | Причина                                                                                  |
| -------------------- | ------------------ | ---------------------------------------------------------------------------------------- |
| Node.js              | 24.20.0 LTS        | Последний LTS-релиз на дату подготовки; системный 20.11.0 слишком стар для текущего Vite |
| npm                  | 11.19.0            | Поставляется с выбранным Node.js                                                         |
| React / React DOM    | 19.2.8             | Текущие стабильные версии registry, одинаковая версия для обоих пакетов                  |
| Vite                 | 8.2.2              | Текущий стабильный релиз                                                                 |
| Vite React plugin    | 6.1.1              | Текущий стабильный релиз с поддержкой Vite 8                                             |
| TypeScript           | 6.0.3              | Последний стабильный релиз в поддерживаемом диапазоне typescript-eslint                  |
| typescript-eslint    | 8.70.0             | Текущий стабильный релиз; peer TypeScript `>=4.8.4 <6.1.0`                               |
| ESLint               | 10.10.0            | Текущий стабильный релиз, поддерживается выбранными плагинами                            |
| Prettier             | 3.9.6              | Текущий стабильный релиз                                                                 |
| Playwright Test      | 1.63.0             | Текущий стабильный релиз                                                                 |
| react-error-boundary | 6.1.5              | Текущий стабильный релиз, поддерживает React 19                                          |
| @types/node          | 24.13.3            | Последний релиз типов в ветке используемого Node.js 24                                   |
| Node Docker image    | 24.20.0-alpine3.23 | Совпадает с `.node-version`; используется только на этапе сборки                         |
| Nginx Docker image   | 1.30.4-alpine3.24  | Текущая стабильная ветка Nginx; раздаёт только production-ассеты                         |

## Временное ограничение TypeScript

`typescript@latest` на дату проверки — 7.0.2, но `typescript-eslint@8.70.0`
объявляет поддержку только `>=4.8.4 <6.1.0`. Поэтому выбран TypeScript 6.0.3.
Это явное ограничение совместимости, а не обход проверки установки.
При обновлении проверь поддержку TypeScript 7 в typescript-eslint и затем
обнови компилятор, если весь набор проходит `npm run check`.

Не используй `--force` / `--legacy-peer-deps` и не отключай engine-проверку.

## Источники и повторная проверка

- [Политика и актуальные релизы Node.js](https://nodejs.org/en/about/previous-releases)
- [Официальный индекс релизов Node.js](https://nodejs.org/dist/index.json)
- [Требования Vite](https://vite.dev/guide/)
- [Версии React](https://react.dev/versions)
- [Метаданные React](https://registry.npmjs.org/react/latest)
- [Метаданные Vite](https://registry.npmjs.org/vite/latest)
- [Метаданные TypeScript](https://registry.npmjs.org/typescript/latest)
- [Контракт typescript-eslint 8.70.0](https://registry.npmjs.org/typescript-eslint/8.70.0)
- [Установка Playwright](https://playwright.dev/docs/intro)
- [Официальный образ Node.js](https://hub.docker.com/_/node)
- [Официальный образ Nginx](https://hub.docker.com/_/nginx)

```sh
npm view react version
npm view vite version engines
npm view typescript version
npm view typescript-eslint version peerDependencies
npm outdated
```

Проверяй совместимость всего набора, фиксируй выбранные версии и обновляй lockfile
через npm. `npm ci` воспроизводит зафиксированное дерево и не подбирает версии заново.
