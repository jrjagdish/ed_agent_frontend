# 1. Build stage
FROM node:20-alpine AS build-stage
WORKDIR /app

# Update system packages to patch known vulnerabilities
RUN apk update && apk upgrade

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2. Production stage
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Update Nginx OS packages
RUN apk update && apk upgrade

# Clean default files
RUN rm -rf ./*

# Copy build output
COPY --from=build-stage /app/dist .

# Copy your custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]