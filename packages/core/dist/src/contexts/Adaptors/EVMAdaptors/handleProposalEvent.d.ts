import { Dispatch } from "react";
import { BridgeConfig } from "../../../chainbridgeConfig";
import { TransactionStatus } from "../../NetworkManagerContext";
import { AddMessageAction, ResetAction } from "../../../reducers/TransitMessageReducer";
declare const handleProposalEvent: (destinationBridge: Bridge, homeChainConfig: BridgeConfig, depositNonce: string, destinationChainConfig: BridgeConfig, setTransactionStatus: (message: TransactionStatus | undefined) => void, setTransferTxHash: (input: string) => void, tokensDispatch: Dispatch<AddMessageAction | ResetAction>) => void;
export default handleProposalEvent;
//# sourceMappingURL=handleProposalEvent.d.ts.map