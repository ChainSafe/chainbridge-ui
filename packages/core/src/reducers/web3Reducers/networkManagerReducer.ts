import { Actions, NetworkManagerState } from "../../types/networkManagerTypes";

const networkManagerReducer = (
  state: NetworkManagerState,
  action: Actions
): NetworkManagerState => {
  switch (action.type) {
    case "setWalletType":
      return {
        ...state,
        walletType: action.payload
      }
    case "setHomeChainConfig": {
      const { payload } = action

      if(payload !== undefined){
        return {
          ...state,
          homeChainConfig: payload
        }
      }
      return state
    }
    case "setHomeChains":
      return {
        ...state,
        homeChains: action.payload
      }
    case "setDestinationChain": {
      const { payload } = action

      if(payload !== undefined){
        return {
          ...state,
          destinationChainConfig: payload
        }
      }
      return state
    }
    case "setDestinationChains":
      return {
        ...state,
        destinationChains: action.payload
      }
    case "setTransactionStatus": {
      const { payload } = action

      if(payload !== undefined){
        return {
          ...state,
          transactionStatus: payload
        }
      }
      return state
    }
    case "addMessage":
      return {
        ...state,
        transitMessage: [ ...state.transitMessage, action.payload]
      }
    case "resetMessages": {
      // TODO: CHECK WHAT IS BEING DONE ON RESETING THE MESSAGES
      return state
    }
    case "setTransactionIsDone":
      //TODO SAME CHECK HERE RELATED OF WHAT TO DO WITH THE STATE
      return state
    case "setAll":
      const { walletType } = action.payload
      return {
        ...state,
        walletType
      }
    default:
      return state
  }
}

export default networkManagerReducer

