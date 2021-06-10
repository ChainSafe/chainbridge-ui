import { ApiPromise, WsProvider } from "@polkadot/api";
import types from "./bridgeTypes.json";

const TOKEN_DECIMALS = 18;
// Name of pallet with the methods to initiate deposit
const BRIDGE_PALLET = "example";
// Name of ChainBridge pallet
export const CHAINBRIDGE_PALLET = "chainBridge";

export const createApi = (rpcUrl: string) => {
  const provider = new WsProvider(rpcUrl);
  return ApiPromise.create({ provider, types });
};

export const submitDeposit = (
  api: ApiPromise,
  amount: number,
  recipient: string,
  destinationChainId: number
) => {
  return api.tx[BRIDGE_PALLET].transferNative(
    // TODO: This should be a BigInt
    (amount * 10) ^ TOKEN_DECIMALS,
    recipient,
    destinationChainId
  );
};
