FROM node:16

#create a directory to store the app
WORKDIR /usr/src/app

# Install app dependencies
COPY API/package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

WORKDIR ./API

CMD [ "npm", "start" ]
