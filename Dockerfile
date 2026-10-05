# ---- Stage 1: build the React app ----
FROM node:22-alpine AS build
WORKDIR /app

# Copy dependency files first so Docker can cache the install step
COPY package*.json ./
RUN npm install

# Copy the rest of the source and build static files into /app/dist
COPY . .
RUN npm run build

# ---- Stage 2: serve the built files with nginx on port 3000 ----
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
