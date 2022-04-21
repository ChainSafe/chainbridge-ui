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
- Styling: [JSS](https://cssinjs.org/?v=v10.0.3) + [Chainsafe UI Styling](https://npmjs.com/packages/@chainsafe/common-theme/)
- Forms & Validation: [Formik](https://jaredpalmer.com/formik) + [Yup](https://github.com/jquense/yup)
- Notifications: [Chainsafe UI Components](https://npmjs.com/packages/@chainsafe/common-components/)

## Install

### Install dependencies

For installing the dependencies use the command:

```
yarn install
```

### Update configs

1. Copy to `.env` file in the root of the project the content from `.env.dev`, `.env.stage` or `env.prod` depending on the environment you want to run.
1. Copy to `chainbridge-runtime-config.js` file in the `public` folder the content from `chainbridge-runtime-config.cere.dev.js`, `chainbridge-runtime-config.cere.stage.js` or `chainbridge-runtime-config.cere.prod.js` in `config` folder depending on the environment you want to run.

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
  chainId: number; // The bridge's chainId.
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

Substrate chains should be configured with the following

```
export type SubstrateBridgeConfig = BridgeConfig & {
  type: "Substrate";
  chainbridgePalletName: string; // The name of the chainbridge palette
  transferPalletName: string; // The name of the pallet that should initiate transfers
  bridgeFeeFunctionName?: string; // The name of the function to fetch the bridge fee
  bridgeFeeValue?: number; // The value of the bridge fee, scaled to human readable amounts. If the `bridgeFeeFunctionName` above is provided the onchain value will take preference.
  transferFunctionName: string; // The name of the method to call to initiate a transfer
  typesFileName: string; // The name of the Substrate types file. The file should be located in `src/Contexts/Adaptors/SubstrateApis`
};
```

Run `yarn build`.

Deploy the contents of the `/build` folder to any static website host (eg. S3, Azure storage) or IPFS.

The project can also be built and deployed to Netlify, Render.com by configuring the Build command and Publish directory on the respective service.

# ChainSafe Security Policy

## Reporting a Security Bug

We take all security issues seriously, if you believe you have found a security issue within a ChainSafe
project please notify us immediately. If an issue is confirmed, we will take all necessary precautions
to ensure a statement and patch release is made in a timely manner.

Please email us a description of the flaw and any related information (e.g. reproduction steps, version) to
[security at chainsafe dot io](mailto:security@chainsafe.io).
