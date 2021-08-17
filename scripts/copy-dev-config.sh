#!/bin/bash

FILE="chainbridge-runtime-config.js" 
if [ ! -e ../public/"$FILE" ]; then
  cp -a ./config/chainbridge-runtime-config.evm.js ./public/chainbridge-runtime-config.js
  echo "Created runtime config for dev in ../public"
fi
