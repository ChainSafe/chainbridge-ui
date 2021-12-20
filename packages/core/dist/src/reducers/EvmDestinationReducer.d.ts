export declare type EvmDestinationReducerState = {
    transferTxHash: string;
    depositVotes: number;
};
export declare type EvmDestinationReducerAction = {
    type: "setTransferTxHash";
    transferTxHash: string;
} | {
    type: "setDepositVotes";
    depositVotes: number;
};
export declare function evmDestinationReducer(state: EvmDestinationReducerState, action: EvmDestinationReducerAction): EvmDestinationReducerState;
//# sourceMappingURL=EvmDestinationReducer.d.ts.map