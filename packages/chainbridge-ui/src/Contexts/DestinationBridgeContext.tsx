import React, { useContext } from "react";
import { DestinationChainContext } from "./Adaptors/interfaces";

const DestinationBridgeContext = React.createContext<
  DestinationChainContext | undefined
>(undefined);

const useDestinationBridge = () => {
  const context = useContext(DestinationBridgeContext);
  if (context === undefined) {
    throw new Error("useHomeBridge must be called within a HomeBridgeProvider");
  }
  return context;
};

export { DestinationBridgeContext, useDestinationBridge };
