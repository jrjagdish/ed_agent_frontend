# ---------- build stage ----------
FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


# ---------- production stage ----------
FROM nginx:alpine

# Railway sets PORT automatically
ENV PORT=8080

# Copy built frontend
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx config template
COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD envsubst '$PORT' < /etc/nginx/templates/default.conf.template \
    > /etc/nginx/conf.d/default.conf \
    && nginx -g 'daemon off;'
