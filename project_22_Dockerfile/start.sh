#!/bin/bash
su postgres -c "/usr/lib/postgresql/16/bin/postgres -D /var/lib/postgresql/16/main -c config_file=/etc/postgresql/16/main/postgresql.conf" &
sleep 15s
./node_modules/typeorm/cli-ts-node-commonjs.js -d dist/migrations-data-source.js migration:run
node dist/main.js