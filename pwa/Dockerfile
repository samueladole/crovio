# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /usr/src/app
COPY ./package.json ./package-lock.json ./
RUN npm install
COPY ./ ./
RUN npm run build


# Stage 2: Serve
FROM nginx:stable-alpine-slim
COPY --from=build /usr/src/app/build /usr/share/nginx/html
COPY app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]