# Stage 1: Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# Add necessary build tools
RUN apk add --no-cache python3 make g++

# Debug: Show environment and directory
RUN node -v && npm -v && pwd

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install \
    && npm cache clean --force

# Copy source code
COPY . .

# Debug: List files to verify they exist
RUN ls -la

# Build
RUN npm run build

# Stage 2: Production stage
FROM node:18-alpine AS runner
WORKDIR /app

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm install --only=production \
    && npm cache clean --force

# Copy built files from builder stage
COPY --from=builder /app/.next/ ./.next/
COPY --from=builder /app/public/ ./public/
COPY --from=builder /app/next.config.ts ./next.config.ts

# Environment setup
ENV NODE_ENV=production
ENV PORT=3000

CMD ["npm", "start"]