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

This command is going to run a script that creates two evm nodes and I will run three relayers. After this is going to deploy all the contracts to the `evm` nodes. This process could take a couple of minutes to complete. After that, you are going to see something like this message (notice that addresses could be different on your side)

```bash
===============================================
🎉🎉🎉 ChainBridge Successfully Deployed 🎉🎉🎉

- Chain 1 -
Bridge: 0x061EC76fa79d1e13B88B7Aa89BfC3E45f49373e7
ERC20: 0xc24b07722486e80f4dB2E0bD8Eb21E257B357684
ERC20 Handler: 0xa7FC82fEb6Acaf8B08c28a890a3dF6c70Ea752d0
Generic Handler: 0x88bEfC9924f4F1C5e5c70D78E6BbA20d9E2F636C
Asset Store: 0x21114F42f4253B267441eB96902eA011aAFC360c

- Chain 2 -
Bridge: 0x26c2e726e80C56d9002cEED7b127036292c3064E
ERC20: 0x8f677D365252A44A347C25370A9a9F6308746D19
ERC20 Handler: 0xCF7cDB2C0C222632512621146273a00f1bE33143
Generic Handler: 0x6CCE395E5D267a53A75e0Ea5410BcBDfC7137A9d
Asset Store: 0x7565ed83a5ce9e7CcD5Dddd5d3DEc11B98C62ea5

===============================================
```

Alongside with this final log, you should be able to lookup for the `resourceId` thas is being set in the deployments for the `ERC20` tokens. It should appear after the deploying of the `ERC20` contracts. Find in the logs the seting up of the burnable for the `ERC20` contract address and you will find the `resourceId` for first and second node.

So the `resourceId` for `Chain 1` is going to be in this case: `0x0000000000000000000000000000000000000000000000000000000000000200`. (Again, this logs are going to be different when you run the command)

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
        bridgeAddress: "0x061EC76fa79d1e13B88B7Aa89BfC3E45f49373e7",
        erc20HandlerAddress: "0xa7FC82fEb6Acaf8B08c28a890a3dF6c70Ea752d0",
        rpcUrl: "http://localhost:8545",
        type: "Ethereum",
        nativeTokenSymbol: "ETH",
        tokens: [
          {
            address: "0xc24b07722486e80f4dB2E0bD8Eb21E257B357684",
            name: "an ERC20",
            symbol: "ERC20",
            imageUri: "WETHIcon",
            resourceId:
              "0x0000000000000000000000000000000000000000000000000000000000000200",
          },
        ],
      },
      {
        domainId: 420,
        networkId: 422,
        name: "Local EVM 2",
        decimals: 18,
        bridgeAddress: "0x26c2e726e80C56d9002cEED7b127036292c3064E",
        erc20HandlerAddress: "0xCF7cDB2C0C222632512621146273a00f1bE33143",
        rpcUrl: "http://localhost:8547",
        type: "Ethereum",
        nativeTokenSymbol: "ETH",
        tokens: [
          {
            address: "0x8f677D365252A44A347C25370A9a9F6308746D19",
            name: "an ERC20",
            symbol: "ERC20",
            imageUri: "WETHIcon",
            resourceId:
              "0x0000000000000000000000000000000000000000000000000000000000000200",
          },
        ],
      },
    ],
  },
};
```

**note: the parameters `domainId` and `networkId` are the ones that are being used by the local networks**

**note 2: remember that this values are for reference**

Then you can start the UI and you can try to connect using metamask. For this you will also need to add the local nodes to the `networks` section of your metamaks. The relevant data to setup local networks on metamaks are the endpoints of the networks, already defined in the runtime config, and the `chainId` also already defined in the runtime config as `networkId`.

After this you will also need to import the token to your metamask wallet. Notice that the local nodes have some accounts that hold some tokens. You can check those accounts and the private keys of them [here](https://github.com/ChainSafe/chainbridge-deploy/blob/main/cb-sol-cli/constants.js)

In the case of the local setup `alice`, `bob` and `charlie` are some of the accounts with tokens. Also the three of the are the main relayers. So, if you want to import `alice` account to metamask, you will need to use [her private key](https://github.com/ChainSafe/chainbridge-deploy/blob/f2aa0932e8f98037569fb9ff7b4948be380bacab/cb-sol-cli/constants.js#L40).

It is recommended that you don't use relayers accounts to test transfers in your local setup. For this you can use [chainbridge-core-example](https://github.com/ChainSafe/chainbridge-core-example) to build the binary and have access to the cli to perform some task.

After you follow the instructions to build the binary you can run the following command to create an account.

```bash
./chainbridge-core-example evm-cli accounts generate
```

The output will be an address and a private key that you can use to import that account to metamask. After you have done this, if you have `alice` on metamask, you can send some native tokens to your new account through metamask.

For this setup the `bridge` admin is going to be `Eve`. You can check this by searching into the logs for the mint of 10 `TST` (the ERC20 token symbol). The output of the logs would look something like this:

```bash
{"level":"debug","time":"2022-03-14T23:57:37-03:00","message":"Minting tokens 0x4CEEf6139f00F9F4535Ad19640Ff7A0137708485 10000000000000000000"}
```

### Minting some tokens.


Now we are ready to mint some tokens. Eve has 10 TST tokens already minted, but we can mint more.

```bash
./chainbridge-core-example \
evm-cli \
erc20 \
mint \
--url <LOCAL-NODE-URL> \
--private-key <PRIVATE-KEY EVE> \
--amount 200 \
--contract <ERC20 ADDRESS>
--recipient <RELAYER ADDRESS OR ANY VALID ADDRESS>
```

After minting some tokens, you can send a few to your imported account in order for you to test a transfer. You can use directly the account for one of the relayers, in this case `alice`, to send some tokens to your imported account. Then simply run

```bash
yarn start:ui
```

And that's it, you are going to see the UI connected to local networks

## FAQ
Please check our [Q&A section](https://github.com/ChainSafe/chainbridge-ui/discussions/categories/q-a)

## Support
<a href="https://discord.gg/ykXsJKfhgq">
  <img alt="discord" src="https://img.shields.io/discord/593655374469660673?label=Discord&logo=discord&style=flat" />
</a>

## License
GNU Lesser General Public License v3.0
