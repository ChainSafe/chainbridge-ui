import { BridgeData, BridgeEvents, Chainbridge } from "@chainsafe/chainbridge-sdk-core"

export type ChainbridgeState = {
  chainbridgeInstance: Chainbridge | undefined;
  chainbridgeData: { chain1: BridgeEvents, chain2: BridgeEvents } | undefined;
  bridgeSetup: BridgeData | undefined
}

export type ChainbridgeReducerAction = | { type: 'setInstanceAndData', bridgeSetup: BridgeData }

export const chainbridgeReducer = (
  state: ChainbridgeState,
  action: ChainbridgeReducerAction
) => {
  switch(action.type) {
    case "setInstanceAndData": {
      const chainbridge = new Chainbridge( { bridgeSetup: action.bridgeSetup })
      const chainbridgeConnected = chainbridge.initializeConnection()

      return {
        ...state,
        chainbridgeInstance: chainbridge,
        chainbridgeData: chainbridgeConnected,
        bridgeSetup: action.bridgeSetup
      }
    }
    default:
      return state
  }
};
