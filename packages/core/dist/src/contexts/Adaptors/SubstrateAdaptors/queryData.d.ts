import { Tokens } from "@chainsafe/web3-context/dist/context/tokensReducer";
import { ApiPromise } from "@polkadot/api";
import { VoidFn } from "@polkadot/api/types";
import { BridgeConfig } from "../../../chainbridgeConfig";
declare const queryData: (api: ApiPromise, homeChainConfig: BridgeConfig, unsubscribe: VoidFn | undefined, setTokens: (value: React.SetStateAction<Tokens>) => void, address: string) => VoidFn | undefined;
export default queryData;
//# sourceMappingURL=queryData.d.ts.map