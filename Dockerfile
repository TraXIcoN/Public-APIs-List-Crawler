# syntax=docker/dockerfile:1
FROM node:14

#Creating app directory
WORKDIR /

#Installing app dependencies
COPY package*.json ./
RUN npm install

#Bundling my source code
COPY . .

CMD ["node", "server.js"]