# ============================================
# Base Stage: Use a Lightweight Node.js Image
# ============================================
ARG NODE_VERSION=24.10.0-alpine
FROM node:${NODE_VERSION} AS base

# Set the working directory
WORKDIR /app

# ============================================
# Stage 2: Install Dependencies
# ============================================
FROM base AS deps

# Set NODE_ENV to production for production dependencies only
ENV NODE_ENV=production

# Copy package management files (Note: We use package-lock.json now)
COPY package.json package-lock.json ./

# Install dependencies using npm ci (clean install)
RUN npm ci --only=production

# ============================================
# Stage 3: Build the Next.js Application
# ============================================
FROM base AS builder

ENV NODE_ENV=development

# Copy package management files
COPY package.json package-lock.json ./

# Install all dependencies (including devDependencies for build)
RUN npm ci

# Copy the entire application source code
COPY . .

# Accept build arguments
ARG NEXTAUTH_SECRET
ARG NEXTAUTH_URL
ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_SITE_URL

# Set environment variables
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET
ENV NEXTAUTH_URL=$NEXTAUTH_URL
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=8192"

# Build using npm
RUN npm run build

# ============================================
# Stage 4: Create Production Image
# ============================================
FROM node:${NODE_VERSION} AS runner

USER node

ENV PORT=80
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLE=1

WORKDIR /app

# Copy necessary files from builder
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/public ./public

EXPOSE 80

# Start using node
ENTRYPOINT ["node", "server.js"]