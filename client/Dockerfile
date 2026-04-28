# Базовый образ для разработки (hot-reload)
FROM node:22-alpine AS dev

WORKDIR /app

# копируем package.json
COPY package*.json ./

# ставим зависимости
RUN npm ci

# копируем проект
COPY . .

# порт vite
EXPOSE 5173

# запуск dev сервера
CMD ["npm", "run", "dev", "--host"]