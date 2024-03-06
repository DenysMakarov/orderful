FROM node:latest

COPY . /app

WORKDIR /app

EXPOSE 5100

RUN npm install

CMD ["npm", "run", "dev"]
