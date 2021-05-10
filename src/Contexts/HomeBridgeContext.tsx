import React, { useContext } from "react";
import { HomeChainAdaptorContext } from "./Adaptors/interfaces";

const HomeBridgeContext = React.createContext<
  HomeChainAdaptorContext | undefined
>(undefined);

const useHomeBridge = () => {
  const context = useContext(HomeBridgeContext);
  if (context === undefined) {
    throw new Error(
      "useHomeNetwork must be called within a HomeNetworkProvider"
    );
  }
  return context;
};

export { HomeBridgeContext, useHomeBridge };
