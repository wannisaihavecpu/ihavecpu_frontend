#!/bin/bash
cd /home/ubuntu/ihavecpu_frontend
git pull origin main
npm install
npm buildpm2 restart [ihavecpu_frontend] 
