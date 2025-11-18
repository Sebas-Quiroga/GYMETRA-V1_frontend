###############################
# Etapa 1: Build
###############################
FROM node:20-alpine AS build
WORKDIR /app

# Copiar dependencias
COPY package*.json ./

# Instalar dependencias (más rápido y seguro en prod)
RUN npm ci

# Copiar todo el código
COPY . .

# Compilar Ionic + Vue
RUN npm run build


###############################
# Etapa 2: Servidor NGINX
###############################
FROM nginx:1.27-alpine

# Copiar build final al servidor NGINX
COPY --from=build /app/dist /usr/share/nginx/html

# Eliminar configuración default y agregar config para SPA (Vue/Ionic)
RUN rm /etc/nginx/conf.d/default.conf

# Config SPA con rutas correctas para Ionic + Vue
COPY <<'EOF' /etc/nginx/conf.d/app.conf
server {
    listen 80;
    server_name _;

    root /usr/share/nginx/html;
    index index.html;

    # Manejo correcto de rutas para SPA
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Archivos estáticos con caché para mejorar rendimiento
    location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico)$ {
        expires 30d;
        add_header Cache-Control "public, max-age=2592000";
    }

    # Seguridad
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
EOF

# Exponer el puerto del contenedor
EXPOSE 80

# Ejecutar NGINX
CMD ["nginx", "-g", "daemon off;"]
