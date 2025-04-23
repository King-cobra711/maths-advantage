# Stage 1: Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# Stage 2: Production stage
FROM node:18-alpine AS runner
WORKDIR /app

# Only copy production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy built files from builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./

# Environment setup
ENV NODE_ENV=production
ENV PORT=3000

# Start the app
CMD ["npm", "start"]