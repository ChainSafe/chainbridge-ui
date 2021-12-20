export declare type EvmHomeReducerState = {
    depositAmount: number | undefined;
    selectedToken: string;
    networkId: number;
    homeTransferTxHash: string;
};
export declare type EvmHomeReducerAction = {
    type: "setDepositAmount";
    depositAmount?: number;
} | {
    type: "setSelectedToken";
    selectedToken: string;
} | {
    type: "setNetworkId";
    networkId: number;
} | {
    type: "setHomeTransferTxHash";
    homeTransferTxHash: string;
};
export declare function evmHomeReducer(state: EvmHomeReducerState, action: EvmHomeReducerAction): EvmHomeReducerState;
//# sourceMappingURL=EvmHomeReducer.d.ts.map