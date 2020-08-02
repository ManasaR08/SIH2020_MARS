FROM node:10

RUN mkdir -p /var/www/app

WORKDIR /var/www/app

COPY package.json /var/www/app

RUN npm i

COPY . /var/www/app

EXPOSE 3000

CMD ["npm", "start"]