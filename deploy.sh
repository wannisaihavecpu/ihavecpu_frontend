#!/bin/bash
cd ihavecpu_frontend
git pull origin main
yarn install &&
yarn build &&
pm2 restart [ihavecpu_frontend]
