FROM node

WORKDIR /server

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . . 

CMD [ "npm run production" ]
