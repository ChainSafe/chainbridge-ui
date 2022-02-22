import React, { useEffect, useReducer } from "react";
import {
  getTokenData,
  resetOnboard,
  refreshGasPrice,
  signMessage,
  checkIsReady,
} from "../../utils/localNetworksHelpers";
import { Erc20Detailed } from "../../Contracts/Erc20Detailed";
import { localWeb3ContextReducer } from "./localWeb3Reducer";
import {
  LocalWeb3Context,
  LocalWeb3ContextProps,
  LocalWeb3State,
} from "./types";
import { useOnboard } from "./customHook";

const LocalProviderContext = React.createContext<LocalWeb3Context | undefined>(
  undefined
);

const LocalProvider = ({
  children,
  tokensToWatch,
  onboardConfig,
  cacheWalletSelection = true,
  networkIds,
  checkNetwork = (networkIds && networkIds.length > 0) || false,
  spenderAddress,
}: LocalWeb3ContextProps) => {
  const [state, dispatcher] = useReducer(localWeb3ContextReducer, {} as any);

  useEffect(() => {
    const networkTokens =
      (tokensToWatch && state.network && tokensToWatch[network]) || [];

    let tokenContracts: Array<Erc20Detailed> = [];
    if (state.provider && state.address && networkTokens.length > 0) {
      getTokenData(networkTokens, dispatcher, state, spenderAddress);
    }
    return () => {
      if (tokenContracts.length > 0) {
        tokenContracts.forEach((tc) => {
          tc.removeAllListeners();
        });
        tokenContracts = [];
        dispatcher({ type: "resetTokens" });
      }
    };
  }, [state.network, state.provider, state.address]);

  const {
    address,
    provider,
    network,
    wallet,
    onboard,
    ethBalance,
    tokens,
    isReady,
    gasPrice,
    walletConnectReady,
    savedWallet
  }: LocalWeb3State = state;

  // CUSTOM HOOK FOR INITIALIZING ONBOARD
  useOnboard(
    networkIds,
    checkNetwork,
    dispatcher,
    onboardConfig,
    cacheWalletSelection,
    checkIsReady,
    onboard,
    state
  );

  let onboardState;
  if (onboard !== undefined && "getState" in onboard) {
    onboardState = onboard?.getState();
  }


  return (
    <LocalProviderContext.Provider
      value={{
        address,
        provider,
        network,
        wallet,
        onboard,
        ethBalance,
        tokens,
        resetOnboard,
        isReady,
        checkIsReady,
        gasPrice,
        isMobile: !!onboardState?.mobileDevice,
        signMessage,
        refreshGasPrice,
        dispatcher,
        walletConnectReady,
        savedWallet
      }}
    >
      {children}
    </LocalProviderContext.Provider>
  );
};

const useWeb3 = () => {
  const context = React.useContext(LocalProviderContext);
  if (context === undefined) {
    throw new Error("useOnboard must be used within a OnboardProvider");
  }
  return context;
};

export { LocalProvider, useWeb3 };
