import React from "react";

import { Bridge, BridgeFactory } from "@chainsafe/chainbridge-contracts";
import { providers } from "ethers";
import { useEffect, useState } from "react";
import {
  BridgeConfig,
  EvmBridgeConfig,
  TokenConfig,
} from "../../../chainbridgeConfig";
import { API as OnboardAPI } from "bnc-onboard/dist/src/interfaces";
import { Weth } from "../../../Contracts/Weth";
import { WethFactory } from "../../../Contracts/WethFactory";
import { Actions } from "../../localWeb3Context/types";

export function useConnectWallet(
  isReady: boolean,
  checkIsReady: (
    onboard: OnboardAPI,
    dispatcher: (action: Actions) => void
  ) => Promise<boolean>,
  dispatcher: (action: Actions) => void,
  onboard?: OnboardAPI,
  homeChainConfig?: BridgeConfig,
  provider?: providers.Web3Provider,
  network?: number,
  savedWallet?: string
) {
  // console.log("🚀 ~ file: useConnectWallet.ts ~ line 25 ~ homeChainConfig", homeChainConfig)

  const [initialising, setInitialising] = useState(false);
  const [walletSelected, setWalletSelected] = useState(false);
  const [homeBridge, setHomeBridge] = useState<Bridge | undefined>(undefined);

  // Contracts
  const [wrapper, setWrapper] = useState<Weth | undefined>(undefined);
  const [wrapTokenConfig, setWrapperConfig] = useState<TokenConfig | undefined>(
    undefined
  );

  useEffect(() => {
    if (initialising || homeBridge) return;
    console.log("starting init");
    // setInitialising(true);
    if (!walletSelected) {
      // onboard
      //   .walletSelect(savedWallet)
      //   .then((success) => {
          if (window.ethereum) {
            window.ethereum.on("chainChanged", (ch: any) => {
              window.location.reload();
            });
          }

          // setWalletSelected(success);
          // if (success) {
            // checkIsReady(onboard, dispatcher)
            //   .then((success) => {
                // if (success) {
                  // console.log(homeChainConfig, network, isReady, provider)

                  if (homeChainConfig && network && isReady && provider) {
                    // console.log('GO')
                    const signer = provider.getSigner();
                    if (!signer) {
                      console.log("No signer");
                      setInitialising(false);
                      return;
                    }

                    const bridge = BridgeFactory.connect(
                      (homeChainConfig as EvmBridgeConfig).bridgeAddress,
                      signer
                    );
                    setHomeBridge(bridge);

                    const wrapperToken = homeChainConfig.tokens.find(
                      (token) => token.isNativeWrappedToken
                    );

                    if (!wrapperToken) {
                      setWrapperConfig(undefined);
                      setWrapper(undefined);
                    } else {
                      setWrapperConfig(wrapperToken);
                      const connectedWeth = WethFactory.connect(
                        wrapperToken.address,
                        signer
                      );
                      setWrapper(connectedWeth);
                    }
                    setInitialising(false);
                  }
                // }
              // })
              // .catch((error) => {
              //   console.error(error);
              // })
              // .finally(() => {
              //   setInitialising(false);
              // });
          // }
        // })
        // .catch((error) => {
        //   setInitialising(false);
        //   console.error(error);
        // });
    } else {
      // checkIsReady(onboard, dispatcher)
      //   .then((success) => {
          // if (success) {
            if (homeChainConfig && network && isReady && provider) {
              const signer = provider.getSigner();
              if (!signer) {
                console.log("No signer");
                setInitialising(false);
                return;
              }

              const bridge = BridgeFactory.connect(
                (homeChainConfig as EvmBridgeConfig).bridgeAddress,
                signer
              );
              setHomeBridge(bridge);

              const wrapperToken = homeChainConfig.tokens.find(
                (token) => token.isNativeWrappedToken
              );

              if (!wrapperToken) {
                setWrapperConfig(undefined);
                setWrapper(undefined);
              } else {
                setWrapperConfig(wrapperToken);
                const connectedWeth = WethFactory.connect(
                  wrapperToken.address,
                  signer
                );
                setWrapper(connectedWeth);
              }
            }
          // }
        // })
        // .catch((error) => {
        //   console.error(error);
        // })
        // .finally(() => {
        //   setInitialising(false);
        // });
    }
  }, [
    initialising,
    homeChainConfig,
    isReady,
    provider,
    checkIsReady,
    network,
    homeBridge,
    onboard,
    walletSelected,
  ]);
  // console.log("🚀 ~ file: useConnectWallet.ts ~ line 161 ~ homeBridge", homeBridge)

  return { homeBridge, wrapper, wrapTokenConfig };
}
