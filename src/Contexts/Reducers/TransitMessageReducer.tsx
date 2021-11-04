import { Vote } from "../NetworkManagerContext";

export type AddMessageAction = { type: "addMessage"; payload: string | Vote };
export type ResetAction = { type: "resetMessages" };
export type TxIsDone = { type: "setTransactionIsDone" };

export type TransitState = {
  txIsDone: boolean;
  transitMessage: Array<string | Vote>;
};

export function transitMessageReducer(
  transitState: { txIsDone: boolean; transitMessage: Array<string | Vote> },
  action: AddMessageAction | ResetAction | TxIsDone
): TransitState {
  switch (action.type) {
    case "addMessage":
      // NOTE: this is to avoid duplicate messages due to chain reorganization
      const { payload } = action;

      if (typeof payload === "object") {
        const foundElement = transitState.transitMessage.find(
          ({ address }: any) => address === payload.address
        );

        return foundElement !== undefined
          ? transitState
          : {
              ...transitState,
              transitMessage: [...transitState.transitMessage, payload],
            };
      }

      const foundMessage = transitState.transitMessage.find(
        (item: any) => item === payload
      );

      return foundMessage !== undefined
        ? transitState
        : {
            ...transitState,
            transitMessage: [...transitState.transitMessage, payload],
          };

    case "resetMessages":
      return { txIsDone: false, transitMessage: [] };
    case "setTransactionIsDone":
      return { ...transitState, txIsDone: true };
    default:
      return transitState;
  }
}
