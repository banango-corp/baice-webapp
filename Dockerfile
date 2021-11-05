FROM node:14-alpine

WORKDIR /usr/app

COPY . .

RUN npm install

RUN npm run build

RUN npx serve dist/baice-webapp
