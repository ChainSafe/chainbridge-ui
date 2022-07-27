import React, { useCallback } from "react";
import { Bridge, BridgeFactory } from "@chainsafe/chainbridge-contracts";
import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import {
  EvmBridgeConfig,
  getСhainTransferFallbackConfig,
} from "../../../chainbridgeConfig";
import { useNetworkManager } from "../../NetworkManagerContext";
import { IDestinationBridgeProviderProps } from "../interfaces";
import { DestinationBridgeContext } from "../../DestinationBridgeContext";
import {
  getProvider,
  getErc20ProposalHash,
  VoteStatus,
  getTransferTxHashByNonce,
} from "./helpers";
import { Fallback } from "../../../Utils/Fallback";

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
    analytics,
    transferTxHash,
    destinationBridge,
    setDestinationBridge,
  } = useNetworkManager();
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
  }, [destinationChainConfig]);

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
          // Catch an error here because on disconnect it breaks the application
          let txReceipt;
          try {
            txReceipt = await tx.getTransactionReceipt();
          } catch (err) {
            console.error(err);
          }
          if (!txReceipt) return;
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
              if (transactionStatus === "Transfer Completed") return;
              setTransactionStatus("Transfer Completed");
              setTransferTxHash(tx.transactionHash);
              fallback?.stop();
              analytics.trackTransferCompletedEvent({
                address: address as string,
                recipient: depositRecipient as string,
                nonce: parseInt(depositNonce),
                amount: depositAmount as number,
              });
              break;
            case 4:
              setTransactionStatus("Transfer Aborted");
              setTransferTxHash(tx.transactionHash);
              fallback?.stop();
              analytics.trackTransferAbortedEvent({
                address: address as string,
                recipient: depositRecipient as string,
                nonce: parseInt(depositNonce),
                amount: depositAmount as number,
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
          // Catch an error here because on disconnect it breaks the application
          let txReceipt;
          try {
            txReceipt = await tx.getTransactionReceipt();
          } catch (err) {
            console.error(err);
          }
          if (!txReceipt) return;
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
          analytics.trackTransferCompletedFromFallbackEvent({
            address: address as string,
            recipient: depositRecipient as string,
            nonce: parseInt(depositNonce as string),
            amount: depositAmount as number,
          });
          return false;
        case VoteStatus.CANCELLED:
          console.log("Transfer aborted in fallback mechanism");
          setTransactionStatus("Transfer Aborted");
          fallback.stop();
          analytics.trackTransferAbortedFromFallbackEvent({
            address: address as string,
            recipient: depositRecipient as string,
            nonce: parseInt(depositNonce as string),
            amount: depositAmount as number,
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
    if (transactionStatus === "Transfer Completed") {
      if (!destinationBridge || transferTxHash) return;
      const startTime = performance.now();
      getTransferTxHashByNonce(
        destinationChainConfig as EvmBridgeConfig,
        parseInt(depositNonce as string)
      ).then((txHash: string) => {
        if (txHash) {
          setTransferTxHash(txHash);
          const timeMs = performance.now() - startTime;
          analytics.trackGotTransferTxHash({
            address: address as string,
            recipient: depositRecipient as string,
            nonce: parseInt(depositNonce as string),
            amount: depositAmount as number,
            timeMs,
          });
          console.log(`Get trasfer tx hash time: ${timeMs} ms`);
        } else {
          analytics.trackTransferUndefinedTxHash({
            address: address as string,
            recipient: depositRecipient as string,
            nonce: parseInt(depositNonce as string),
            amount: depositAmount as number,
          });
        }
      });
    }
  }, [destinationBridge, transactionStatus, depositRecipient, transferTxHash]);

  useEffect(() => {
    const canInitFallback =
      process.env.REACT_APP_TRANSFER_FALLBACK_ENABLED === "true" &&
      transactionStatus === "Transfer to Destination" &&
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
