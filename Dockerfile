FROM node:10-alpine
MAINTAINER Yesterday17

RUN mkdir -p /home/ProxyStatusBot
WORKDIR /home/ProxyStatusBot

COPY . /home/ProxyStatusBot

RUN npm install -g -s --no-progress yarn
RUN yarn

CMD [ "yarn", "start" ]