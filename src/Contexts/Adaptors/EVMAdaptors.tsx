import { BridgeConfig } from "../../chainbridgeConfig";
import { HomeChainAdaptor } from "./interfaces";

export const EVMAdaptorFactory = (
  chainConfig: BridgeConfig
): HomeChainAdaptor => {
  return {
    chainConfig,
  };
};
