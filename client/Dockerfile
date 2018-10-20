FROM node

WORKDIR /client

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

CMD npm run serve
