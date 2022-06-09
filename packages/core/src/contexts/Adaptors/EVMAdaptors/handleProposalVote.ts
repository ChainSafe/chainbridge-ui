import { Dispatch } from "react";
import { Event } from "ethers";
import { Bridge } from "@chainsafe/chainbridge-contracts";
import { BridgeConfig } from "../../../chainbridgeConfig";
import {
  AddMessageAction,
  ResetAction,
  TxIsDone,
} from "../../../reducers/TransitMessageReducer";
import { TransactionStatus } from "../../NetworkManagerContext";
import { BridgeData, BridgeEvents, Directions } from "@chainsafe/chainbridge-sdk-core";

const handleProposalVote = (
  depositVotes: number,
  tokensDispatch: Dispatch<AddMessageAction | ResetAction | TxIsDone>,
  setDepositVotes: (input: number) => void,
  chainbridgeData: { chain1: BridgeEvents, chain2: BridgeEvents },
  computedDirections: { from: Directions, to: Directions },
  transactionStatus?: TransactionStatus,
) => {
  const { from, to } = computedDirections

  const events = chainbridgeData![from as keyof BridgeData]

  events?.voteEvents![to as keyof BridgeData](
    async (
      originDomainId: number,
      depositNonce: number,
      status: number,
      dataHash: string,
      tx: Event
    ) => {
      const txReceipt = await tx.getTransactionReceipt();
      if (status === 1) {
        setDepositVotes(depositVotes + 1);
      }

      if (transactionStatus === "Transfer Completed") {
        return tokensDispatch({
          type: "setTransactionIsDone",
        });
      }

      return tokensDispatch({
        type: "addMessage",
        payload: {
          address: String(txReceipt.from),
          signed: txReceipt.status === 1 ? "Confirmed" : "Rejected",
          order: parseFloat(
            `1.${txReceipt.transactionIndex}${depositVotes + 1}$`
          ),
          eventType: "Vote",
        },
      });
    }
  )
};
export default handleProposalVote;
