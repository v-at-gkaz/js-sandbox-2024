FROM ubuntu:24.04
MAINTAINER Vladimir<v@gkaz.ru>
ENV SERVER_PORT=5000
ENV SUBD_HOST=localhost
ENV SUBD_PORT=5432
ENV SUBD_DB=db
ENV SUBD_USER=appuser
ENV SUBD_PASS=apPp@S$
ENV PASSWORD_HASH_SALT_OR_ROUNDS=12
ENV JWT_SECRET=qwerty
ENV JWT_EXPIRES_IN=5h
RUN apt-get update
RUN apt-get install -yq npm curl nano
RUN npm install -g n
RUN n lts
COPY app /srv/app
COPY start.sh /srv/app/start.sh
RUN chmod +x /srv/app/start.sh
WORKDIR /srv/app
RUN npm ci
CMD ./start.sh