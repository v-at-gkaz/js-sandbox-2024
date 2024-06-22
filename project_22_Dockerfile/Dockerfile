FROM ubuntu:24.04
MAINTAINER Vladimir<v@gkaz.ru>
ENV APPNAME="application-01"
RUN apt-get update
RUN apt-get install -yq npm curl postgresql postgresql-contrib language-pack-en nano
RUN npm install -g n
RUN n lts
COPY pg/pg_hba.conf /etc/postgresql/16/main/pg_hba.conf
COPY pg/postgresql.conf /etc/postgresql/16/main/postgresql.conf
COPY app /srv/app
COPY init_pg.sh /srv/app/init_pg.sh
COPY start.sh /srv/app/start.sh
RUN chmod +x /srv/app/*.sh
WORKDIR /srv/app
RUN useradd -ms /bin/bash postgres
RUN ./init_pg.sh
RUN npm install
CMD ./start.sh