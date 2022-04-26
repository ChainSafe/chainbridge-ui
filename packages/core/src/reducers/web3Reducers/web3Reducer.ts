import { LocalWeb3State, Actions } from "../../types";

const localWeb3ContextReducer = (
  state: LocalWeb3State,
  action: Actions
): LocalWeb3State => {
  switch (action.type) {
    case "addToken":
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
        savedWallet: action.payload ? state.savedWallet : ""
      };
    case "setWallet": {
      const { payload: { wallet, provider } } = action
      return {
        ...state,
        wallet: wallet!,
        provider: provider!,
        savedWallet: wallet ? wallet?.name! : ""
      };
    }
    case "setProvider":
      return {
        ...state,
        provider: action.payload,
      };
    case "setNetworkAndProvider": {
      const { payload: { network, provider } } = action
      return {
        ...state,
        network,
        provider: provider!,
      };
    }
    case "setNetwork": {
      const { payload } = action
      return {
        ...state,
        network: payload
      }
    }
    case "setOnBoard":
      return {
        ...state,
        onboard: action.payload,
      };
    case 'setWalletConnect': {
      const { payload: { wallet, provider } } = action
      return {
        ...state,
        wallet: wallet!,
        provider: provider!,
        savedWallet: wallet?.name!
      }
    }
    case 'setSavedWallet':
      return {
        ...state,
        savedWallet: action.payload
      }
    case 'setAll':
      const { payload: { provider, isActive, chainId, address } } = action
      return {
        ...state,
        provider,
        address,
        isReady: isActive,
        network: chainId,
      }
    default:
      return state;
  }
};

export default localWeb3ContextReducer
