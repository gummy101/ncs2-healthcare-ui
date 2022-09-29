#build react app
FROM node:alpine as build-process
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build

#deploy build folder to nginx
FROM nginx:stable-alpine
COPY --from=build-process /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

