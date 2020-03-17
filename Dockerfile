FROM node:13.10-alpine

WORKDIR /usr/app/

COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 8000

ENV DB_CONNECT = mongodb://127.0.0.1:27017/courses
ENV SECRET_KEY = this+is_a+secret|data

CMD [ "npm", "start" ]