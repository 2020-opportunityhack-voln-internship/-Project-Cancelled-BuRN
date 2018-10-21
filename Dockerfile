FROM node:alpine as client
WORKDIR /client
COPY ./client .
RUN npm i
RUN npm run build


FROM node:alpine

WORKDIR /server

COPY ./server/package.json .
COPY ./server/package-lock.json .

RUN npm i

COPY server . 
COPY --from=client /client/dist /server/static

EXPOSE 3000

CMD [ "npm run production" ]
