export declare type TokenConfig = {
    address: string;
    name?: string;
    symbol?: string;
    imageUri?: string;
    resourceId: string;
    isNativeWrappedToken?: boolean;
    decimals?: number;
    isDoubleApproval?: boolean;
};
export declare type ChainType = "Ethereum" | "Substrate";
export declare type BridgeConfig = {
    networkId?: number;
    domainId: number;
    name: string;
    rpcUrl: string;
    type: ChainType;
    tokens: TokenConfig[];
    nativeTokenSymbol: string;
    decimals: number;
};
export declare type EvmBridgeConfig = BridgeConfig & {
    bridgeAddress: string;
    erc20HandlerAddress: string;
    type: "Ethereum";
    blockExplorer?: string;
    defaultGasPrice?: number;
    deployedBlockNumber?: number;
};
export declare type SubstrateBridgeConfig = BridgeConfig & {
    type: "Substrate";
    chainbridgePalletName: string;
    bridgeFeeFunctionName?: string;
    bridgeFeeValue?: number;
    transferPalletName: string;
    transferFunctionName: string;
    typesFileName: string;
    blockExplorer?: string;
};
export declare type ChainbridgeConfig = {
    chains: Array<EvmBridgeConfig | SubstrateBridgeConfig>;
};
export declare type UIConfig = {
    wrapTokenPage: boolean;
    transactionAutoUpdateInterval: number;
};
export declare const chainbridgeConfig: ChainbridgeConfig;
//# sourceMappingURL=chainbridgeConfig.d.ts.map