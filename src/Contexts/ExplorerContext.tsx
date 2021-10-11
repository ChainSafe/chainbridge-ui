import React, { useContext, useEffect, useState } from "react";
import { ExplorerState } from "./Reducers/TransfersReducer";
import { fetchTransfers } from "../Services/ExplorerService";

interface IExplorerContextProps {
  children: React.ReactNode | React.ReactNode[];
}

type ExplorerContext = {
  explorerState: ExplorerState;
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

  const [state, setState] = useState<ExplorerState>({
    transfers: [],
    error: false,
    chains,
  });

  useEffect(() => {
    fetchTransfers(setState, state);
  }, []);

  return (
    <ExplorerContext.Provider
      value={{
        explorerState: state,
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
