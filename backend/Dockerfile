# Etapa 1: Instalación y Build (si fuera TS)
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 8800
CMD ["npm", "start"]
