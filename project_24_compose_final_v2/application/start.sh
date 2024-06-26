#!/bin/bash
[ -d node_modules ] || npm ci # for manual removing node_modules
./node_modules/typeorm/cli-ts-node-commonjs.js -d dist/migrations-data-source.js migration:run
node dist/main.js