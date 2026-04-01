# ─────────────────────────────────────────────
# Stage 1: Build da aplicação React/Vite
# ─────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copia os arquivos de dependências e instala
COPY package*.json ./
RUN npm ci

# Copia o restante do código-fonte e realiza o build
COPY . .
RUN npm run build

# ─────────────────────────────────────────────
# Stage 2: Servir com Nginx
# ─────────────────────────────────────────────
FROM nginx:alpine AS runtime

# Copia os arquivos gerados pelo build
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia a configuração customizada do Nginx (a partir do stage builder)
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
