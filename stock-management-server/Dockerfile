FROM node:10-alpine as webapi
RUN mkdir -p /usr/app
WORKDIR /usr/app/
COPY /stock-management-server /usr/app  
RUN npm install
RUN npm run prebuild
RUN npm run build
EXPOSE 3000
ENTRYPOINT ["npm","run","start:prod"]
