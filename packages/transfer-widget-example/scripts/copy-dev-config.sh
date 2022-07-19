#!/bin/bash

FILE="./public/sygma-runtime-config.js"
if [ ! -e $FILE ]; then
  cp -a ./config/sygma-runtime-config.evm.js ./public/sygma-runtime-config.js
  echo "Created runtime config for dev in ../public"
fi
