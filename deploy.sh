#!/bin/bash
cd /home/ubuntu/ihavecpu_frontend
git pull origin main
sudo npm install -g yarn
sudo yarn install &&
yarn build &&
pm2 restart [ihavecpu_frontend]
