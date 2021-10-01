import React, { useContext, useEffect, useReducer } from "react";
import {
  Action,
  ExplorerState,
  transfersReducer,
} from "./Reducers/TransfersReducer";
import { fetchTransfers } from "../Services/ExplorerService";

interface IExplorerContextProps {
  children: React.ReactNode | React.ReactNode[];
}

type ExplorerContext = {
  explorerState: ExplorerState;
  explorerDispatcher: React.Dispatch<Action>;
};

const ExplorerContext = React.createContext<ExplorerContext | undefined>(
  undefined
);

const ExplorerProvider = ({ children }: IExplorerContextProps) => {
  const {
    __RUNTIME_CONFIG__: {
      CHAINBRIDGE: { chains },
    },
  } = window;

  const initState: ExplorerState = {
    transfers: [],
    error: false,
    network: { name: "", chainId: 0 },
    chains,
    transferDetails: {
      id: "",
      formatedTransferDate: "",
      addressShortened: "",
      proposalStatus: 0,
      formatedAmount: "",
      fromNetworkName: "",
      toNetworkName: "",
      depositTxHashShortened: "",
      fromChainId: 0,
      toChainId: 0,
      voteEvents: [],
      proposalEvents: [],
      timelineMessages: [],
      fromIcon: undefined,
      toIcon: undefined,
    },
    timelineButtonClicked: false,
  };

  const [explorerState, explorerDispatcher] = useReducer(
    transfersReducer,
    initState
  );

  useEffect(() => {
    fetchTransfers(explorerDispatcher);
  }, []);

  return (
    <ExplorerContext.Provider
      value={{
        explorerState,
        explorerDispatcher,
      }}
    >
      {children}
    </ExplorerContext.Provider>
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
