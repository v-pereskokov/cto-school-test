FROM node:14
MAINTAINER Pereskokov Vladislav (v.pereskokov@ivpa.ru)

RUN rm -rf /var/lib/apt/lists/* && apt-get update -y && \
    apt-get install -y supervisor && \
    (rm -rf /var/www/html/* && mkdir -p /var/www/html/)

COPY ./etc/supervisord/weather-app.conf /etc/supervisor/conf.d/
COPY . /var/www/html/

WORKDIR /var/www/html
RUN npm install && \
    npm install nodemon -g && \
    npm run build:stable

CMD ["/usr/bin/supervisord"]
