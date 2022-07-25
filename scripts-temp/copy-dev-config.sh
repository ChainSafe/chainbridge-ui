#!/bin/bash

FILE="./public/chainbridge-runtime-config.js"
if [ ! -e $FILE ]; then
  cp -a ./config/chainbridge-runtime-config.cere.dev.js ./public/chainbridge-runtime-config.js
  echo "Created runtime config for dev in ../public"
fi
