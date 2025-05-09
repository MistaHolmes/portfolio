# Build
FROM node:20-alpine AS builder

WORKDIR /build

COPY package* .

RUN npm ci

COPY . .

RUN npm run build

# Production
FROM node:20-alpine AS runner

WORKDIR /portfolio

COPY --from=builder /build/package.json ./
COPY --from=builder /build/.next ./.next
COPY --from=builder /build/public ./public
COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/next.config.ts ./next.config.ts

EXPOSE 3000

CMD ["npm", "start"]
