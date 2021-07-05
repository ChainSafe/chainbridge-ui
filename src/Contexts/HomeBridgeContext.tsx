import React, { useContext } from 'react';
import { HomeChainAdaptorContext } from './Adaptors/interfaces';

const HomeBridgeContext = React.createContext<
  HomeChainAdaptorContext | undefined
>(undefined);

const useHomeBridge = (): HomeChainAdaptorContext => {
  const context = useContext(HomeBridgeContext);
  if (context === undefined) {
    throw new Error('useHomeBridge must be called within a HomeBridgeProvider');
  }
  return context;
};

export { HomeBridgeContext, useHomeBridge };
