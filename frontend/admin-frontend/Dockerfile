# ----------- BUILD STAGE -----------
FROM node:18 AS build
WORKDIR /app

# Copiar dependencias
COPY package*.json ./
RUN npm install

# Copiar todo el código fuente
COPY . .

# Compilar Vue
RUN npm run build

# ----------- SERVE STAGE -----------
FROM nginx:alpine

# Copiar build generado al NGINX
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer puerto interno
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
