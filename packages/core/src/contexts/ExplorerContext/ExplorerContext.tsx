import React, { useContext, useEffect, useState, useReducer } from "react";
import {
  ExplorerState,
  PaginationParams,
  transfersReducer,
  ExplorerPageState,
  Action,
} from "../../reducers/TransfersReducer";
import { useHomeBridge } from "../HomeBridgeContext";

import { fetchTransfers } from "../../services/ExplorerService";

const DEFAULT_PAGINATION_OPTIONS = { first: "10" };

interface IExplorerContextProps {
  children: React.ReactNode | React.ReactNode[];
}

type ExplorerContext = {
  explorerState: ExplorerState;
  loadMore: (options: PaginationParams) => void;
  setExplorerStateContext: any;
  explorerPageState: ExplorerPageState;
  explorerPageDispatcher: React.Dispatch<Action>;
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

  const { address } = useHomeBridge();

  const initState: ExplorerPageState = {
    // fromDomainId: 0,
    // toDomainId: 0,
    fromAddress: address,
    toAddress: address,
    transferDetails: {
      id: "",
      formatedTransferDate: "",
      fromAddress: "",
      proposalStatus: 0,
      formatedAmount: "",
      fromNetworkName: "",
      toNetworkName: "",
      depositTransactionHash: "",
      fromDomainId: 0,
      toDomainId: 0,
      voteEvents: [],
      proposalEvents: [],
      timelineMessages: [],
      fromChain: undefined,
      toChain: undefined,
      pillColorStatus: { borderColor: "", background: "" },
    },
    timelineButtonClicked: false,
    chains,
  };

  const [explorerPageState, explorerPageDispatcher] = useReducer(
    transfersReducer,
    initState
  );

  const {
    fromDomainId,
    toDomainId,
    depositTransactionHash,
    fromAddress,
    toAddress,
  } = explorerPageState;
  const filters = {
    fromDomainId,
    toDomainId,
    depositTransactionHash,
    fromAddress,
    toAddress,
  };

  const [state, setState] = useState<ExplorerState>({
    isLoading: false,
    transfers: [],
    error: false,
    chains,
  });

  useEffect(() => {
    fetchTransfers(setState, state, DEFAULT_PAGINATION_OPTIONS, filters);
  }, [
    fromDomainId,
    toDomainId,
    depositTransactionHash,
    fromAddress,
    toAddress,
  ]);

  const loadMore = (options: PaginationParams) =>
    fetchTransfers(setState, state, options, filters);

  return (
    <ExplorerContext.Provider
      value={{
        explorerState: state,
        loadMore,
        setExplorerStateContext: setState,
        explorerPageState,
        explorerPageDispatcher,
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
