import React, { useCallback } from "react";
import { Bridge, BridgeFactory } from "@chainsafe/chainbridge-contracts";
import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import {
  EvmBridgeConfig,
  getСhainTransferFallbackConfig,
  chainbridgeConfig,
} from "../../../chainbridgeConfig";
import { useNetworkManager } from "../../NetworkManagerContext";
import { IDestinationBridgeProviderProps } from "../interfaces";
import { DestinationBridgeContext } from "../../DestinationBridgeContext";
import { getProvider, getErc20ProposalHash, VoteStatus } from "./helpers";
import { Fallback } from "../../../Utils/Fallback";
import { GA } from "../../../Utils/GA";
const ga = new GA({
  trackingId: chainbridgeConfig.ga.trackingId,
  appName: chainbridgeConfig.ga.appName,
  env: process.env.NODE_ENV,
});

export const EVMDestinationAdaptorProvider = ({
  children,
}: IDestinationBridgeProviderProps) => {
  const {
    depositNonce,
    destinationChainConfig,
    homeChainConfig,
    tokensDispatch,
    transactionStatus,
    setTransactionStatus,
    setTransferTxHash,
    setDepositVotes,
    depositVotes,
    depositRecipient,
    depositAmount,
    fallback,
    setFallback,
    address,
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
  }, [destinationChainConfig, destinationBridge, transactionStatus]);

  useEffect(() => {
    if (
      destinationChainConfig &&
      homeChainConfig?.chainId !== null &&
      homeChainConfig?.chainId !== undefined &&
      destinationBridge &&
      depositNonce
    ) {
      destinationBridge.on(
        destinationBridge.filters.ProposalEvent(
          homeChainConfig.chainId,
          BigNumber.from(depositNonce),
          null,
          null,
          null
        ),
        async (
          originChainId,
          depositNonce,
          status,
          resourceId,
          dataHash,
          tx
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
              fallback?.stop();
              ga.event("transfer_completed", {
                address,
                recipient: depositRecipient,
                nonce: parseInt(depositNonce),
                amount: depositAmount,
              });
              break;
            case 4:
              setTransactionStatus("Transfer Aborted");
              setTransferTxHash(tx.transactionHash);
              fallback?.stop();
              ga.event("transfer_aborted", {
                address,
                recipient: depositRecipient,
                nonce: parseInt(depositNonce),
                amount: depositAmount,
              });
              break;
          }
        }
      );

      destinationBridge.on(
        destinationBridge.filters.ProposalVote(
          homeChainConfig.chainId,
          BigNumber.from(depositNonce),
          null,
          null
        ),
        async (originChainId, depositNonce, status, resourceId, tx) => {
          const txReceipt = await tx.getTransactionReceipt();
          if (txReceipt.status === 1) {
            setDepositVotes(depositVotes + 1);
          }
          tokensDispatch({
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
    fallback,
  ]);

  const initFallbackMechanism = useCallback(async (): Promise<void> => {
    const srcChainId = homeChainConfig?.chainId as number;
    const destinationChainId = destinationChainConfig?.chainId as number;
    const {
      delayMs,
      pollingMinIntervalMs,
      pollingMaxIntervalMs,
      blockTimeMs,
    } = getСhainTransferFallbackConfig(srcChainId, destinationChainId);
    const erc20ProposalHash = getErc20ProposalHash(
      (destinationChainConfig as EvmBridgeConfig).erc20HandlerAddress,
      depositAmount as number,
      depositRecipient as string
    );

    const pollingIntervalMs = Math.min(
      Math.max(pollingMinIntervalMs, 3 * blockTimeMs),
      pollingMaxIntervalMs
    );
    const fallback = new Fallback(delayMs, pollingIntervalMs, async () => {
      let res;
      try {
        res = await destinationBridge?.getProposal(
          srcChainId,
          parseInt(depositNonce as string),
          erc20ProposalHash
        );
      } catch (error) {
        console.error(error);
      }

      const status = res ? res[4] : undefined;
      console.log("Proposal votes status", status);
      switch (status) {
        case VoteStatus.EXECUTED:
          console.log("Transfer completed in fallback mechanism");
          setTransactionStatus("Transfer Completed");
          fallback.stop();
          ga.event("fallback_transfer_completed", {
            address: address,
            recipient: depositRecipient,
            nonce: parseInt(depositNonce as string),
            amount: depositAmount,
          });
          return false;
        case VoteStatus.CANCELLED:
          console.log("Transfer aborted in fallback mechanism");
          setTransactionStatus("Transfer Aborted");
          fallback.stop();
          ga.event("fallback_transfer_aborted", {
            address: address,
            recipient: depositRecipient,
            nonce: parseInt(depositNonce as string),
            amount: depositAmount,
          });
          return false;
        default:
          return true;
      }
    });
    fallback.start();
    setFallback(fallback);
  }, [
    homeChainConfig,
    destinationChainConfig,
    depositRecipient,
    depositNonce,
    depositAmount,
    destinationBridge,
    fallback,
  ]);

  useEffect(() => {
    const canInitFallback =
      process.env.REACT_APP_TRANSFER_FALLBACK_ENABLED === "true" &&
      transactionStatus === "In Transit" &&
      destinationBridge &&
      !fallback?.started();
    if (canInitFallback) initFallbackMechanism();
  }, [transactionStatus, destinationBridge, fallback]);

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
