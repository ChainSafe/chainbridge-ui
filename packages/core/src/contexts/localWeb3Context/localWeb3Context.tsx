import React, { useEffect, useReducer, useState } from "react";
import {ethers} from "ethers";
import {
  getTokenData,
  getTokenDataDirect,
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

const createLocalProvider = ({
  children,
  externalProvider,
  tokensToWatch,
  onboardConfig,
  cacheWalletSelection = true,
  networkIds,
  checkNetwork = (networkIds && networkIds.length > 0) || false,
  spenderAddress,
}: LocalWeb3ContextProps) => {
  const [state, dispatcher] = useReducer(localWeb3ContextReducer, {
    savedWallet: ""
  } as any);

  const [eNetwork, setENetwork] = useState<ethers.providers.Network>()
  const [externalAddress, setExternalAddress] = useState<string>()
  const [balance, setBalance] = useState<number>()

  useEffect(() => {

    async function getNetworkInfo() {
      const signer = externalProvider.getSigner();
      const accountAddress = await signer.getAddress()
      console.log("Account:", accountAddress);
      const balance = await externalProvider.getBalance(accountAddress)
      setBalance( Number(ethers.utils.formatEther(balance)))
      setExternalAddress(accountAddress)
      const externalNetworkInfo = await externalProvider.getNetwork()
      setENetwork(externalNetworkInfo)
    }
    if (externalProvider) {
      getNetworkInfo()
    }
  }, [externalProvider])

  useEffect(() => {
    if (externalProvider) {
      const networkTokens =
      (tokensToWatch && eNetwork && tokensToWatch[eNetwork.chainId]) || [];

      let tokenContracts: Array<Erc20Detailed> = [];
      if (externalProvider && externalAddress && networkTokens.length > 0) {
        getTokenDataDirect(networkTokens, dispatcher, externalAddress, externalProvider, spenderAddress);
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
    }
  }, [eNetwork, externalAddress, externalProvider]);

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
  }, [state.network, state.provider, state.address, externalProvider]);

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
  let onboardState;

  // if (!externalProvider) {
    // useOnboard(
    //   networkIds,
    //   checkNetwork,
    //   dispatcher,
    //   onboardConfig,
    //   cacheWalletSelection,
    //   checkIsReady,
    // );

    if (onboard !== undefined && "getState" in onboard) {
      onboardState = onboard?.getState();
    }
  // }


  // console.log("🚀 ~ file: localWeb3Context.tsx ~ line 61 ~ useEffect ~ externalProvider", externalProvider)


  return (
    <LocalProviderContext.Provider
      value={externalProvider ? {
        address: externalAddress,
        ethBalance: balance,
        isReady: true,
        network: eNetwork?.chainId,
        onboard: onboard,
        provider: externalProvider,
        savedWallet: "",
        tokens: tokens,
        wallet: undefined,

        gasPrice,
        isMobile: false,
        walletConnectReady: false,

        resetOnboard,
        refreshGasPrice,
        signMessage,
        checkIsReady,
        dispatcher,
      } : {
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
}

const createExternalProvider = ({
  children,
  externalProvider,
  tokensToWatch,
  onboardConfig,
  cacheWalletSelection = true,
  networkIds,
  checkNetwork = (networkIds && networkIds.length > 0) || false,
  spenderAddress,
}: LocalWeb3ContextProps) => {
  const [state, dispatcher] = useReducer(localWeb3ContextReducer, {
    savedWallet: ""
  } as any);

  const [eNetwork, setENetwork] = useState<ethers.providers.Network>()
  const [externalAddress, setExternalAddress] = useState<string>()
  const [balance, setBalance] = useState<number>()
  useEffect(() => {

    async function getNetworkInfo() {
      const signer = externalProvider.getSigner();
      const accountAddress = await signer.getAddress()
      console.log("Account:", accountAddress);
      const balance = await externalProvider.getBalance(accountAddress)
      setBalance( Number(ethers.utils.formatEther(balance)))
      setExternalAddress(accountAddress)
      const externalNetworkInfo = await externalProvider.getNetwork()
      setENetwork(externalNetworkInfo)
    }
    getNetworkInfo()
  }, [])

  useEffect(() => {
    const networkTokens =
      (tokensToWatch && eNetwork && tokensToWatch[eNetwork.chainId]) || [];

    let tokenContracts: Array<Erc20Detailed> = [];
    if (externalProvider && externalAddress && networkTokens.length > 0) {
      getTokenDataDirect(networkTokens, dispatcher, externalAddress, externalProvider, spenderAddress);
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
  }, [eNetwork, externalAddress]);

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

  return (
    <LocalProviderContext.Provider
      value={{
        address: externalAddress,
        ethBalance: balance,
        isReady: true,
        network: eNetwork?.chainId,
        onboard: onboard,
        provider: externalProvider,
        savedWallet: "",
        tokens: tokens,
        wallet: undefined,

        gasPrice,
        isMobile: false,
        walletConnectReady: false,

        resetOnboard,
        refreshGasPrice,
        signMessage,
        checkIsReady,
        dispatcher,
      }}
    >
      {eNetwork ? children : null}
    </LocalProviderContext.Provider>
  );
}

const LocalProvider = (props: LocalWeb3ContextProps) => createLocalProvider(props)

const useWeb3 = () => {
  const context = React.useContext(LocalProviderContext);
  if (context === undefined) {
    throw new Error("useOnboard must be used within a OnboardProvider");
  }
  return context;
};

export { LocalProvider, useWeb3 };
