FROM node:18

WORKDIR /app

COPY package.json .

RUN npm config set registry https://registry.npmmirror.com/

RUN yarn install

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm","run","start" ]
