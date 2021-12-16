import { Dispatch } from "react";
import { BigNumber, Event } from "ethers";
import { Bridge, BridgeFactory } from "@chainsafe/chainbridge-contracts";
import { BridgeConfig } from "../../../chainbridgeConfig";
import { TransactionStatus } from "../../NetworkManagerContext";
import {
  AddMessageAction,
  ResetAction,
} from "../../../reducers/TransitMessageReducer";
const handleProposalEvent = (
  destinationBridge: Bridge,
  homeChainConfig: BridgeConfig,
  depositNonce: string,
  destinationChainConfig: BridgeConfig,
  setTransactionStatus: (message: TransactionStatus | undefined) => void,
  setTransferTxHash: (input: string) => void,
  tokensDispatch: Dispatch<AddMessageAction | ResetAction>
) => {
  destinationBridge.on(
    destinationBridge.filters.ProposalEvent(null, null, null, null),
    async (
      originDomainId: number,
      depositNonce: number,
      status: number,
      dataHash: string,
      tx: Event
    ) => {
      const txReceipt = await tx.getTransactionReceipt();
      const proposalStatus = BigNumber.from(status).toNumber();
      switch (proposalStatus) {
        case 1:
          tokensDispatch({
            type: "addMessage",
            payload: {
              address: String(txReceipt.from),
              message: `Proposal created on ${destinationChainConfig.name}`,
              proposalStatus: proposalStatus,
              order: proposalStatus,
              eventType: "Proposal",
            },
          });
          break;
        case 2:
          tokensDispatch({
            type: "addMessage",
            payload: {
              address: String(txReceipt.from),
              message: `Proposal has passed. Executing...`,
              proposalStatus: proposalStatus,
              order: proposalStatus,
              eventType: "Proposal",
            },
          });
          break;
        case 3:
          setTransactionStatus("Transfer Completed");
          setTransferTxHash(tx.transactionHash);
          break;
        case 4:
          setTransactionStatus("Transfer Aborted");
          setTransferTxHash(tx.transactionHash);
          break;
      }
    }
  );
};
export default handleProposalEvent;
