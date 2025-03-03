# ---- Base Build Stage ----
    FROM node:20-alpine AS build

    # Set working directory inside the container
    WORKDIR /app
    
    # Copy package files first for better caching
    COPY package.json package-lock.json ./
    
    # Install only production dependencies first for better caching
    RUN npm install --only=production
    
    # Copy all source files
    COPY . .
    
    # Install dev dependencies & build TypeScript
    RUN npm install
    RUN npm run build
    
    # ---- Production Stage ----
    FROM node:20-alpine AS production
    
    # Set working directory inside the container
    WORKDIR /app
    
    # Copy only necessary files from build stage
    COPY --from=build /app/package.json /app/package-lock.json ./
    COPY --from=build /app/node_modules ./node_modules
    COPY --from=build /app/dist ./dist
    
    # Expose the application port
    EXPOSE 3000
    
    # Start the application using tsconfig-paths for path alias resolution
    CMD ["node", "-r", "tsconfig-paths/register", "dist/server/index.js"]
    