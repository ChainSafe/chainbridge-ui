import { BridgeData, BridgeEvents, Sygma, FeeOracleData } from "@chainsafe/sygma-sdk-core"
import { providers } from "ethers";

export type ChainbridgeState = {
  chainbridgeInstance: Sygma | undefined;
  bridgeSetup: BridgeData | undefined
}

export type ChainbridgeReducerAction = {
  type: "setInstanceAndData";
  payload: { bridgeSetup: BridgeData, feeOracleSetup: FeeOracleData, chainbridgeInstance: Sygma };
} | {
  type: "setAll";
  payload: {
    provider: providers.Web3Provider;
    isActive: boolean;
    chainId: number;
    accounts: any;
    address: string,
  };
};;

export const chainbridgeReducer = (
  state: ChainbridgeState,
  action: ChainbridgeReducerAction
) => {
  switch(action.type) {
    case "setInstanceAndData": {
      const { bridgeSetup, chainbridgeInstance } = action.payload;
      return {
        ...state,
        chainbridgeInstance: chainbridgeInstance,
        bridgeSetup: bridgeSetup
      }
    }
    default:
      return state
  }
};
