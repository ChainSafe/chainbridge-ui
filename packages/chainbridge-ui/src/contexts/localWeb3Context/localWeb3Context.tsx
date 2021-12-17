import React, { useEffect, useReducer } from "react";
import Onboard from "bnc-onboard";
import { ethers, utils } from "ethers";
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
    const initializeOnboard = async (savedWallet: string) => {
      const checks = [{ checkName: "accounts" }, { checkName: "connect" }];
      if (networkIds && checkNetwork) {
        checks.push({ checkName: "network" });
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const { chainId } = await provider.getNetwork();

      try {
        const onboard = Onboard({
          ...onboardConfig,
          // networkId: networkIds ? networkIds[0] : 1, //Default to mainnet
          networkId: chainId,
          walletCheck: checks,
          subscriptions: {
            address: (address) => {
              dispatcher({
                type: "setAddress",
                payload: address,
              });
              checkIsReady(onboard, dispatcher);
              return (
                onboardConfig?.subscriptions?.address &&
                onboardConfig?.subscriptions?.address(address)
              );
            },
            wallet: (wallet) => {
              if (wallet.provider) {
                wallet.name &&
                  cacheWalletSelection &&
                  localStorage.setItem("onboard.selectedWallet", wallet.name);
                dispatcher({
                  type: "setWallet",
                  payload: wallet,
                });
                dispatcher({
                  type: "setProvider",
                  payload: new ethers.providers.Web3Provider(
                    wallet.provider,
                    "any"
                  ),
                });
              } else {
                dispatcher({
                  type: "setWallet",
                  payload: undefined,
                });
              }
              return (
                onboardConfig?.subscriptions?.wallet &&
                onboardConfig.subscriptions.wallet(wallet)
              );
            },
            network: (network) => {
              if (!networkIds || networkIds.includes(network)) {
                onboard.config({ networkId: network });
              }
              wallet &&
                wallet.provider &&
                dispatcher({
                  type: "setProvider",
                  payload: new ethers.providers.Web3Provider(
                    wallet.provider,
                    "any"
                  ),
                });
              dispatcher({
                type: "setNetwork",
                payload: network,
              });
              // setNetwork(network);
              checkIsReady(onboard, dispatcher);
              return (
                onboardConfig?.subscriptions?.network &&
                onboardConfig.subscriptions.network(network)
              );
            },
            balance: (balance) => {
              try {
                const bal = Number(utils.formatEther(balance));
                !isNaN(bal)
                  ? dispatcher({ type: "setBalance", payload: bal })
                  : dispatcher({ type: "setBalance", payload: 0 });
              } catch (error) {
                dispatcher({ type: "setBalance", payload: 0 });
              }
              return (
                onboardConfig?.subscriptions?.balance &&
                onboardConfig.subscriptions.balance(balance)
              );
            },
          },
        });

        cacheWalletSelection &&
          savedWallet &&
          onboard.walletSelect(savedWallet);

        dispatcher({
          type: "setOnBoard",
          payload: onboard,
        });
      } catch (error) {
        console.log("Error initializing onboard");
        console.log(error);
      }
    };

    const savedWallet = localStorage.getItem("onboard.selectedWallet");

    if (!savedWallet) {
      initializeOnboard("MetaMask");
    } else {
      initializeOnboard(savedWallet);
    }
  }, []);

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
  }: LocalWeb3State = state;

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
