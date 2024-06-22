#!/bin/bash
echo "Tmp start Postgres..."
su postgres -c "/usr/lib/postgresql/16/bin/postgres -D /var/lib/postgresql/16/main -c config_file=/etc/postgresql/16/main/postgresql.conf" &
pg_pid=$!

sleep 5s

echo "Init postgres DB"
psql -U postgres -c "UPDATE pg_database SET encoding = pg_char_to_encoding('UTF8'), datcollate='en_US.UTF-8', datctype='en_US.UTF-8' WHERE datname='postgres';";
psql -U postgres -c "UPDATE pg_database SET encoding = pg_char_to_encoding('UTF8'), datcollate='en_US.UTF-8', datctype='en_US.UTF-8' WHERE datname='template0';";
psql -U postgres -c "UPDATE pg_database SET encoding = pg_char_to_encoding('UTF8'), datcollate='en_US.UTF-8', datctype='en_US.UTF-8' WHERE datname='template1';";

echo "Init Credentials for app"
psql -U postgres -c "CREATE USER app_user WITH ENCRYPTED PASSWORD 'app_passQwE123';"
psql -U postgres -c "CREATE DATABASE app_db;"
psql -U postgres -c "UPDATE pg_database SET encoding = pg_char_to_encoding('UTF8'), datcollate='en_US.UTF-8', datctype='en_US.UTF-8' WHERE datname='app_db';";
psql -U postgres -c "GRANT ALL ON DATABASE app_db TO app_user;"
psql -U postgres -c "ALTER DATABASE app_db OWNER TO app_user;"
psql -U postgres app_db -c "CREATE SCHEMA typeorm;"
psql -U postgres app_db -c "GRANT ALL PRIVILEGES ON SCHEMA typeorm TO app_user;"

sleep 5s

echo "Kill tmp postgres"
kill $pg_pid