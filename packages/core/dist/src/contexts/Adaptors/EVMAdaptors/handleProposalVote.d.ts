import { Dispatch } from "react";
import { BridgeConfig } from "../../../chainbridgeConfig";
import { AddMessageAction, ResetAction, TxIsDone } from "../../../reducers/TransitMessageReducer";
import { TransactionStatus } from "../../NetworkManagerContext";
declare const handleProposalVote: (destinationBridge: Bridge, homeChainConfig: BridgeConfig, depositNonce: string, depositVotes: number, tokensDispatch: Dispatch<AddMessageAction | ResetAction | TxIsDone>, setDepositVotes: (input: number) => void, transactionStatus?: TransactionStatus | undefined) => void;
export default handleProposalVote;
//# sourceMappingURL=handleProposalVote.d.ts.map