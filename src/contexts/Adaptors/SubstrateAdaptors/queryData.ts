import { Tokens } from "@chainsafe/web3-context/dist/context/tokensReducer";
import { ApiPromise } from "@polkadot/api";
import { VoidFn } from "@polkadot/api/types";
import { utils } from "ethers";
import { BridgeConfig } from "../../../chainbridgeConfig";
import { BigNumber as BN } from "bignumber.js";

const queryData = (
  api: ApiPromise,
  homeChainConfig: BridgeConfig,
  unsubscribe: VoidFn | undefined,
  setTokens: (value: React.SetStateAction<Tokens>) => void,
  address: string
): VoidFn | undefined => {
  api.query.system
    .account(address, (result) => {
      const {
        data: { free: balance },
      } = result.toJSON() as any;
      setTokens({
        [homeChainConfig.tokens[0].symbol || "TOKEN"]: {
          decimals: homeChainConfig.decimals,
          balance: parseInt(
            utils.formatUnits(balance, homeChainConfig.decimals)
          ),
          balanceBN: new BN(balance).shiftedBy(-homeChainConfig.decimals),
          name: homeChainConfig.tokens[0].name,
          symbol: homeChainConfig.tokens[0].symbol,
        },
      });
    })
    .then((unsub) => {
      unsubscribe = unsub;
    })
    .catch(console.error);
  return unsubscribe;
};

export default queryData;
