import { Vote } from "../NetworkManagerContext";

export type AddMessageAction = { type: "addMessage"; payload: string | Vote };
export type ResetAction = { type: "resetMessages" };

export function transitMessageReducer(
  transitMessage: Array<string | Vote>,
  action: AddMessageAction | ResetAction
) {
  switch (action.type) {
    case "addMessage":
      // NOTE: this is to avoid duplicate messages due to chain reorganization
      const { payload } = action;

      if (typeof payload === "object") {
        const foundElement = transitMessage.find(
          ({ address }: any) => address === payload.address
        );

        return foundElement !== undefined
          ? transitMessage
          : [...transitMessage, payload];
      }

      const foundMessage = transitMessage.find((item: any) => item === payload);

      return foundMessage !== undefined
        ? transitMessage
        : [...transitMessage, payload];

    case "resetMessages":
      return [];
    default:
      return transitMessage;
  }
}
