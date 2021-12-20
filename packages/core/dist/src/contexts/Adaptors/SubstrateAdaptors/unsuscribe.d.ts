import { ApiPromise } from "@polkadot/api";
import { BridgeConfig } from "../../../chainbridgeConfig";
import { AddMessageAction, ResetAction, TxIsDone } from "../../../reducers/TransitMessageSubstrateReduce";
declare const unsuscribe: (api: ApiPromise, tokensDispatch: (value: AddMessageAction | ResetAction | TxIsDone) => void, setDepositVotes: (input: number) => void, setTransactionStatus: (message: "Initializing Transfer" | "In Transit" | "Transfer Completed" | "Transfer Aborted" | undefined) => void, destinationChainConfig: BridgeConfig | undefined, depositVotes: number) => import("@polkadot/api/types").UnsubscribePromise;
export default unsuscribe;
//# sourceMappingURL=unsuscribe.d.ts.map