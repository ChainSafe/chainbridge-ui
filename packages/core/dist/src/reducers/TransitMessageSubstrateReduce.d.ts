export declare type TransitMessageSubstrate = {
    address: string;
    message?: string;
    proposalStatus?: number;
    order?: number;
    signed?: "Confirmed" | "Rejected";
    eventType?: "Proposal" | "Vote";
};
export declare type AddMessageAction = {
    type: "addMessage";
    payload: TransitMessageSubstrate;
};
export declare type ResetAction = {
    type: "resetMessages";
};
export declare type TxIsDone = {
    type: "setTransactionIsDone";
};
export declare type TransitState = {
    txIsDone: boolean;
    transitMessage: Array<TransitMessageSubstrate>;
};
export declare function transitMessageReducerSubstrate(transitState: {
    txIsDone: boolean;
    transitMessage: Array<TransitMessageSubstrate>;
}, action: AddMessageAction | ResetAction | TxIsDone): TransitState;
//# sourceMappingURL=TransitMessageSubstrateReduce.d.ts.map