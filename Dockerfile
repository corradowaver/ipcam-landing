# syntax=docker/dockerfile:1.7

FROM node:24.20.0-alpine3.23 AS build

WORKDIR /app

COPY package.json package-lock.json .npmrc ./
RUN npm ci

COPY index.html vite.config.ts playwright.config.ts tsconfig*.json ./
COPY src ./src
RUN npm run build

FROM nginx:1.30.4-alpine3.24 AS runtime

COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
