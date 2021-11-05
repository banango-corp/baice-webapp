FROM node:14-alpine

WORKDIR /usr/app

COPY . .

RUN npm install

RUN npm run build

CMD npx serve dist/baice-webapp
