FROM node:latest

WORKDIR /user/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install --silent
RUN npm install -g serve

COPY . ./

EXPOSE 5000

CMD [ "serve", "-s", "build" ]
