#!/bin/bash
sudo apt-get install -y nodejs
node -v

cd /home/ubuntu/ihavecpu_frontend
git pull origin main
node -v
sudo npm install -g yarn
sudo yarn install &&
yarn build &&
pm2 restart [ihavecpu_frontend]
