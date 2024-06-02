#!/bin/bash

export DEBIAN_FRONTEND=noninteractive

# STAGE 1
function st1(){
echo "Stage 1. Unpack tar..."
tar -xf ./prod_app.tar
echo "Done."
}


# STAGE 2
function st2(){
echo "Stage 2. Upgrade ubuntu and install packages..."
apt-get update
apt-get -y dist-upgrade
apt-get install -y npm postgresql postgresql-contrib language-pack-en nano netcat
npm install -g n
n lts
echo "Done."
}

# STAGE 3
function st3(){
echo "Stage 3. Setup Postgresql 14..."
mv /etc/postgresql/14/main/pg_hba.conf /etc/postgresql/14/main/pg_hba.conf.orig
cat << 'EOF' > /etc/postgresql/14/main/pg_hba.conf
# Database administrative login by Unix domain socket
local   all             postgres                                trust

# TYPE  DATABASE        USER            ADDRESS                 METHOD

# "local" is for Unix domain socket connections only
local   all             all                                     peer
# IPv4 local connections:
host    all             all             127.0.0.1/32            md5
host    all             all             0.0.0.0/0		md5

# IPv6 local connections:
#host    all             all             ::1/128                 scram-sha-256
# Allow replication connections from localhost, by a user with the
# replication privilege.

local   replication     all                                     peer
host    replication     all             127.0.0.1/32            scram-sha-256
host    replication     all             ::1/128                 scram-sha-256
EOF

mv /etc/postgresql/14/main/postgresql.conf /etc/postgresql/14/main/postgresql.conf.orig
cat << 'EOF' > /etc/postgresql/14/main/postgresql.conf
data_directory = '/var/lib/postgresql/14/main'          # use data in another directory
hba_file = '/etc/postgresql/14/main/pg_hba.conf'        # host-based authentication file
ident_file = '/etc/postgresql/14/main/pg_ident.conf'    # ident configuration file
external_pid_file = '/var/run/postgresql/14-main.pid'   # write an extra PID file
listen_addresses = '*'					# what IP address(es) to listen on;
max_connections = 100					# (change requires restart)
shared_buffers = 128MB					# min 128kB
dynamic_shared_memory_type = posix			# the default is usually the first option
max_wal_size = 1GB
min_wal_size = 80MB
log_destination = 'stderr'				# Valid values are combinations of
logging_collector = on					# Enable capturing of stderr, jsonlog,
log_directory = 'log'					# directory where log files are written,
log_filename = 'postgresql-%Y-%m-%d_%H%M%S.log'		# log file name pattern,
log_file_mode = 0600					# creation mode for log files,
log_rotation_size = 10MB				# Automatic rotation of logfiles will
log_min_messages = warning				# values in order of decreasing detail:
log_checkpoints = off
log_connections = off
log_disconnections = off
log_timezone = UTC
datestyle = 'iso, mdy'
timezone = UTC
default_text_search_config = 'pg_catalog.english'
EOF

systemctl restart postgresql

psql -U postgres -c "UPDATE pg_database SET encoding = pg_char_to_encoding('UTF8'), datcollate='en_US.UTF-8', datctype='en_US.UTF-8' WHERE datname='postgres';";
psql -U postgres -c "UPDATE pg_database SET encoding = pg_char_to_encoding('UTF8'), datcollate='en_US.UTF-8', datctype='en_US.UTF-8' WHERE datname='template0';";
psql -U postgres -c "UPDATE pg_database SET encoding = pg_char_to_encoding('UTF8'), datcollate='en_US.UTF-8', datctype='en_US.UTF-8' WHERE datname='template1';";

psql -U postgres -c "CREATE USER app_user WITH ENCRYPTED PASSWORD 'app_passQwE123';"
psql -U postgres -c "CREATE DATABASE app_db;"
psql -U postgres -c "UPDATE pg_database SET encoding = pg_char_to_encoding('UTF8'), datcollate='en_US.UTF-8', datctype='en_US.UTF-8' WHERE datname='app_db';";
psql -U postgres -c "GRANT ALL ON DATABASE app_db TO app_user;"
psql -U postgres -c "ALTER DATABASE app_db OWNER TO app_user;"
psql -U postgres app_db -c "CREATE SCHEMA typeorm;"
psql -U postgres app_db -c "GRANT ALL PRIVILEGES ON SCHEMA typeorm TO app_user;"

echo "Done."
}

# STAGE 4
function st4(){
echo "Stage 4. Create Systemd Unit ()..."

cat << 'EOF' > /etc/systemd/system/nodeapp01.service
[Unit]
Description=nodeapp01
Requires=network-online.target
After=network-online.target

[Service]
Restart=on-failure
RestartSec=3s
WorkingDirectory=/home/user/prod_app
ExecStart=bash appstart.sh
User=user
Group=user

[Install]
WantedBy=multi-user.target
EOF

cat << 'EOF' > /home/user/prod_app/appstart.sh
#!/bin/bash
[ -d ./node_modules ] || npm ci
./node_modules/typeorm/cli-ts-node-commonjs.js -d dist/migrations-data-source.js migration:run
node dist/main.js
EOF

chown user: /home/user/prod_app/appstart.sh
chmod +x /home/user/prod_app/appstart.sh

systemctl daemon-reload
systemctl enable --now nodeapp01

echo "Done."
}


# STAGE 5
function st5(){
ip=$(hostname -I | tr -d '[:blank:]')
clear
echo ""
echo "Installation finished!"
echo ""
echo "####################################################################"
echo "# Load http://${ip}:8080 to the browser for use application #"
echo "####################################################################"
echo ""
}

#####################################

st1
st2
st3
st4
st5
