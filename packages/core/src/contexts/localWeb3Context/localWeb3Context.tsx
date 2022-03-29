import React, { useState, useEffect, useReducer } from "react";
import ethers, { utils } from "ethers";
import {
  getTokenData,
  getTokenDataDirect,
  resetOnboard,
  refreshGasPrice,
  signMessage,
  checkIsReady,
  getNetworkInfo
} from "../../utils/localNetworksHelpers";
import { Erc20Detailed } from "../../Contracts/Erc20Detailed";
import { localWeb3ContextReducer } from "../../reducers/web3Reducers";
import {
  LocalWeb3Context,
  LocalWeb3ContextProps,
  LocalWeb3State,
} from "./types";

const LocalProviderContext = React.createContext<LocalWeb3Context | undefined>(
  undefined
);

const LocalProvider = ({
  children,
  externalProvider,
  useExternalProvider,
  tokensToWatch,
  onboardConfig,
  cacheWalletSelection = true,
  networkIds,
  checkNetwork = (networkIds && networkIds.length > 0) || false,
  spenderAddress,
}: LocalWeb3ContextProps) => {
  // Injecting extrenal provider for widget
  useEffect(() => {
    if (useExternalProvider && externalProvider) {
      getNetworkInfo(externalProvider).then(({accountAddress, externalNetworkInfo}) => {
        dispatcher({
          type: "setAll",
          payload: {
            provider: externalProvider,
            accounts: [],
            isActive: true,
            chainId: externalNetworkInfo.chainId,
            address: accountAddress,
          },
        });
      })
    }
  }, [externalProvider])

  const [state, dispatcher] = useReducer(localWeb3ContextReducer, {
    savedWallet: "",
  } as any);

  const [balance, setBalance] = useState<number>()

    // get state from reducer
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

  useEffect(() => {
    const networkTokens =
    (tokensToWatch && network && tokensToWatch[network]) || [];
    let tokenContracts: Array<Erc20Detailed> = [];
    if (provider && address && networkTokens.length > 0) {

      provider.getBalance(address).then(value => {
        setBalance( Number(utils.formatEther(value)))
      })
      getTokenDataDirect(networkTokens, dispatcher, address, provider, spenderAddress);
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
  }, [provider, network, address, externalProvider]);

  return (
    <LocalProviderContext.Provider
      value={{
        address: address,
        ethBalance: balance,
        isReady: isReady,
        network: network,
        onboard: onboard,
        provider: provider,
        savedWallet: "",
        tokens: tokens,
        wallet: undefined,

        gasPrice: 0,
        isMobile: false,
        walletConnectReady: false,

        resetOnboard,
        refreshGasPrice,
        signMessage,
        checkIsReady,
        dispatcher,
      }}
    >
      {children}
    </LocalProviderContext.Provider>
  );
}

const useWeb3 = () => {
  const context = React.useContext(LocalProviderContext);
  if (context === undefined) {
    throw new Error("useOnboard must be used within a OnboardProvider");
  }
  return context;
};

export { LocalProvider, useWeb3 };
