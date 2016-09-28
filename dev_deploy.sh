#!/bin/bash
rm -rf dev_deploy
mkdir dev_deploy
cp -R deploy dev_deploy
rm dev_deploy.tar.gz
tar cvzf dev_deploy.tar.gz dev_deploy/
scp dev_deploy.tar.gz root@cgds.me:/usr/share/nginx/html/
