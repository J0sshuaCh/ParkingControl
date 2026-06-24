# Etapa 1: Instalación y Build (si fuera TS)
FROM node:20-alpine AS build
WORKDIR /app

RUN corepack enable pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

COPY . .

EXPOSE 8800
CMD ["pnpm", "start"]
