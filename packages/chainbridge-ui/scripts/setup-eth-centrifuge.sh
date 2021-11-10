#!/bin/sh

cb-sol-cli deploy --all --relayerThreshold 1
cb-sol-cli bridge register-resource --resourceId "0x00000000000000000000000000000009e974040e705c10fb4de576d6cc261900" --targetContract "0x21605f71845f372A9ed84253d2D024B7B10999f4"
cb-sol-cli bridge set-burn --tokenContract "0x21605f71845f372A9ed84253d2D024B7B10999f4"
cb-sol-cli erc20 add-minter --minter "0x3167776db165D8eA0f51790CA2bbf44Db5105ADF"
