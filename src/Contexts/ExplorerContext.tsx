import React, { useContext, useEffect, useReducer } from "react";
import { BridgeFactory } from "@chainsafe/chainbridge-contracts";
import { providers } from "ethers";
import { chainbridgeConfig } from "../chainbridgeConfig";
import { transferReducer } from "./Reducers/TransferReducer";

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
        console.log(depositLogs);
        depositLogs.forEach(async (dl) => {
          const parsedLog = bridgeContract.interface.parseLog(dl);
          console.log(parsedLog);
          transfersDispatch({
            type: "addTransfer",
            payload: {
              depositNonce: parsedLog.args.depositNonce.toNumber(),
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
          });
        });
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
