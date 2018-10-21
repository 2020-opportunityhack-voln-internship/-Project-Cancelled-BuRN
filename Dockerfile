FROM node:alpine as client
WORKDIR /client
COPY ./client .
RUN npm i && npm run build


FROM node:alpine

WORKDIR /server

COPY ./server/package.json .
COPY ./server/package-lock.json .

RUN npm i

COPY server . 
RUN npm run build

COPY --from=client /client/dist /server/public

EXPOSE 3000

CMD [ "npm run production" ]
