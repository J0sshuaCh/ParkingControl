# Etapa 1: Instalación y Build (si fuera TS)
FROM node:22-alpine AS build
WORKDIR /app

RUN corepack enable pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --ignore-scripts && pnpm rebuild bcrypt

COPY . .

EXPOSE 8800
CMD ["pnpm", "start"]
