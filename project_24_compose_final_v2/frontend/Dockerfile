FROM ubuntu:24.04
MAINTAINER Vladimir<v@gkaz.ru>
RUN apt-get update
RUN apt-get install -yq nginx curl nano
RUN mkdir /etc/nginx/ssl
COPY nginx.crt /etc/nginx/ssl/nginx.crt
COPY nginx.key /etc/nginx/ssl/nginx.key
COPY client /var/www/client
COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /srv
CMD nginx