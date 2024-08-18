FROM node

RUN mkdir /app
WORKDIR /app

COPY ./index.mjs /app/index.mjs
COPY ./webserver.mjs /app/webserver.mjs
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json

RUN npm ci --only=production

CMD ["node", "webserver.mjs"]