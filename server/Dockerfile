FROM node

WORKDIR /server

COPY package.json .
COPY package-lock.json .

RUN npm i

COPY . . 

CMD [ "npm run production" ]
