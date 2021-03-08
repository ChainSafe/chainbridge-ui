import React, { useContext, useEffect, useReducer } from "react";
import { BridgeFactory } from "@chainsafe/chainbridge-contracts";
import { providers } from "ethers";
import { chainbridgeConfig } from "../chainbridgeConfig";
import { ProposalStatus, transferReducer } from "./Reducers/TransferReducer";

interface IExplorerContextProps {
  children: React.ReactNode | React.ReactNode[];
}

type ExplorerContext = {};

const ExplorerContext = React.createContext<ExplorerContext | undefined>(
  undefined
);

const ExplorerProvider = ({ children }: IExplorerContextProps) => {
  const [transfers, transfersDispatch] = useReducer(transferReducer, {});

  useEffect(() => {
    const handler = () => {
      chainbridgeConfig.chains.forEach(async (bridge) => {
        const provider = new providers.JsonRpcProvider(
          bridge.rpcUrl,
          bridge.networkId
        );
        const bridgeContract = BridgeFactory.connect(
          bridge.bridgeAddress,
          provider
        );
        const depositFilter = bridgeContract.filters.Deposit(null, null, null);
        const depositLogs = await provider.getLogs(depositFilter);
        depositLogs.forEach(async (dl) => {
          const parsedLog = bridgeContract.interface.parseLog(dl);
          transfersDispatch({
            type: "addTransfer",
            payload: {
              depositNonce: parsedLog.args.depositNonce.toNumber(),
              transferDetails: {
                depositBlockNumber: dl.blockNumber,
                depositTransactionHash: dl.transactionHash,
                fromChainId: bridge.chainId,
                fromNetworkName: bridge.name,
                timestamp: (await provider.getBlock(dl.blockNumber)).timestamp,
                toChainId: parsedLog.args.destinationChainID,
                toNetworkName:
                  chainbridgeConfig.chains.find(
                    (c) => c.chainId === parsedLog.args.destinationChainID
                  )?.name || "",
                resourceId: parsedLog.args.resourceID,
              },
            },
          });
        });
        console.log(`Added ${depositLogs.length} deposits`);

        const proposalEventFilter = bridgeContract.filters.ProposalEvent(
          null,
          null,
          null,
          null,
          null
        );

        const proposalEventLogs = await provider.getLogs(proposalEventFilter);
        proposalEventLogs.forEach(async (pel) => {
          const parsedLog = bridgeContract.interface.parseLog(pel);
          transfersDispatch({
            type: "addProposalEvent",
            payload: {
              depositNonce: parsedLog.args.depositNonce.toNumber(),
              transferDetails: {
                resourceId: parsedLog.args.resourceID,
                fromChainId: parsedLog.args.originChainID,
                fromNetworkName:
                  chainbridgeConfig.chains.find(
                    (c) => c.chainId === parsedLog.args.originChainID
                  )?.name || "",
                toChainId: bridge.chainId,
                toNetworkName: bridge.name,
              },
              proposalEventDetails: {
                proposalEventBlockNumber: pel.blockNumber,
                proposalEventTransactionHash: pel.transactionHash,
                dataHash: parsedLog.args.dataHash,
                timestamp: (await provider.getBlock(pel.blockNumber)).timestamp,
                proposalStatus: parsedLog.args.status,
              },
            },
          });
        });
        console.log(`Added ${proposalEventLogs.length} proposal events`);

        const proposalVoteFilter = bridgeContract.filters.ProposalVote(
          null,
          null,
          null,
          null
        );

        const proposalVoteLogs = await provider.getLogs(proposalVoteFilter);
        proposalVoteLogs.forEach(async (pvl) => {
          const parsedLog = bridgeContract.interface.parseLog(pvl);

          transfersDispatch({
            type: "addVote",
            payload: {
              depositNonce: parsedLog.args.depositNonce.toNumber(),
              transferDetails: {
                resourceId: parsedLog.args.resourceID,
                fromChainId: parsedLog.args.originChainID,
                fromNetworkName:
                  chainbridgeConfig.chains.find(
                    (c) => c.chainId === parsedLog.args.originChainID
                  )?.name || "",
                toChainId: bridge.chainId,
                toNetworkName: bridge.name,
              },
              voteDetails: {
                voteBlockNumber: pvl.blockNumber,
                voteTransactionHash: pvl.transactionHash,
                dataHash: parsedLog.args.dataHash,
                timestamp: (await provider.getBlock(pvl.blockNumber)).timestamp,
                voteStatus: parsedLog.args.status,
              },
            },
          });
        });
        console.log(`Added ${proposalVoteLogs.length} proposal votes`);
      });
    };

    handler();

    return () => {
      //Remove all listeners
    };
  }, []);

  return (
    <ExplorerContext.Provider value={{}}>{children}</ExplorerContext.Provider>
  );
};

const useExplorer = () => {
  const context = useContext(ExplorerContext);
  if (context === undefined) {
    throw new Error("useExplorer must be called within a ExplorerProvider");
  }
  return context;
};

export { ExplorerProvider, useExplorer };
