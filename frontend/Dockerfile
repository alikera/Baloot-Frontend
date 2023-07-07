#FROM ubuntu:latest
#LABEL authors="alike"
#
#ENTRYPOINT ["top", "-b"]

# Base image
FROM node:14 as builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
#COPY package*.json ./

# Copy project files
COPY . .

# Install dependencies
RUN npm install

# Build the React app
RUN npm run build

# Production image
FROM nginx:alpine

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files from the previous stage
COPY --from=builder /app/build .

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]