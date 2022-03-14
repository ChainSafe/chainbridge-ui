import { useEffect } from "react";
import { ethers, utils } from "ethers";
import Onboard from "bnc-onboard";
import { API as OnboardAPI } from "bnc-onboard/dist/src/interfaces";
import { Actions, LocalWeb3State } from "../types";

const useOnboard = (
  networkIds: Array<number> | undefined,
  checkNetwork: boolean,
  dispatcher: React.Dispatch<Actions>,
  onboardConfig: any,
  cacheWalletSelection: boolean,
  checkIsReady: (
    onboard: OnboardAPI,
    dispatcher: (action: Actions) => void
  ) => void,
  externalProvider?: any,
  useExternalProvider?: any
) => {
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
          address: (address: string) => {
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
              // THIS IS CUSTOM SPECIAL CONDITION FOR WALLET CONNECT
              // FIGURE IT OUT A BETTER APPROACH TO THIS
              if (wallet.name === "WalletConnect" && cacheWalletSelection) {
                localStorage.setItem("onboard.selectedWallet", wallet.name);

                dispatcher({
                  type: "setWalletConnect",
                  payload: {
                    wallet,
                    provider: new ethers.providers.Web3Provider(
                      wallet.provider,
                      "any"
                    ),
                  },
                });
                checkIsReady(onboard, dispatcher);
              } else {
                wallet.name &&
                  cacheWalletSelection &&
                  localStorage.setItem("onboard.selectedWallet", wallet.name);

                dispatcher({
                  type: "setWallet",
                  payload: {
                    wallet,
                    provider: new ethers.providers.Web3Provider(
                      wallet.provider,
                      "any"
                    ),
                  },
                });
              }
            } else {
              dispatcher({
                type: "setWallet",
                payload: { wallet: undefined, provider: undefined },
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

            dispatcher({
              type: "setNetwork",
              payload: network,
            });
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

      cacheWalletSelection && savedWallet && onboard.walletSelect(savedWallet);

      dispatcher({
        type: "setOnBoard",
        payload: onboard,
      });
    } catch (error) {
      console.log("Error initializing onboard");
      console.log(error);
    }
  };

  useEffect(() => {
    const savedWallet = localStorage.getItem("onboard.selectedWallet") || "";

    dispatcher({
      type: "setSavedWallet",
      payload: savedWallet,
    });

    // HERE WE INITIALIZE ONBOARD NO MATTER WHAT
    if (!useExternalProvider) {
      initializeOnboard(savedWallet);
    }
  }, []);

};

export default useOnboard;
