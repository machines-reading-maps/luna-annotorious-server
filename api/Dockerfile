FROM node:lts-alpine

WORKDIR src
COPY data data/
COPY package.json .
COPY package-lock.json .
COPY . .
RUN npm install
RUN npm run build
CMD npm start