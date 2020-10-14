import React, { useContext } from "react";

interface IChainbridgeContextProps {
  children: React.ReactNode | React.ReactNode[];
}

type ChainbridgeContext = {};

const ChainbridgeContext = React.createContext<ChainbridgeContext | undefined>(
  undefined
);

const ChainbridgeProvider = ({ children }: IChainbridgeContextProps) => {
  return (
    <ChainbridgeContext.Provider value={{}}>
      {children}
    </ChainbridgeContext.Provider>
  );
};

const useChainbridge = () => {
  const context = useContext(ChainbridgeContext);
  if (context === undefined) {
    throw new Error("useChainbridge must be called within a DriveProvider");
  }
};

export { ChainbridgeProvider, useChainbridge };
