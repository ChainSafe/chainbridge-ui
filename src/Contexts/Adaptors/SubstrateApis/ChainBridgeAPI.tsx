import { ApiPromise, WsProvider } from "@polkadot/api";
import BigNumber from "bn.js";
import {
  chainbridgeConfig,
  SubstrateBridgeConfig,
} from "../../../chainbridgeConfig";
import types from "./bridgeTypes.json";

export const createApi = async (rpcUrl: string) => {
  const provider = new WsProvider(rpcUrl);
  return ApiPromise.create({ provider, types });
};

export const submitDeposit = (
  api: ApiPromise,
  amount: number,
  recipient: string,
  destinationChainId: number
) => {
  const subChainConfig = chainbridgeConfig.chains.find(
    (c) => c.chainId !== destinationChainId
  ) as SubstrateBridgeConfig;

  return api.tx[subChainConfig.transferPalletName].transferNative(
    new BigNumber(amount)
      .mul(new BigNumber(10).pow(new BigNumber(subChainConfig.decimals)))
      .toString(10),
    recipient,
    destinationChainId
  );
};
