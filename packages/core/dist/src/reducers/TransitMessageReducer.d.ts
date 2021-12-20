import { TransitMessage } from "../contexts/NetworkManagerContext/NetworkManagerContext";
export declare type AddMessageAction = {
    type: "addMessage";
    payload: TransitMessage;
};
export declare type ResetAction = {
    type: "resetMessages";
};
export declare type TxIsDone = {
    type: "setTransactionIsDone";
};
export declare type TransitState = {
    txIsDone: boolean;
    transitMessage: Array<TransitMessage>;
};
export declare function transitMessageReducer(transitState: {
    txIsDone: boolean;
    transitMessage: Array<TransitMessage>;
}, action: AddMessageAction | ResetAction | TxIsDone): TransitState;
//# sourceMappingURL=TransitMessageReducer.d.ts.map