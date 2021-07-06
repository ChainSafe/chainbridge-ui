import ETHIcon from "./media/tokens/eth.svg";
// import WETHIcon from "./media/tokens/weth.svg";

export type TokenConfig = {
  address: string;
  name?: string;
  symbol?: string;
  imageUri?: string;
  resourceId: string;
  isNativeWrappedToken?: boolean;
};

export type ChainType = "Ethereum" | "Substrate";

export type BridgeConfig = {
  networkId?: number;
  chainId: number;
  name: string;
  rpcUrl: string;
  type: ChainType;
  tokens: TokenConfig[];
  nativeTokenSymbol: string;
  decimals: number;
};

export type EvmBridgeConfig = BridgeConfig & {
  bridgeAddress: string;
  erc20HandlerAddress: string;
  type: "Ethereum";
  //This should be the full path to display a tx hash, without the trailing slash, ie. https://etherscan.io/tx
  blockExplorer?: string;
  defaultGasPrice?: number;
  deployedBlockNumber?: number;
};

export type SubstrateBridgeConfig = BridgeConfig & {
  type: "Substrate";
  chainbridgePalletName: string;
  bridgeFeeFunctionName?: string; // If this value is provided, the chain value will be used will be used
  bridgeFeeValue?: number; // If the above value is not provided, this value will be used for the fee. No scaling should be applied.
  transferPalletName: string;
  transferFunctionName: string;
  typesFileName: string;
};

export type ChainbridgeConfig = {
  chains: Array<EvmBridgeConfig | SubstrateBridgeConfig>;
};

export const chainbridgeConfig: ChainbridgeConfig = {
  // Local GETH <> Local Substrate
  chains: [
    {
      chainId: 5,
      networkId: 5,
      name: "Ethereum",
      decimals: 18,
      bridgeAddress: "0xa806cA3bD88F790744462cBC34c40EDd5b8dc2Dd",
      erc20HandlerAddress: "0xf934Bfc8B5241b6C9e0DfC9A329AD687e79c5498",
      rpcUrl: "https://goerli.infura.io/v3/2532f2073c2d4a34b5b9544c76a3de8b",
      type: "Ethereum",
      nativeTokenSymbol: "ETH",
      tokens: [
        {
          address: "0xb8A59CEF67d12C5C75836aEfF1d97943F5A9F662",
          name: "CN",
          symbol: "CS",
          imageUri: ETHIcon,
          resourceId:
            "0x000000000000000000000000000000c76ebe4a02bbc34786d860b355f5a5ce00",
        },
      ],
    },
    {
      chainId: 1,
      networkId: 2,
      name: "Cerebellum Devnet",
      decimals: 10,
      rpcUrl: "wss://rpc.testnet.dev.cere.network:9945",
      type: "Substrate",
      nativeTokenSymbol: "CERE",
      chainbridgePalletName: "chainBridge",
      bridgeFeeFunctionName: "tokenTransferFee",
      transferPalletName: "palletBridge",
      transferFunctionName: "transferNative",
      typesFileName: "bridgeTypes.json",
      tokens: [
        {
          address: "substrate-native",
          name: "CFG",
          symbol: "CFG",
          resourceId: "substrate-native",
        },
      ],
    },
  ],
};
