# Multi-stage build for Next.js 15 app
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

FROM node:20-alpine AS builder
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Build service worker and app
RUN npm run build

FROM node:20-alpine AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

# Only the minimal files to run `next start`
COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./
COPY next.config.mjs ./
COPY public ./public
# Copy the production build output from the builder stage (not the host)
# Copy production build output (respecting distDir = 'build')
COPY --from=builder /app/build ./build

EXPOSE 3000
CMD ["npm", "start"]
