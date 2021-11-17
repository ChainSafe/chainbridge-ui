import React from "react";
import { useEffect } from "react";
import { useNetworkManager } from "../../NetworkManagerContext/NetworkManagerContext";
import { IDestinationBridgeProviderProps } from "../interfaces";
import { DestinationBridgeContext } from "../../DestinationBridgeContext";

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
    tokensDispatch,
    setTransactionStatus,
    setTransferTxHash,
    setDepositVotes,
    depositVotes,
    inTransitMessages,
    transactionStatus,
  } = useNetworkManager();

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
        disconnect: async () => {},
      }}
    >
      {children}
    </DestinationBridgeContext.Provider>
  );
};
