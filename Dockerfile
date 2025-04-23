# Stage 1: Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# Increase memory for Node
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Install dependencies with more verbose output
COPY package*.json ./
RUN npm config set fetch-retry-maxtimeout 600000 \
    && npm config set fetch-timeout 600000 \
    && npm ci --verbose \
    && npm cache clean --force

# Copy source and build
COPY . .
RUN npm run build

# Stage 2: Production stage
FROM node:18-alpine AS runner
WORKDIR /app

# Increase memory for Node
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm config set fetch-retry-maxtimeout 600000 \
    && npm config set fetch-timeout 600000 \
    && npm ci --only=production --verbose \
    && npm cache clean --force

# Copy built files from builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./

# Environment setup
ENV NODE_ENV=production
ENV PORT=3000

# Start the app
CMD ["npm", "start"]