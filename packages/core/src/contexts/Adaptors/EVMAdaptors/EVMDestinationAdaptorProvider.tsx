import React, { useEffect, useReducer } from "react";
import { useWeb3 } from "../../index";
import { IDestinationBridgeProviderProps } from "../interfaces";
import { DestinationBridgeContext } from "../../DestinationBridgeContext";
import { transitMessageReducer } from "../../../reducers/TransitMessageReducer";
import { evmDestinationReducer } from "../../../reducers/EvmDestinationReducer";

import { useDestinationBridgeHook } from "./useDestinationBridgeHook";
import handleProposalEvent from "./handleProposalEvent";
import { useBridge } from "../../Bridge";
import { computeDirections } from "../../../utils/Helpers";

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

  const { bridgeSetup, chainbridgeInstance } = useBridge();

  const computedDirections = computeDirections(
    bridgeSetup!,
    destinationChainConfig!,
    homeChainConfig!
  );

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
    if (depositNonce && !inTransitMessages.txIsDone) {
      handleProposalEvent(
        setTransactionStatus,
        setTransferTxHash,
        tokensDispatch,
        computedDirections!,
        chainbridgeInstance!,
        setDepositVotes,
        depositVotes,
        transferTxHash,
        Number(depositNonce)
      );
    }
    return () => {
      //@ts-ignore
      destinationBridge?.removeAllListeners();
    };
  }, [transferTxHash, depositNonce, depositVotes]);

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
