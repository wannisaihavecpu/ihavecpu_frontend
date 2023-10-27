#!/bin/bash
sudo apt install curl 
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
source ~/.bashrc
nvm list
nvm install node
cd /home/ubuntu/ihavecpu_frontend
git pull origin main
npm install -g yarn
yarn install &&
yarn build &&
pm2 restart [ihavecpu_frontend]
