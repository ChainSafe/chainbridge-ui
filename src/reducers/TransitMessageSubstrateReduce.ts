export type TransitMessageSubstrate = {
  address: string;
  message?: string;
  proposalStatus?: number;
  order?: number;
  signed?: "Confirmed" | "Rejected";
  eventType?: "Proposal" | "Vote";
};

export type AddMessageAction = {
  type: "addMessage";
  payload: TransitMessageSubstrate;
};
export type ResetAction = { type: "resetMessages" };
export type TxIsDone = { type: "setTransactionIsDone" };

export type TransitState = {
  txIsDone: boolean;
  transitMessage: Array<TransitMessageSubstrate>;
};

export function transitMessageReducerSubstrate(
  transitState: {
    txIsDone: boolean;
    transitMessage: Array<TransitMessageSubstrate>;
  },
  action: AddMessageAction | ResetAction | TxIsDone
): TransitState {
  switch (action.type) {
    case "addMessage":
      // NOTE: this is to avoid duplicate messages due to chain reorganization
      const { payload } = action;

      const messages = [...transitState.transitMessage, payload];
      // Select distinct messages by address and eventType
      const uniqueMessages = [
        ...new Map(
          messages.map((item: TransitMessageSubstrate) => [
            item.address + item.eventType,
            item,
          ])
        ).values(),
      ];
      const uniqueMessagesSorted = uniqueMessages.sort(
        (a, b) => ("order" in a && "order" in b && a.order! - b.order!) || 0
      );
      return { ...transitState, transitMessage: uniqueMessagesSorted };
    case "resetMessages":
      return { txIsDone: false, transitMessage: [] };
    case "setTransactionIsDone":
      return { ...transitState, txIsDone: true };
    default:
      return transitState;
  }
}
