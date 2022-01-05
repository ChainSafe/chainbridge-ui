import { Bridge, BridgeFactory } from "@chainsafe/chainbridge-contracts";
import { BigNumber, utils } from "ethers";
import { useCallback, useEffect, useState } from "react";

export function useSetBridgeSettingsHook(homeBridge?: Bridge) {
  const [bridgeFee, setBridgeFee] = useState<number | undefined>();
  const [relayerThreshold, setRelayerThreshold] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    const getRelayerThreshold = async () => {
      if (homeBridge) {
        const threshold = BigNumber.from(
          await homeBridge._relayerThreshold()
        ).toNumber();
        setRelayerThreshold(threshold);
      }
    };
    const getBridgeFee = async () => {
      if (homeBridge) {
        const bridgeFee = Number(utils.formatEther(await homeBridge._fee()));
        setBridgeFee(bridgeFee);
      }
    };
    getRelayerThreshold();
    getBridgeFee();
  }, [homeBridge]);

  return [bridgeFee, relayerThreshold];
}
