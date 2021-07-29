import ShyftIcon from "./media/tokens/shyft.svg";
// import ETHIcon from "./media/tokens/eth.svg";
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
  export const chainbridgeConfig: ChainbridgeConfig = {
    // Goerli - Shyft Testnet Bridge
    chains: [

      {
        chainId: 10,
        networkId: 0x2CAD,
        name: "Shyft [ v5 Testnet ]",
        bridgeAddress: "0x566Ab5072CDB9cBEa216f9f9aB6AE11ee2f53203",
        erc20HandlerAddress: "0x3Bc3f0d31996f26914FFFC261Bd38FbB8A5aD649",
        rpcUrl: "http://testrpc.shyft.network:64738/",
        type: "Ethereum",
        blockExplorer: "https://bx.shyft.network/tx",
        nativeTokenSymbol: "SHFT [ TestNet5 ]",
        tokens: [
          {
            address: "0x8ba95659e89b69506b46b47c232011e9cd754e15",
            name: "Shyft [ Wrapped ]",
            symbol: "SHFT",
            imageUri: ShyftIcon,
            resourceId:
                "0x00000000000000000000008ba95659e89b69506b46b47c232011e9cd754e1500",
          },
        ],
      },
      {
        chainId: 110,
        networkId: 5,
        name: "Goerli [ Ethereum Testnet ]",
        bridgeAddress: "0x566Ab5072CDB9cBEa216f9f9aB6AE11ee2f53203",
        erc20HandlerAddress: "0x3Bc3f0d31996f26914FFFC261Bd38FbB8A5aD649",
        rpcUrl: "https://localhost:8547",
        type: "Ethereum",
        blockExplorer: "https://goerli.etherscan.io/tx",
        nativeTokenSymbol: "ETH [ Goerli ]",
        tokens: [
          {
            address: "0xb17c88bda07d28b3838e0c1de6a30eafbcf52d85",
            name: "Shyft [ Wrapped ]",
            symbol: "SHFT",
            imageUri: ShyftIcon,
            resourceId:
                "0x00000000000000000000008ba95659e89b69506b46b47c232011e9cd754e1500",
          },
        ],
      },

    ],
};
