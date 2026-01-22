# ============================================
# Base Stage: Use a Lightweight Node.js Image
# ============================================

# Use an official Node.js Alpine image (customizable via ARG)
ARG NODE_VERSION=24.10.0-alpine
FROM node:${NODE_VERSION} AS base

# Enable corepack and prepare yarn classic (1.22.22)
RUN corepack enable && corepack prepare yarn@1.22.22 --activate

# Set the working directory inside the container
WORKDIR /app

# ============================================
# Stage 2: Install Dependencies
# ============================================

FROM base AS deps

# Set NODE_ENV to production for production dependencies only
ENV NODE_ENV=production

# Copy package management files for dependency installation
COPY package.json yarn.lock ./

# Install dependencies using yarn (production only)
RUN yarn install --frozen-lockfile --production

# ============================================
# Stage 3: Build the Next.js Application
# ============================================

FROM base AS builder

# Set NODE_ENV to development for build stage to install all dependencies
ENV NODE_ENV=development

# Copy package management files
COPY package.json yarn.lock ./

# Install all dependencies (including devDependencies for build)
# Skip lifecycle scripts to avoid husky installation issues
RUN yarn install --frozen-lockfile --ignore-scripts

# Copy the entire application source code into the container
COPY . .

# Accept build arguments for environment variables
ARG NEXTAUTH_SECRET
ARG NEXTAUTH_URL
ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_SITE_URL

# Set environment variables from build arguments
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET
ENV NEXTAUTH_URL=$NEXTAUTH_URL
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

# Set NODE_ENV to production for the build
ENV NODE_ENV=production

# Increase Node.js heap memory limit for the build process
ENV NODE_OPTIONS="--max-old-space-size=8192"

# Build the application in standalone mode (outputs to `.next/standalone`)
RUN yarn build

# ============================================
# Stage 4: Create Production Image
# ============================================

# Use the same Node.js version for the final production container
FROM node:${NODE_VERSION} AS runner

# Enable corepack and prepare yarn classic in the runner stage as well
RUN corepack enable && corepack prepare yarn@1.22.22 --activate

# Use a built-in non-root user for security best practices
USER node

# Set the port for the Next.js standalone server (default is 3000)
ENV PORT=80

# Set production environment
ENV NODE_ENV=production

# Disable Next.js telemetry during runtime
ENV NEXT_TELEMETRY_DISABLE=1

# Set the working directory inside the container
WORKDIR /app

# Copy only necessary files from the builder stage to keep the image minimal
COPY --from=builder --chown=node:node /app/.next/standalone ./      
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/public ./public            

# Expose port 80 to allow HTTP traffic
EXPOSE 80

# Start the application using the standalone server
ENTRYPOINT ["node", "server.js"]