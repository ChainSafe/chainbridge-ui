import { BridgeData, BridgeEvents, Chainbridge, FeeOracleData } from "@chainsafe/chainbridge-sdk-core"

export type ChainbridgeState = {
  chainbridgeInstance: Chainbridge | undefined;
  chainbridgeData: { chain1: BridgeEvents, chain2: BridgeEvents } | undefined;
  bridgeSetup: BridgeData | undefined
}

export type ChainbridgeReducerAction = {
  type: "setInstanceAndData";
  payload: { bridgeSetup: BridgeData, feeOracleSetup: FeeOracleData };
};

export const chainbridgeReducer = (
  state: ChainbridgeState,
  action: ChainbridgeReducerAction
) => {
  switch(action.type) {
    case "setInstanceAndData": {
      const { bridgeSetup, feeOracleSetup } = action.payload;
      const chainbridge = new Chainbridge({ bridgeSetup, feeOracleSetup });
      const chainbridgeConnected = chainbridge.initializeConnection()

      return {
        ...state,
        chainbridgeInstance: chainbridge,
        chainbridgeData: chainbridgeConnected,
        bridgeSetup: bridgeSetup
      }
    }
    default:
      return state
  }
};
