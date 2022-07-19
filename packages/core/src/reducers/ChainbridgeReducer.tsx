import { BridgeData, BridgeEvents, Chainbridge, FeeOracleData } from "@chainsafe/chainbridge-sdk-core"
import { providers } from "ethers";

export type ChainbridgeState = {
  chainbridgeInstance: Chainbridge | undefined;
  // chainbridgeData: { chain1: BridgeEvents, chain2: BridgeEvents } | undefined;
  bridgeSetup: BridgeData | undefined
}

export type ChainbridgeReducerAction = {
  type: "setInstanceAndData";
  payload: { bridgeSetup: BridgeData, feeOracleSetup: FeeOracleData, chainbridgeInstance: Chainbridge };
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
      const { bridgeSetup, feeOracleSetup, chainbridgeInstance } = action.payload;
      // const chainbridge = new Chainbridge({ bridgeSetup, feeOracleSetup });
      // const chainbridgeConnected = chainbridge
      // chainbridge.initializeConnectionFromWeb3Provider(window.ethereum)
      // console.log('connected')
      return {
        ...state,
        chainbridgeInstance: chainbridgeInstance,
        // chainbridgeData: chainbridgeConnected,
        bridgeSetup: bridgeSetup
      }
    }
    default:
      return state
  }
};
