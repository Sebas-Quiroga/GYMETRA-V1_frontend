###############################
# Etapa 1: Runtime Node.js para desarrollo
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

COPY package*.json ./
COPY tsconfig.json ./
COPY vite.config.ts ./
COPY src src
COPY index.html ./

# Instalar dependencias
RUN --mount=type=cache,target=/root/.npm \
    npm ci --prefer-offline

EXPOSE 8101
HEALTHCHECK --interval=30s --timeout=3s --retries=3 CMD wget -qO- http://localhost:8101/ || exit 1

CMD ["npm", "run", "dev"]