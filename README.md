<p align="center"><a href="https://https://chainsafe.io/"><img width="250" title="Chainbridge UI" src='assets/chainsafe_logo.png'/></a></p>

# ChainbridgeUI

## Introduction
**Chainbridge UI** is an OpenSource (under GNU Lesser General Public License v3.0) whitelabel application for developers
to work with Chainsafe [Chainbridge](https://github.com/ChainSafe/chainbridge-core). UI consist of two part:
BridgeUI is used to interact with [Bridge](https://github.com/chainsafe/chainbridge-solidity) smart contracts
in order to send deposits.
ExplorerUI is used to track and navigate every bridging that happens over specific Bridge smart contract.

## Live demo
You can test UI with our [live demo](52.73.103.2)
This demo is a working bridge between Rinkebay <> Goerly <> Alfajores (celo).
It requires you to have MetaMask wallet and to have some ETH on those network in order to pay tx fees, also you need to request some ERC20 tokens in our [discord](https://discord.gg/ykXsJKfhgq) channel

***NOTE*** this is under an active development so can be broken occasionally.

## Running locally

For you to run our UI locally you need a couple of dependencies. As this is a bridge project, it needs some runnings parts before even using the UI in the browser.

### Requisites

In order for your to bridge tokens from one network to another, you are going to need to clone [chainbridge-core](https://github.com/ChainSafe/chainbridge-core). This project contains everything you need to run a bridge with two `evm` networks, and all the contracts deployed. Check the [README](https://github.com/ChainSafe/chainbridge-core/blob/main/README.md) and follow the instructions to install and have everything ready.

After you cloned `chainbridge-core` you can run the following command:

```bash
make local-setup
```

This command is going to run a script that creates two evm nodes and I will run three relayers. After this is going to deploy all the contracts to the `evm` nodes. This process could take a couple of minutes to complete. After that, you are going to see the following message:

```bash
===============================================
🎉🎉🎉 ChainBridge Successfully Deployed 🎉🎉🎉

- Chain 1 -
Bridge: 0xd606A00c1A39dA53EA7Bb3Ab570BBE40b156EB66
ERC20: 0xb911DF90bCccd3D76a1d8f5fDcd32471e28Cc2c1
ERC20 Handler: 0x05C5AFACf64A6082D4933752FfB447AED63581b1
Generic Handler: 0x77d273266ee4859b8564562A72E433fe5C0D9F44
Asset Store: 0x034dCF9Efd1cc360C456ad853E64000E1cA49290

- Chain 2 -
Bridge: 0xd606A00c1A39dA53EA7Bb3Ab570BBE40b156EB66
ERC20: 0xb911DF90bCccd3D76a1d8f5fDcd32471e28Cc2c1
ERC20 Handler: 0x05C5AFACf64A6082D4933752FfB447AED63581b1
Generic Handler: 0x77d273266ee4859b8564562A72E433fe5C0D9F44
Asset Store: 0x034dCF9Efd1cc360C456ad853E64000E1cA49290

===============================================
```

This means that you have all the address that you need to run the UI locally. A quick note aside: if you want to check the logs of your nodes or the relayers, you can go `/e2e/evm-evm` folder and run the following command:

```bash
docker-compose -f docker-compose.e2e.yml logs relayer1
```

This is going to output the `relayer1` logs. You can also run the command with the `-f` flag to follow the output of your services. If you want to see all the logs of your services just run `docker-compose -f docker-compose.e2e.yml logs`.

After you get the address for the contracts deployed on your local setup, we need to add this to the `runtime` config of our UI.

Go to `/packages/example` that contains our full UI, and inside the config folder, edit the `chainbridge-runtime-config.evm.js` file with the addresses that you got after the deploy.

You will end up with something like this:

```js
window.__RUNTIME_CONFIG__ = {
  INDEXER__URL: "http://localhost:8000",
  CHAINBRIDGE: {
    chains: [
      {
        domainId: 421,
        networkId: 422,
        name: "Local EVM 1",
        decimals: 18,
        bridgeAddress: "0xd606A00c1A39dA53EA7Bb3Ab570BBE40b156EB66",
        erc20HandlerAddress: "0x05C5AFACf64A6082D4933752FfB447AED63581b1",
        rpcUrl: "http://localhost:8545",
        type: "Ethereum",
        nativeTokenSymbol: "ETH",
        tokens: [
          {
            address: "0xb911DF90bCccd3D76a1d8f5fDcd32471e28Cc2c1",
            name: "an ERC20",
            symbol: "ERC20",
            imageUri: "WETHIcon",
            resourceId:
              "0x000000000000000000000000000000e389d61c11e5fe32ec1735b3cd38c69500",
          },
        ],
      },
      {
        domainId: 420,
        networkId: 422,
        name: "Local EVM 2",
        decimals: 18,
        bridgeAddress: "0xd606A00c1A39dA53EA7Bb3Ab570BBE40b156EB66",
        erc20HandlerAddress: "0x05C5AFACf64A6082D4933752FfB447AED63581b1",
        rpcUrl: "http://localhost:8547",
        type: "Ethereum",
        nativeTokenSymbol: "ETH",
        tokens: [
          {
            address: "0xb911DF90bCccd3D76a1d8f5fDcd32471e28Cc2c1",
            name: "an ERC20",
            symbol: "ERC20",
            imageUri: "WETHIcon",
            resourceId:
              "0x000000000000000000000000000000e389d61c11e5fe32ec1735b3cd38c69500",
          },
        ],
      },
    ],
  },
};

```

## FAQ
Please check our [Q&A section](https://github.com/ChainSafe/chainbridge-ui/discussions/categories/q-a)

## Support
<a href="https://discord.gg/ykXsJKfhgq">
  <img alt="discord" src="https://img.shields.io/discord/593655374469660673?label=Discord&logo=discord&style=flat" />
</a>

## License
GNU Lesser General Public License v3.0
