#!/bin/bash
source ~/.bash_profile

cd ~/repashion-client/
git pull origin dev
yarn build
pm2 stop refashion-app
pm2 start yarn --name "refashion-app" -- start
sleep 2
pm2 list
