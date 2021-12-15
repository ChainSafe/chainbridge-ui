import { LocalWeb3State, Actions } from "./types";

export const localWeb3ContextReducer = (
  state: LocalWeb3State,
  action: Actions
): LocalWeb3State => {
  switch (action.type) {
    case "addToken":
      console.log("ADD TOKEN");
      return {
        ...state,
        tokens: {
          ...state.tokens,
          [action.payload.id]: { ...action.payload.token },
        },
      };
    case "updateTokenBalanceAllowance":
      return {
        ...state,
        tokens: {
          ...state.tokens,
          [action.payload.id]: {
            ...state.tokens[action.payload.id],
            balance: action.payload.balance,
            balanceBN: action.payload.balanceBN,
            spenderAllowance: action.payload.spenderAllowance,
          },
        },
      };
    case "resetTokens":
      return { ...state, tokens: {} };
    case "setAddress":
      return {
        ...state,
        address: action.payload,
      };
    case "setBalance":
      return {
        ...state,
        ethBalance: action.payload,
      };
    case "setIsReady":
      return {
        ...state,
        isReady: action.payload,
      };
    case "setWallet":
      return {
        ...state,
        wallet: action.payload!,
      };
    case "setProvider":
      return {
        ...state,
        provider: action.payload,
      };
    case "setNetwork":
      return {
        ...state,
        network: action.payload,
      };
    case "setOnBoard":
      console.log("ONBOARD", action.payload);
      return {
        ...state,
        onboard: action.payload,
      };
    default:
      return state;
  }
};
