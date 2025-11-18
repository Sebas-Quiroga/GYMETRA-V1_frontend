# ----------- BUILD STAGE -----------
FROM node:18 AS build
WORKDIR /app

# Copiar dependencias
COPY package*.json ./
RUN npm install

# Copiar proyecto completo
COPY . .

# Compilar Ionic + Vue
RUN npm run build

# ----------- SERVE STAGE -----------
FROM nginx:alpine

# Copiar build final al servidor NGINX
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto interno que usará NGINX
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
