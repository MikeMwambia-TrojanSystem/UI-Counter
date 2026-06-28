# Build stage
FROM node:20-alpine AS builder

WORKDIR /front

RUN apk update && apk add --no-cache git

RUN corepack enable && corepack prepare yarn@stable --activate

COPY . .

RUN corepack yarn install --immutable

RUN corepack yarn build

# Production stage
FROM node:20-alpine AS production

RUN addgroup -g 1001 -S front-group && \
    adduser -S front-user -u 1001 -G front-group

WORKDIR /front

# Copy built artifacts and production files
COPY --from=builder --chown=front-user:front-group /front/.next ./.next
COPY --from=builder --chown=front-user:front-group /front/public ./public
COPY --from=builder --chown=front-user:front-group /front/package.json ./package.json
COPY --from=builder --chown=front-user:front-group /front/yarn.lock ./yarn.lock
COPY --from=builder --chown=front-user:front-group /front/.yarn ./.yarn
COPY --from=builder --chown=front-user:front-group /front/.pnp.cjs ./.pnp.cjs
COPY --from=builder --chown=front-user:front-group /front/.pnp.loader.mjs ./.pnp.loader.mjs

RUN corepack enable

ENV NODE_ENV=production

RUN corepack yarn install --immutable

# ----- Setup entrypoint script BEFORE switching to non-root user -----
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Now switch to non-root user
USER front-user

EXPOSE 3000

# Healthcheck – waits for Next.js to be ready
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000 || exit 1

ENTRYPOINT ["docker-entrypoint.sh"]

CMD ["corepack", "yarn", "start"]