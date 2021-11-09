import React from "react";
import { Bridge, BridgeFactory } from "@chainsafe/chainbridge-contracts";
import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import { EvmBridgeConfig } from "../../../chainbridgeConfig";
import { useNetworkManager } from "../../NetworkManagerContext";
import { IDestinationBridgeProviderProps } from "../interfaces";
import { DestinationBridgeContext } from "../../DestinationBridgeContext";

import { getProvider } from "./helpers";

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

  const [destinationBridge, setDestinationBridge] = useState<
    Bridge | undefined
  >(undefined);

  useEffect(() => {
    if (destinationBridge) return;
    const provider = getProvider(destinationChainConfig);

    if (destinationChainConfig && provider) {
      const bridge = BridgeFactory.connect(
        (destinationChainConfig as EvmBridgeConfig).bridgeAddress,
        provider
      );
      setDestinationBridge(bridge);
    }
  }, [destinationChainConfig, destinationBridge]);

  useEffect(() => {
    if (
      destinationChainConfig &&
      homeChainConfig?.domainId !== null &&
      homeChainConfig?.domainId !== undefined &&
      destinationBridge &&
      depositNonce &&
      !inTransitMessages.txIsDone
    ) {
      destinationBridge.on(
        destinationBridge.filters.ProposalEvent(null, null, null, null),
        async (originDomainId, depositNonce, status, dataHash, tx) => {
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

      destinationBridge.on(
        destinationBridge.filters.ProposalVote(null, null, null, null),
        async (originDomainId, depositNonce, status, dataHash, tx) => {
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
