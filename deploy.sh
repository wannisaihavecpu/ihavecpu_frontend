cd /home/ubuntu/ihavecpu_frontend
sudo rm -rf node_modules
sudo rm package-lock.json
git pull origin main
yarn cache clean
npm install --force