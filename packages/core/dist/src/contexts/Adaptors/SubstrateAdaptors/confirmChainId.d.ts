import { ApiPromise } from "@polkadot/api";
import { BridgeConfig } from "../../../chainbridgeConfig";
declare const confirmChainIdFunc: (api: ApiPromise | undefined, homeChainConfig: BridgeConfig | undefined, homeChains: BridgeConfig[], handleSetHomeChain: (domainId: number | undefined) => void) => () => Promise<void>;
export default confirmChainIdFunc;
//# sourceMappingURL=confirmChainId.d.ts.map