import React from "react";
import { ApiPromise } from "@polkadot/api";
import {
  BridgeConfig,
  SubstrateBridgeConfig,
} from "../../../chainbridgeConfig";

const getRelayerThresholdFunc =
  (
    api: ApiPromise | undefined,
    homeChainConfig: BridgeConfig | undefined,
    setRelayerThreshold: React.Dispatch<
      React.SetStateAction<number | undefined>
    >
  ) =>
  async () => {
    if (api) {
      const relayerThreshold = await api.query[
        (homeChainConfig as SubstrateBridgeConfig).chainbridgePalletName
      ].relayerThreshold();
      setRelayerThreshold(Number(relayerThreshold.toHuman()));
    }
  };

export default getRelayerThresholdFunc;
