# Chainbridge UI

## Table of Contents

- [Features](#features)
- [Install](#install)
- [Usage](#usage)
- [Contributing](#contributing)
<!-- - [License](#license) -->

## Features

### Stack

- JS Framework: [React](https://github.com/facebook/react) + [Typescript](https://github.com/microsoft/TypeScript)
- Blockchain components: [Ethers.js](https://github.com/ethers-io/ethers.js/) + [web3-context](https://github.com/chainsafe/web3-context)

## Install

```
yarn install
```

Create a `.env` file based on the `.env.example` file in the root of the project.
Get a Blocknative DAPP ID (here)[https://explorer.blocknative.com/account] and populate the respective field in the `.env` file

You can copy one of our configs for local development or create your own:
```
cp ./config/chainbridge-runtime-config.evm.json ./public/chainbridge-runtime-config.json
```
Make sure that the config file in public folder is named `chainbridge-runtime-config.json``

## Usage

### Development

For running a local instance use the command:

```
yarn start
```

### Build

Update the configs for the bridge in `src/chainbridgeContext.ts`. There should be at least 2 chains configured for correct functioning of the bridge. Each chain accepts the following configuration parameters:

```
export type BridgeConfig = {
  networkId?: number; // The networkId of this chain.
  domainId: number; // The bridge's domainId.
  name: string; // The human readable name of this chain.
  rpcUrl: string; // An RPC URL for this chain.
  type: ChainType; // The type of chain.
  tokens: TokenConfig[]; // An object to configure the tokens (see below)
  nativeTokenSymbol: string; // The native token symbol of this chain.
  decimals: number;
};
```

```
type TokenConfig = {
  address: string; // The address of the ERC20 token
  name?: string; // The name of the ERC20 token. This can be left out if the token implements the ERC20Detailed standard
  symbol?: string; // The symbol of the ERC20 token. This can be left out if the token implements the ERC20Detailed standard
  imageUri?: string; // A URL pointing to the token logo. Can be either locally or externally hosted.
  resourceId: string; // The resourceId to be used when transferring tokens of this type.
  isNativeWrappedToken?: boolean // Flag to indicate that this is a wrapped native token (eg wETH on Ethereum). If this flag is not set for any of the tokens provided for this chain, wrapping functionality will be unavailable on that network.
  decimals?: number;
  isDoubleApproval?: boolean; // The token (eg USDT) will request approval twice to defend from the attack on approve/trasferFrom  methods
};
```

EVM Chains should additionally be configured with the following params

```
export type EvmBridgeConfig = BridgeConfig & {
  bridgeAddress: string;
  erc20HandlerAddress: string;
  type: "Ethereum";
  nativeTokenSymbol: string;
  // This should be the full path to display a tx hash, without the trailing slash, ie. https://etherscan.io/tx
  blockExplorer?: string;
  defaultGasPrice?: number;
  deployedBlockNumber?: number;
};
```


Run `yarn build`.

Deploy the contents of the `/build` folder to any static website host (eg. S3, Azure storage) or IPFS.

# Configuration server for running in the AWS enviroment

To run production enviroment you can use our `config-server` package to run tiny nodejs app which get config from AWS SSM and provide it to the App in `json` format

You can test it localy if you have your AWS credentials setuped in your terminal
````
cd ../packages/config-server
yarn start:server
````

# Docker configuration

There is `Dockerfile` for frontend in root direcotry and `server.dockerfile` for configuration server.

It can be run together with `docker-compose` from root direcotry :

````
docker-compose -f ./docker-compose.yml up
````
Keep in mind that you need to have `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_SESSION_TOKEN` envs set in your enviroment

# ChainSafe Security Policy

## Reporting a Security Bug
We take all security issues seriously, if you believe you have found a security issue within a ChainSafe
project please notify us immediately. If an issue is confirmed, we will take all necessary precautions
to ensure a statement and patch release is made in a timely manner.

Please email us a description of the flaw and any related information (e.g. reproduction steps, version) to
[security at chainsafe dot io](mailto:security@chainsafe.io).
