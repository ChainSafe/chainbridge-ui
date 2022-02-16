import { useEffect, useState } from "react";
import { ethers, utils } from "ethers";
import Onboard from "bnc-onboard";
import { API as OnboardAPI, Wallet } from "bnc-onboard/dist/src/interfaces";
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
  wallet: Wallet,
  onboard: OnboardAPI,
  state: LocalWeb3State
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
            console.log("SUBSCRIPTION ADDRESS", address);
            dispatcher({
              type: "setAddress",
              payload: address,
            });
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
                localStorage.setItem("onboard.selectedWallet", "walletConnect");

                dispatcher({
                  type: "setWalletConnect",
                  payload: wallet,
                });
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
            console.log("NETWORK", network);
            if (!networkIds || networkIds.includes(network)) {
              onboard.config({ networkId: network });
            }
            wallet &&
              wallet.provider &&
              dispatcher({
                type: "setNetworkAnProvider",
                payload: {
                  network,
                  provider: new ethers.providers.Web3Provider(
                    wallet.provider,
                    "any"
                  ),
                },
              });
            dispatcher({
              type: "setNetwork",
              payload: network,
            });
            // setNetwork(network);
            // checkIsReady(onboard, dispatcher);
            return (
              onboardConfig?.subscriptions?.network &&
              onboardConfig.subscriptions.network(network)
            );
          },
          balance: (balance) => {
            try {
              const bal = Number(utils.formatEther(balance));
              console.log("BAL", bal);
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
  useEffect(() => {
    const savedWallet = localStorage.getItem("onboard.selectedWallet") || "";

    // HERE WE INITIALIZE ONBOARD NO MATTER WHAT
    initializeOnboard(savedWallet);
  }, []);
  useEffect(() => {
    console.log("PROVIDER AND ONBOARD ===>", state)
    if(state.provider !== undefined && state.onboard !== undefined){
      console.log("SECOND CHECK IS READY")
      check()
    }
  }, [state.provider, state.onboard])

  useEffect(() => {
    if(wCheck){
      checkIsReady(state.onboard, dispatcher)
    }
  }, [wCheck])
};

export default useOnboard;
