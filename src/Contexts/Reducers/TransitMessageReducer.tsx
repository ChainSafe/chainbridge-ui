import { Vote } from "../NetworkManagerContext";

export type AddMessageAction = { type: "addMessage"; payload: string | Vote };
export type ResetAction = { type: "resetMessages" };

export function transitMessageReducer(
  transitMessage: Array<string | Vote>,
  action: AddMessageAction | ResetAction
) {
  switch (action.type) {
    case "addMessage":
      return [...transitMessage, action.payload];
    case "resetMessages":
      return [];
    default:
      return transitMessage;
  }
}
