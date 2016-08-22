FROM node:argon-slim

WORKDIR /src

COPY index.js .
COPY package.json .

RUN npm install --production

CMD ["node", "index.js"]
