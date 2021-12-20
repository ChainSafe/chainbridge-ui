import React from "react";
import { ApiPromise } from "@polkadot/api";
import { BridgeConfig } from "../../../chainbridgeConfig";
declare const getRelayerThresholdFunc: (api: ApiPromise | undefined, homeChainConfig: BridgeConfig | undefined, setRelayerThreshold: React.Dispatch<React.SetStateAction<number | undefined>>) => () => Promise<void>;
export default getRelayerThresholdFunc;
//# sourceMappingURL=getRelayerThreshold.d.ts.map