FROM node:latest

WORKDIR /pokerplanning

COPY . .

RUN npm install 

RUN npm i --force

RUN npm run build

CMD ["npm","run","preview","--","--host"] 
