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
import { getProvider, getErc20ProposalHash, VoteStatus } from "./helpers";
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
              break;
            case 4:
              setTransactionStatus("Transfer Aborted");
              setTransferTxHash(tx.transactionHash);
              fallback?.stop();
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
  ]);

  const initFallbackMechanism = useCallback(async (): Promise<void> => {
    const srcChainId = homeChainConfig?.chainId as number;
    const destinationChainId = destinationChainConfig?.chainId as number;
    const { delayMs, pollingIntervalMs } = getСhainTransferFallbackConfig(
      srcChainId,
      destinationChainId
    );
    const erc20ProposalHash = getErc20ProposalHash(
      (destinationChainConfig as EvmBridgeConfig).erc20HandlerAddress,
      depositAmount as number,
      depositRecipient as string
    );

    const fallback = new Fallback(delayMs, pollingIntervalMs, async () => {
      const res = await destinationBridge?.getProposal(
        srcChainId,
        parseInt(depositNonce as string),
        erc20ProposalHash
      );
      const status = res ? res[4] : undefined;
      console.log("Proposal votes status", status);
      switch (status) {
        case VoteStatus.EXECUTED:
          console.log("Transfer completed in fallback mechanism");
          setTransactionStatus("Transfer Completed");
          fallback.stop();
          return false;
        case VoteStatus.CANCELLED:
          console.log("Transfer aborted in fallback mechanism");
          setTransactionStatus("Transfer Aborted");
          fallback.stop();
          return false;
        default:
          return true;
      }
    });
    fallback.init();
    setFallback(fallback);
  }, [
    homeChainConfig,
    destinationChainConfig,
    depositRecipient,
    depositNonce,
    depositAmount,
    destinationBridge,
  ]);

  useEffect(() => {
    console.log({ transactionStatus }); // ToDo: check why get transaction status update several times on the same status
    if (
      transactionStatus === "In Transit" &&
      destinationBridge &&
      !fallback?.initialized()
    )
      initFallbackMechanism();
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
