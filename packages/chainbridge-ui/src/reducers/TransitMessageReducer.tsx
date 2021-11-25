import { TransitMessage } from "../contexts/NetworkManagerContext/NetworkManagerContext";

export type AddMessageAction = { type: "addMessage"; payload: TransitMessage };
export type ResetAction = { type: "resetMessages" };
export type TxIsDone = { type: "setTransactionIsDone" };

export type TransitState = {
  txIsDone: boolean;
  transitMessage: Array<TransitMessage>;
};

export function transitMessageReducer(
  transitState: {
    txIsDone: boolean;
    transitMessage: Array<TransitMessage>;
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
          messages.map((item: TransitMessage) => [
            item.address + item.eventType,
            item,
          ])
        ).values(),
      ];
      const uniqueMessagesSorted = uniqueMessages.sort(
        (a, b) => a.order - b.order
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
