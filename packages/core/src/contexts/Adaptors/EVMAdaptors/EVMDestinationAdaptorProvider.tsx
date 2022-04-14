import React, { useEffect, useReducer } from "react";
import { useWeb3 } from "../../index";
import { IDestinationBridgeProviderProps } from "../interfaces";
import { DestinationBridgeContext } from "../../DestinationBridgeContext";
import { transitMessageReducer } from "../../../reducers/TransitMessageReducer";
import { evmDestinationReducer } from "../../../reducers/EvmDestinationReducer";

import { useDestinationBridgeHook } from "./useDestinationBridgeHook";
import handleProposalEvent from "./handleProposalEvent";
import handleProposalVote from "./handleProposalVote";

export const EVMDestinationAdaptorProvider = ({
  children,
}: IDestinationBridgeProviderProps) => {
  const {
    depositNonce,
    destinationChainConfig,
    homeChainConfig,
    setTransactionStatus,
    transactionStatus,
  } = useWeb3();

  const [state, dispatch] = useReducer(evmDestinationReducer, {
    transferTxHash: "",
    depositVotes: 0,
  });
  const { transferTxHash, depositVotes } = state;
  const setTransferTxHash = (transferTxHash: string) =>
    dispatch({ type: "setTransferTxHash", transferTxHash });
  const setDepositVotes = (depositVotes: number) =>
    dispatch({ type: "setDepositVotes", depositVotes });

  const [inTransitMessages, tokensDispatch] = useReducer(
    transitMessageReducer,
    { txIsDone: false, transitMessage: [] }
  );

  const destinationBridge = useDestinationBridgeHook(destinationChainConfig);

  useEffect(() => {
    if (
      destinationChainConfig &&
      homeChainConfig?.domainId !== null &&
      homeChainConfig?.domainId !== undefined &&
      destinationBridge &&
      depositNonce &&
      !inTransitMessages.txIsDone
    ) {
      handleProposalEvent(
        destinationBridge,
        homeChainConfig,
        depositNonce,
        destinationChainConfig,
        setTransactionStatus,
        setTransferTxHash,
        tokensDispatch
      );

      handleProposalVote(
        destinationBridge,
        homeChainConfig,
        depositNonce,
        depositVotes,
        tokensDispatch,
        setDepositVotes,
        transactionStatus
      );
    }
    return () => {
      //@ts-ignore
      destinationBridge?.removeAllListeners();
    };
  }, [
    depositNonce,
    homeChainConfig,
    destinationBridge,
    depositVotes,
    destinationChainConfig,
    setDepositVotes,
    setTransactionStatus,
    setTransferTxHash,
    tokensDispatch,
  ]);

  return (
    <DestinationBridgeContext.Provider
      value={{
        transferTxHash,
        depositVotes,
        setDepositVotes,
        inTransitMessages,
        tokensDispatch,
        disconnect: async () => {},
      }}
    >
      {children}
    </DestinationBridgeContext.Provider>
  );
};
