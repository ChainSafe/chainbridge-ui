import { Dispatch } from "react";
import { BigNumber, Event } from "ethers";
import { Bridge, BridgeFactory } from "@chainsafe/chainbridge-contracts";
import { BridgeConfig } from "../../../chainbridgeConfig";
import { TransactionStatus } from "../../NetworkManagerContext";
import {
  AddMessageAction,
  ResetAction,
  TxIsDone,
} from "../../../reducers/TransitMessageReducer";
import {
  BridgeData,
  BridgeEvents,
  Directions,
  Sygma,
} from "@chainsafe/sygma-sdk-core";
import { Listener } from "@ethersproject/providers";
const handleProposalEvent = (
  setTransactionStatus: (message: TransactionStatus | undefined) => void,
  setTransferTxHash: (input: string) => void,
  tokensDispatch: Dispatch<AddMessageAction | ResetAction | TxIsDone>,
  computedDirections: { from: Directions; to: Directions },
  chainbridgeInstance: Sygma,
  setDepositVotes: any,
  depositVotes: any,
  transferTxHash: string,
  depositNonce: number
): Bridge => {
  const { from, to } = computedDirections;
  const listersCount =
    chainbridgeInstance.proposalExecutionEventListenerCount("chain2");
  if (listersCount === 0) {
    chainbridgeInstance.destinationProposalExecutionEventListener(
      depositNonce,
      async (
        originDomainId: any,
        despositNonce: any,
        dataHash: any,
        tx: any
      ) => {
        if (transferTxHash !== tx.transactionHash) {
          const txReceipt = await tx.getTransactionReceipt();
          console.log(
            "🚀 ~ file: handleProposalEvent.ts ~ line 34 ~ txReceipt",
            txReceipt
          );
          console.log(
            "originDomainId",
            originDomainId,
            "despositNonce",
            despositNonce,
            "dataHash",
            dataHash
          );
          setDepositVotes(depositVotes + 1);
          tokensDispatch({
            type: "setTransactionIsDone",
          });
          setTransactionStatus("Transfer Completed");
          setTransferTxHash(tx.transactionHash);
        }
      }
    );
  }
};
export default handleProposalEvent;
