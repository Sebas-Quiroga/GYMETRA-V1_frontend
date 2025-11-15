###############################
# Etapa 1: Dependencias base
###############################
FROM node:20-alpine AS deps
WORKDIR /app
ARG BUILD_TIME
ARG GIT_COMMIT

COPY package*.json ./
COPY tsconfig.json ./
COPY vite.config.ts ./

# Instalar TODAS las dependencias (prod+dev) para permitir build correcto
# Usar cache mount para npm para acelerar builds subsecuentes
RUN --mount=type=cache,target=/root/.npm \
    npm ci --prefer-offline

###############################
# Etapa 2: Build
###############################
FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app /app
COPY src src
COPY index.html ./

ENV NODE_ENV=production
RUN npm run build

###############################
# Etapa 3: Runtime Node.js para desarrollo
###############################
FROM node:20-alpine AS runtime
WORKDIR /app

ARG GIT_COMMIT
ARG BUILD_TIME
LABEL org.opencontainers.image.title="admin-frontend" \
      org.opencontainers.image.source="https://github.com/Sebas-Quiroga/GYMETRA-V1" \
      org.opencontainers.image.revision="$GIT_COMMIT" \
      org.opencontainers.image.created="$BUILD_TIME" \
      org.opencontainers.image.description="Admin Frontend GYMETRA (Dev Mode)"

COPY --from=deps /app /app
COPY src src
COPY index.html ./
COPY vite.config.ts ./

EXPOSE 8101
HEALTHCHECK --interval=30s --timeout=3s --retries=3 CMD wget -qO- http://localhost:8101/ || exit 1

CMD ["npm", "run", "dev"]