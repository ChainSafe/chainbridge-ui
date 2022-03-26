import React, { useState, useEffect, useReducer } from "react";
import ethers from "ethers";
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
// import { hooks, connector } from './connectors/metaMask'
// import { useSafeAppConnection, SafeAppConnector } from '@gnosis.pm/safe-apps-web3-react';

import { hooks, connector } from './connectors/walletConnect'

// import { useOnboard } from "./customHook";


const LocalProviderContext = React.createContext<LocalWeb3Context | undefined>(
  undefined
);

const LocalProvider = ({
  children,
  // externalProvider,
  useExternalProvider,
  tokensToWatch,
  onboardConfig,
  cacheWalletSelection = true,
  networkIds,
  checkNetwork = (networkIds && networkIds.length > 0) || false,
  spenderAddress,
}: LocalWeb3ContextProps) => {
  const { useChainId, useAccounts, useError, useIsActivating, useIsActive, useProvider, useENSNames } = hooks

  const [state, dispatcher] = useReducer(localWeb3ContextReducer, {
    savedWallet: ""
  } as any);

  // const [eNetwork, setENetwork] = useState<ethers.providers.Network>()
  const [externalAddress, setExternalAddress] = useState<string>()
  const [balance, setBalance] = useState<number>()

  const externalProvider = useProvider()
  const accounts = useAccounts()
  const chainId = useChainId()
  const isActive = useIsActive()



  useEffect(() => {

    async function getNetworkInfo() {
      // const signer = externalProvider.getSigner();
      if (externalProvider && accounts?.length) {
        const accountAddress = accounts ? accounts[0] : ''
        console.log("Account:", accountAddress);
        const balance = await externalProvider.getBalance(accountAddress)
        setBalance( Number(ethers.utils.formatEther(balance)))
      }
    }
    if (externalProvider) {
      getNetworkInfo()
      setExternalAddress(accounts ? accounts[0] : '')
    }
  }, [externalProvider, accounts])

  useEffect(() => {
    void connector.connectEagerly()
    // setTimeout(async () =>{
    //     void connector.activate()
    // }, 3000)
    // void gnosis.activate()

    // const triedToConnectToSafe = useSafeAppConnection(safeMultisigConnector);
    // connector.isSafeApp().then((loadedInSafe) => {
    // //   if (loadedInSafe) {
    // //     // On success active flag will change and in that case we'll set tried to true, check the hook below
    // //     activate(connector, undefined, true).catch(() => {
    // //       setTried(true);
    // //     });
    // //   } else {
    // //     setTried(true);
    // //   }
    // });
  }, [])

  useEffect(() => {
    const networkTokens =
    (tokensToWatch && chainId && tokensToWatch[chainId]) || [];

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
  }, [externalProvider, accounts, externalAddress]);

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

  return (
    <LocalProviderContext.Provider
      value={{
        address: externalAddress,
        ethBalance: balance,
        isReady: isActive,
        network: chainId,
        onboard: onboard,
        provider: externalProvider,
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
