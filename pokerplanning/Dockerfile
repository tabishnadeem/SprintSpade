FROM node:latest

WORKDIR /pokerplanning

COPY . .

RUN npm install

RUN npm run build

CMD ["npm","run","preview","--","--host"] 
