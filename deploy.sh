#!/bin/bash
sudo apt-get install -y nodejs
node -v
sudo apt remove nodejs
sudo apt remove nodejs-doc
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

cd /home/ubuntu/ihavecpu_frontend
git pull origin main
node -v
sudo npm install -g yarn
sudo yarn install &&
yarn build &&
pm2 restart [ihavecpu_frontend]
