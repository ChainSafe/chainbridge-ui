import { Dispatch } from "react";
import { BigNumber, Event } from "ethers";
import { Bridge, BridgeFactory } from "@chainsafe/chainbridge-contracts";
import { BridgeConfig } from "../../../chainbridgeConfig";
import { TransactionStatus } from "../../NetworkManagerContext";
import {
  AddMessageAction,
  ResetAction,
  TxIsDone
} from "../../../reducers/TransitMessageReducer";
import { BridgeData, BridgeEvents, Directions, Sygma } from "@chainsafe/chainbridge-sdk-core";
import { Listener } from '@ethersproject/providers';
const handleProposalEvent = (
  setTransactionStatus: (message: TransactionStatus | undefined) => void,
  setTransferTxHash: (input: string) => void,
  tokensDispatch:  Dispatch<AddMessageAction | ResetAction | TxIsDone>,
  // chainbridgeData: { chain1: BridgeEvents, chain2: BridgeEvents },
  computedDirections: { from: Directions, to: Directions },
  chainbridgeInstance: Sygma,
  setDepositVotes: any,
  depositVotes: any,
  transferTxHash: string,
): Bridge => {

  const { from, to } = computedDirections

  // const events = chainbridgeData![from as keyof BridgeData]

  // events?.proposalEvents![to as keyof BridgeData](
    const listersCount = chainbridgeInstance.proposalExecutionEventListenerCount(to)
    console.log("🚀 ~ file: handleProposalEvent.ts ~ line 31 ~ listersCount", listersCount)
    if (listersCount === 0) {
    chainbridgeInstance.createProposalExecutionEventListener(to)(
      async(
        originDomainId: any,
        despositNonce: any,
        dataHash: any,
        tx: any
      ) => {
        if (transferTxHash !== tx.transactionHash) {
        const txReceipt = await tx.getTransactionReceipt();
        console.log("🚀 ~ file: handleProposalEvent.ts ~ line 34 ~ txReceipt", txReceipt)
        setDepositVotes(depositVotes + 1);
        // tokensDispatch({
        //   type: "addMessage",
        //   payload: {
        //     address: String(txReceipt.from),
        //     message: `Proposal executed on ${chainbridgeInstance.bridgeSetup[to].name}`,
        //     proposalStatus: 2,
        //     order: 1,
        //     eventType: "Proposal",
        //   },
        // });
        tokensDispatch({
          type: "setTransactionIsDone",
        });
        // setTimeout(() => {
          setTransactionStatus("Transfer Completed")
          setTransferTxHash(tx.transactionHash);

          // chainbridgeInstance.removeProposalExecutionEventListener(to)
        // }, 3000)
        }
      }
        // const proposalStatus = BigNumber.from(status).toNumber();
        // switch (proposalStatus) {
        //   case 1:
        //     tokensDispatch({
        //       type: "addMessage",
        //       payload: {
        //         address: String(txReceipt.from),
        //         message: `Proposal created on ${destinationChainConfig.name}`,
        //         proposalStatus: proposalStatus,
        //         order: proposalStatus,
        //         eventType: "Proposal",
        //       },
        //     });
        //     break;
        //   case 2:
        //     tokensDispatch({
        //       type: "addMessage",
        //       payload: {
        //         address: String(txReceipt.from),
        //         message: `Proposal has passed. Executing...`,
        //         proposalStatus: proposalStatus,
        //         order: proposalStatus,
        //         eventType: "Proposal",
        //       },
        //     });
        //     break;
        //   case 3:
        //     setTransactionStatus("Transfer Completed");
        //     setTransferTxHash(tx.transactionHash);
        //     break;
        //   case 4:
        //     setTransactionStatus("Transfer Aborted");
        //     setTransferTxHash(tx.transactionHash);
        //     break;
        // }

    )
  }
  // )
};
export default handleProposalEvent;
