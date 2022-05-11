FROM node:14-alpine

ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools
RUN apk --no-cache add --virtual builds-deps build-base python3

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm rebuild bcrypt --build-from-source 

COPY . .

CMD ["npm", "run", "dev"]