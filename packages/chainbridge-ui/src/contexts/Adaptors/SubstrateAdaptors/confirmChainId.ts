import { ApiPromise } from "@polkadot/api";
import {
  BridgeConfig,
  SubstrateBridgeConfig,
} from "../../../chainbridgeConfig";

const confirmChainIdFunc =
  (
    api: ApiPromise | undefined,
    homeChainConfig: BridgeConfig | undefined,
    homeChains: BridgeConfig[],
    handleSetHomeChain: (domainId: number | undefined) => void
  ) =>
  async () => {
    if (api) {
      const currentId = Number(
        api.consts[
          (homeChainConfig as SubstrateBridgeConfig).chainbridgePalletName
        ].chainIdentity.toHuman()
      );
      if (homeChainConfig?.domainId !== currentId) {
        const correctConfig = homeChains.find(
          (item) => item.domainId === currentId
        );
        if (correctConfig) {
          handleSetHomeChain(currentId);
        }
      }
    }
  };

export default confirmChainIdFunc;
