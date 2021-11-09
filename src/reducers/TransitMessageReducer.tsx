import { TransitMessage } from "../contexts/NetworkManagerContext/NetworkManagerContext";

export type AddMessageAction = { type: "addMessage"; payload: TransitMessage };
export type ResetAction = { type: "resetMessages" };

export function transitMessageReducer(
  transitMessage: Array<TransitMessage>,
  action: AddMessageAction | ResetAction
) {
  switch (action.type) {
    case "addMessage":
      // NOTE: this is to avoid duplicate messages due to chain reorganization
      const { payload } = action;

      const messages = [...transitMessage, payload];
      // Select distinct messages by address and eventType
      const uniqueMessages = [
        ...new Map(
          messages.map((item) => [item.address + item.eventType, item])
        ).values(),
      ];
      const uniqueMessagesSorted = uniqueMessages.sort(
        (a, b) => a.order - b.order
      );
      return uniqueMessagesSorted;
    case "resetMessages":
      return [];
    default:
      return transitMessage;
  }
}
