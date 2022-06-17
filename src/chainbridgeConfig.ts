import ETHIcon from "./media/tokens/eth.svg";
// import WETHIcon from "./media/tokens/weth.svg";
import CEREIcon from "./media/tokens/cere-token.svg";

export type TokenConfig = {
  address: string;
  name?: string;
  symbol?: string;
  imageUri?: string;
  resourceId: string;
  isNativeWrappedToken?: boolean;
  decimals?: number;
  isDoubleApproval?: boolean;
};

export type ChainType = "Ethereum" | "Substrate";

export type TransferFallback = {
  chainId: number;
  delayMs: number;
  blockTimeMs: number;
  pollingMaxIntervalMs: number;
  pollingMinIntervalMs: number;
};

export type BridgeConfig = {
  networkId?: number;
  chainId: number;
  name: string;
  rpcUrl: string;
  rpcFallbackUrls?: string[];
  type: ChainType;
  tokens: TokenConfig[];
  nativeTokenSymbol: string;
  decimals: number;
  availableAsHomeNetwork?: boolean;
  transferFallback: TransferFallback[];
  blockExplorer?: string;
};

export type EvmBridgeConfig = BridgeConfig & {
  bridgeAddress: string;
  erc20HandlerAddress: string;
  type: "Ethereum";
  //This should be the full path to display a tx hash, without the trailing slash, ie. https://etherscan.io/tx
  defaultGasPrice?: number;
  gasPriceSuggestionEnabled?: boolean;
  defaultGasPriceIncreaseInPercents?: number;
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
  existentialDepositPlusNetworkFee: number;
  bridgeAccountId: string;
};

export type ChainbridgeConfig = {
  ga: {
    trackingId: string;
    appName: string;
    env: string;
  };
  chains: Array<EvmBridgeConfig | SubstrateBridgeConfig>;
};

export type UIConfig = { wrapTokenPage: boolean };

export const chainbridgeConfig: ChainbridgeConfig =
  window.__RUNTIME_CONFIG__.CHAINBRIDGE;

export const getСhainConfig = (chainId: number) => {
  return chainbridgeConfig.chains.find((c) => c.chainId === chainId) as
    | EvmBridgeConfig
    | SubstrateBridgeConfig;
};

export const getСhainTransferFallbackConfig = (
  chainId: number,
  destinationChainId: number
) => {
  const chainConfig = getСhainConfig(chainId);
  return chainConfig.transferFallback.find(
    (fallback) => fallback.chainId === destinationChainId
  ) as TransferFallback;
};
