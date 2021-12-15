FROM node:16

WORKDIR /var/bot

RUN npm -g i typescript
RUN npm -g i ts-node-dev

ADD . .

RUN npm i 

CMD [ "ts-node-dev", "-r", "tsconfig-paths/register", "./src/index.ts" ]