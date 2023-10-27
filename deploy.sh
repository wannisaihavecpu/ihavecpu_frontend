#!/bin/bash
sudo apt update
sudo apt install nodejs npm
Y
cd /home/ubuntu/ihavecpu_frontend
git pull origin main
npm install -g yarn
yarn install &&
yarn build &&
pm2 restart [ihavecpu_frontend]
