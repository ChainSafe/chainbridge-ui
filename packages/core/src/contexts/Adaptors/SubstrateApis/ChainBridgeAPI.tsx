import { ApiPromise, WsProvider } from "@polkadot/api";
import BigNumber from "bignumber.js";
import {
  chainbridgeConfig,
  SubstrateBridgeConfig,
} from "../../../chainbridgeConfig";

export const createApi = async (rpcUrl: string) => {
  const provider = new WsProvider(rpcUrl);
  const subChainConfig = chainbridgeConfig().chains.find(
    (c) => c.rpcUrl === rpcUrl
  ) as SubstrateBridgeConfig;
  const types = (await import(`./${subChainConfig.typesFileName}`)) as any;
  return ApiPromise.create({ provider, types });
};

export const submitDeposit = (
  api: ApiPromise,
  amount: number,
  recipient: string,
  destinationChainId: number
) => {
  const subChainConfig = chainbridgeConfig().chains.find(
    (c) => c.domainId !== destinationChainId
  ) as SubstrateBridgeConfig;

  return api.tx[subChainConfig.transferPalletName][
    subChainConfig.transferFunctionName
  ](
    new BigNumber(amount)
      .multipliedBy(
        new BigNumber(10).pow(new BigNumber(subChainConfig.decimals))
      )
      .toString(10),
    recipient,
    destinationChainId
  );
};
