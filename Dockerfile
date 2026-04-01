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

# Configuração do Nginx embutida inline (sem dependência de arquivo externo)
RUN printf 'server {\n\
    listen 80;\n\
    server_name _;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
\n\
    gzip on;\n\
    gzip_vary on;\n\
    gzip_proxied any;\n\
    gzip_comp_level 6;\n\
    gzip_types text/plain text/css text/xml application/json application/javascript application/xml+rss application/atom+xml image/svg+xml;\n\
\n\
    location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|webp|avif)$ {\n\
        expires 1y;\n\
        add_header Cache-Control "public, immutable";\n\
        access_log off;\n\
    }\n\
\n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
