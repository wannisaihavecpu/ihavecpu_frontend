#!/bin/bash
cd /home/ubuntu
sudo apt update
sudo apt install nodejs

cd /home/ubuntu/ihavecpu_frontend
git pull origin main
node -v
sudo npm install -g yarn
sudo yarn install &&
yarn build &&
pm2 restart [ihavecpu_frontend]
