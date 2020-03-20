FROM node:13.10-alpine

WORKDIR /usr/app/

COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 8000

ENV DB_CONNECT = mongodb+srv://notffcs:ffcssucksass@notffcs-y0bqz.mongodb.net/educayshun?retryWrites=true&w=majority
ENV SECRET_KEY = this+is_a+secret|data

CMD [ "npm", "start" ]