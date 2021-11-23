import React from "react";

import { Bridge, BridgeFactory } from "@chainsafe/chainbridge-contracts";
import { useWeb3 } from "@chainsafe/web3-context";
import { providers, BigNumber, utils } from "ethers";
import { useCallback, useEffect, useState } from "react";
import {
  BridgeConfig,
  chainbridgeConfig,
  EvmBridgeConfig,
  TokenConfig,
} from "../../../chainbridgeConfig";
import { Weth } from "../../../Contracts/Weth";
import { WethFactory } from "../../../Contracts/WethFactory";

export function useConnectWallet(
  isReady: boolean,
  checkIsReady: () => Promise<boolean>,
  onboard?: { walletSelect: (arg0: string) => Promise<any> },
  homeChainConfig?: BridgeConfig,
  provider?: providers.Web3Provider,
  network?: number
) {
  const [initialising, setInitialising] = useState(false);
  const [walletSelected, setWalletSelected] = useState(false);
  const [homeBridge, setHomeBridge] = useState<Bridge | undefined>(undefined);

  // Contracts
  const [wrapper, setWrapper] = useState<Weth | undefined>(undefined);
  const [wrapTokenConfig, setWrapperConfig] = useState<TokenConfig | undefined>(
    undefined
  );

  useEffect(() => {
    if (initialising || homeBridge || !onboard) return;
    console.log("starting init");
    setInitialising(true);
    if (!walletSelected) {
      onboard
        .walletSelect("metamask")
        .then((success) => {
          if (window.ethereum) {
            window.ethereum.on("chainChanged", (ch: any) => {
              window.location.reload();
            });
          }

          setWalletSelected(success);
          if (success) {
            checkIsReady()
              .then((success) => {
                if (success) {
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
                }
              })
              .catch((error) => {
                console.error(error);
              })
              .finally(() => {
                setInitialising(false);
              });
          }
        })
        .catch((error) => {
          setInitialising(false);
          console.error(error);
        });
    } else {
      checkIsReady()
        .then((success) => {
          if (success) {
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
          }
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setInitialising(false);
        });
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

  return { homeBridge, wrapper, wrapTokenConfig };
}
