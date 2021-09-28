import ETHIcon from "./media/tokens/eth.svg";
// import WETHIcon from "./media/tokens/weth.svg";
import CEREIcon from "./media/tokens/cere-token.svg";

const cereTokenName = "CERE Network";
const cereTokenSymbol = "CERE";

export type TokenConfig = {
  address: string;
  name?: string;
  symbol?: string;
  imageUri?: string;
  resourceId: string;
  isNativeWrappedToken?: boolean;
  decimals?: number;
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
  destinationChain?: boolean;
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

export type UIConfig = { wrapTokenPage: boolean };

export const chainbridgeConfig: ChainbridgeConfig = {
  // Local GETH <> Local Substrate
  chains: [
    {
      chainId: +((process.env.REACT_APP_POLYGON_CHAIN_ID as unknown) as number),
      networkId: +((process.env
        .REACT_APP_POLYGON_NETWORK_ID as unknown) as number),
      name: process.env.REACT_APP_POLYGON_NETWORK_NAME as string,
      decimals: 10,
      bridgeAddress: process.env.REACT_APP_POLYGON_BRIDGE_ADDRESS as string,
      erc20HandlerAddress: process.env
        .REACT_APP_POLYGON_ERC20_HANDLER_ADDRESS as string,
      rpcUrl: "",
      type: "Ethereum",
      nativeTokenSymbol: "MATIC",
      tokens: [
        {
          address: process.env.REACT_APP_POLYGON_ERC20_TOKEN_ADDRESS as string,
          name: cereTokenName,
          symbol: cereTokenSymbol,
          imageUri: CEREIcon,
          resourceId:
            "0x000000000000000000000000000000c76ebe4a02bbc34786d860b355f5a5ce00",
        },
      ],
    },
    {
      chainId: 1,
      networkId: 2,
      name: process.env.REACT_APP_CERE_NETWORK_NAME as string,
      decimals: 10,
      rpcUrl: process.env.REACT_APP_CERE_RPC_URL as string,
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
      destinationChain: true,
    },
    {
      chainId: +((process.env
        .REACT_APP_ETHEREUM_CHAIN_ID as unknown) as number),
      networkId: +((process.env
        .REACT_APP_ETHEREUM_NETWORK_ID as unknown) as number),
      name: process.env.REACT_APP_ETHEREUM_NETWORK_NAME as string,
      decimals: 10,
      bridgeAddress: process.env.REACT_APP_ETHEREUM_BRIDGE_ADDRESS as string,
      erc20HandlerAddress: process.env
        .REACT_APP_ETHEREUM_ERC20_HANDLER_ADDRESS as string,
      rpcUrl: "",
      type: "Ethereum",
      nativeTokenSymbol: "ETH",
      tokens: [
        {
          address: process.env.REACT_APP_ETHEREUM_ERC20_TOKEN_ADDRESS as string,
          name: cereTokenName,
          symbol: cereTokenSymbol,
          imageUri: CEREIcon,
          resourceId:
            "0x000000000000000000000000000000c76ebe4a02bbc34786d860b355f5a5ce00",
        },
      ],
    },
  ],
};
