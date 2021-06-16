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
      chainId: 0,
      networkId: 5,
      name: "Ethereum - Local",
      decimals: 18,
      bridgeAddress: "0x62877dDCd49aD22f5eDfc6ac108e9a4b5D2bD88B",
      erc20HandlerAddress: "0x3167776db165D8eA0f51790CA2bbf44Db5105ADF",
      rpcUrl: "http://localhost:8545",
      type: "Ethereum",
      nativeTokenSymbol: "ETH",
      tokens: [
        {
          address: "0x21605f71845f372A9ed84253d2D024B7B10999f4",
          name: "TOKEN",
          symbol: "TOKEN",
          imageUri: ETHIcon,
          resourceId:
            "0x000000000000000000000000000000c76ebe4a02bbc34786d860b355f5a5ce00",
        },
      ],
    },
    {
      chainId: 1,
      networkId: 2,
      name: "Substrate - Local",
      decimals: 18,
      rpcUrl: "ws://localhost:9944",
      type: "Substrate",
      nativeTokenSymbol: "DOT",
      chainbridgePalletName: "chainBridge",
      transferPalletName: "example",
      transferFunctionName: "transferNative",
      typesFileName: "bridgeTypes.json",
      tokens: [
        {
          address: "substrate-native",
          name: "DOT",
          symbol: "DOT",
          resourceId: "substrate-native",
        },
      ],
    },
  ],
};
