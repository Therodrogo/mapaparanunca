FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN apk add -–no-cache make gcc g++ python
RUN npm install
RUN npm rebuild bcrypt -–build-from-source
RUN apk del make gcc g++ python 

COPY . .

CMD ["npm", "run", "dev"]