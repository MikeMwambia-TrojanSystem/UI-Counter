# ---- Builder ----
FROM node:20-alpine AS builder

WORKDIR /front

# Force local cache and disable global cache
ENV YARN_CACHE_FOLDER=/front/.yarn/cache
ENV YARN_ENABLE_GLOBAL_CACHE=false

RUN apk add --no-cache git
RUN corepack enable

# Copy only the dependency manifests first (for caching)
COPY package.json yarn.lock ./
COPY .yarn ./.yarn

# Install dependencies – this generates a fresh .pnp.cjs
RUN corepack yarn install --immutable

# Now copy the rest of the source code
COPY . .

# Build the application
RUN corepack yarn build

# ---- Production ----
FROM node:20-alpine AS production

RUN addgroup -g 1001 -S front-group && \
    adduser -S front-user -u 1001 -G front-group

# Install wget for healthcheck
RUN apk add --no-cache wget

WORKDIR /front

# Same cache settings as builder
ENV YARN_CACHE_FOLDER=/front/.yarn/cache
ENV YARN_ENABLE_GLOBAL_CACHE=false
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Enable corepack for runtime
RUN corepack enable

# Copy only the runtime essentials (no re-install)
COPY --from=builder --chown=front-user:front-group /front/.next ./.next
COPY --from=builder --chown=front-user:front-group /front/public ./public
COPY --from=builder --chown=front-user:front-group /front/package.json ./package.json
COPY --from=builder --chown=front-user:front-group /front/yarn.lock ./yarn.lock
COPY --from=builder --chown=front-user:front-group /front/.yarn ./.yarn
COPY --from=builder --chown=front-user:front-group /front/.pnp.cjs ./.pnp.cjs
COPY --from=builder --chown=front-user:front-group /front/.pnp.loader.mjs ./.pnp.loader.mjs

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

USER front-user

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/welcome || exit 1
  
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["corepack", "yarn", "start"]