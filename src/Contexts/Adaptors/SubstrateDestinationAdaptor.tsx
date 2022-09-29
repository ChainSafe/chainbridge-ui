import React, { useCallback, useEffect, useState } from "react";
import { DestinationBridgeContext } from "../DestinationBridgeContext";
import { useNetworkManager } from "../NetworkManagerContext";
import {
  createApi,
  getBridgeProposalVotes,
  VoteStatus,
  getTransferTxHashByNonce,
} from "./SubstrateApis/ChainBridgeAPI";
import { IDestinationBridgeProviderProps } from "./interfaces";

import { ApiPromise } from "@polkadot/api";
import {
  SubstrateBridgeConfig,
  getСhainTransferFallbackConfig,
} from "../../chainbridgeConfig";
import { Fallback } from "../../Utils/Fallback";

export const SubstrateDestinationAdaptorProvider = ({
  children,
}: IDestinationBridgeProviderProps) => {
  const {
    depositNonce,
    homeChainConfig,
    destinationChainConfig,
    setDepositVotes,
    depositVotes,
    tokensDispatch,
    transactionStatus,
    setTransactionStatus,
    depositAmount,
    depositRecipient,
    setFallback,
    fallback,
    address,
    analytics,
    transferTxHash,
    setTransferTxHash,
    api,
    setApi,
    listenerActive,
    setListenerActive,
  } = useNetworkManager();

  const [initialising, setInitialising] = useState(false);
  useEffect(() => {
    // Once the chain ID has been set in the network context, the destination configuration will be automatically
    // set thus triggering this
    if (!destinationChainConfig || initialising || api) return;
    setInitialising(true);
    createApi(
      destinationChainConfig.rpcUrl,
      destinationChainConfig.rpcFallbackUrls
    )
      .then(async (api) => {
        await api.isReady;
        setApi(api);
        setInitialising(false);
      })
      .catch(console.error);
  }, [destinationChainConfig, initialising]);

  useEffect(() => {
    if (api && !listenerActive && depositNonce) {
      // Wire up event listeners
      // Subscribe to system events via storage
      // Use here scoped counter because "depositVotes" state var doesn't recalculate inside "system.events" scope
      let depositVotesCounter = 0;
      const unsubscribe = api.query.system.events((events) => {
        console.log("----- Received " + events.length + " event(s): -----");
        // loop through the Vec<EventRecord>
        events.forEach((record) => {
          // extract the phase, event and the event types
          const { event, phase } = record;
          const types = event.typeDef;
          // show what we are busy with
          console.log(
            event.section +
              ":" +
              event.method +
              "::" +
              "phase=" +
              phase.toString()
          );
          console.log(event.meta.documentation.toString());
          // loop through each of the parameters, displaying the type and data
          event.data.forEach((data, index) => {
            console.log(types[index].type + ";" + data.toString());
          });

          if (
            event.section ===
              (destinationChainConfig as SubstrateBridgeConfig)
                .chainbridgePalletName &&
            event.method === "VoteFor"
          ) {
            ++depositVotesCounter;
            setDepositVotes(depositVotesCounter);
            tokensDispatch({
              type: "addMessage",
              payload: {
                address: "Substrate Relayer",
                signed: "Confirmed",
                order: parseFloat(`1.${depositVotesCounter + 1}`),
              },
            });
          }

          if (
            event.section ===
              (destinationChainConfig as SubstrateBridgeConfig)
                .chainbridgePalletName &&
            event.method === "ProposalApproved"
          ) {
            ++depositVotesCounter;
            setDepositVotes(depositVotesCounter);
            setTransactionStatus("Transfer Completed");
            analytics.trackTransferCompletedEvent({
              address: address as string,
              recipient: depositRecipient as string,
              nonce: parseInt(depositNonce),
              amount: depositAmount as number,
            });
          }
        });
      });
      setListenerActive(true);
    } else if (listenerActive && !depositNonce) {
      setListenerActive(false);
    }
  }, [
    api,
    depositNonce,
    depositVotes,
    destinationChainConfig,
    setDepositVotes,
    setTransactionStatus,
    tokensDispatch,
    address,
    fallback,
    listenerActive,
    analytics,
    depositAmount,
    depositRecipient,
    setListenerActive
  ]);

  const initFallbackMechanism = useCallback(async (): Promise<void> => {
    if (!api) return;
    const srcChainId = homeChainConfig?.chainId as number;
    const destinationChainId = destinationChainConfig?.chainId as number;
    const {
      delayMs,
      pollingMinIntervalMs,
      pollingMaxIntervalMs,
      blockTimeMs,
    } = getСhainTransferFallbackConfig(srcChainId, destinationChainId);
    const pollingIntervalMs = Math.min(
      Math.max(pollingMinIntervalMs, 3 * blockTimeMs),
      pollingMaxIntervalMs
    );
    const flb = new Fallback(delayMs, pollingIntervalMs, async () => {
      const res = await getBridgeProposalVotes(
        api as ApiPromise,
        srcChainId,
        destinationChainId,
        depositRecipient as string,
        parseInt(depositNonce as string),
        depositAmount as number
      );
      console.log("Proposal votes status", res?.status);
      switch (res?.status) {
        case VoteStatus.APPROVED:
          console.log("Transfer completed in fallback mechanism");
          setTransactionStatus("Transfer Completed");
          flb.stop();
          analytics.trackTransferCompletedFromFallbackEvent({
            address: address as string,
            recipient: depositRecipient as string,
            nonce: parseInt(depositNonce as string),
            amount: depositAmount as number,
          });
          return false;
        case VoteStatus.REJECTED:
          console.log("Transfer aborted in fallback mechanism");
          setTransactionStatus("Transfer Aborted");
          flb.stop();
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
    flb.start();
    setFallback(flb);
  }, [
    api,
    homeChainConfig,
    destinationChainConfig,
    depositRecipient,
    depositNonce,
    depositAmount,
    address,
    analytics,
    setTransactionStatus,
    setFallback,
  ]);

  useEffect(() => {
    if (transactionStatus === "Transfer Completed") {
      if (!api || transferTxHash) return;
      const startTime = performance.now();
      getTransferTxHashByNonce(api, parseInt(depositNonce as string)).then(
        (txHash: string | undefined) => {
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
            console.log(`Get transfer tx hash time: ${timeMs} ms`);
          } else {
            analytics.trackTransferUndefinedTxHash({
              address: address as string,
              recipient: depositRecipient as string,
              nonce: parseInt(depositNonce as string),
              amount: depositAmount as number,
            });
          }
        }
      );
    }
  }, [api, transactionStatus]);

  useEffect(() => {
    const canInitFallback =
      process.env.REACT_APP_TRANSFER_FALLBACK_ENABLED === "true" &&
      transactionStatus === "Transfer to Destination" && !fallback;
    if (canInitFallback) initFallbackMechanism();
    if (
      transactionStatus === "Transfer Completed" ||
      transactionStatus === "Transfer Aborted"
    ) {
      fallback?.stop();
    }
  }, [transactionStatus, fallback, initFallbackMechanism]);

  return (
    <DestinationBridgeContext.Provider
      value={{
        disconnect: async () => {
          if (api?.isConnected) await api?.disconnect();
          setApi(undefined);
        },
      }}
    >
      {children}
    </DestinationBridgeContext.Provider>
  );
};
