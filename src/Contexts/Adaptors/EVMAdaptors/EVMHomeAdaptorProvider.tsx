import React from "react";
import { Bridge, BridgeFactory } from "@chainsafe/chainbridge-contracts";
import { useWeb3 } from "@chainsafe/web3-context";
import { BigNumber, utils, Event } from "ethers";
import { useCallback, useEffect, useState } from "react";
import {
  chainbridgeConfig,
  EvmBridgeConfig,
  TokenConfig,
} from "../../../chainbridgeConfig";
import { Erc20DetailedFactory } from "../../../Contracts/Erc20DetailedFactory";
import { Weth } from "../../../Contracts/Weth";
import { WethFactory } from "../../../Contracts/WethFactory";
import { useNetworkManager } from "../../NetworkManagerContext";
import { IHomeBridgeProviderProps } from "../interfaces";
import { HomeBridgeContext } from "../../HomeBridgeContext";
import { parseUnits } from "ethers/lib/utils";
import { decodeAddress } from "@polkadot/util-crypto";
import { getNetworkName } from "../../../Utils/Helpers";

import { hasTokenSupplies, getPriceCompatibility } from "./helpers";

export const EVMHomeAdaptorProvider = ({
  children,
}: IHomeBridgeProviderProps) => {
  const {
    isReady,
    network,
    provider,
    gasPrice,
    address,
    tokens,
    wallet,
    checkIsReady,
    ethBalance,
    onboard,
    resetOnboard,
  } = useWeb3();

  const {
    homeChainConfig,
    setTransactionStatus,
    setDepositNonce,
    handleSetHomeChain,
    homeChains,
    setNetworkId,
    setHomeTransferTxHash,
  } = useNetworkManager();

  const [homeBridge, setHomeBridge] = useState<Bridge | undefined>(undefined);
  const [relayerThreshold, setRelayerThreshold] = useState<number | undefined>(
    undefined
  );
  const [bridgeFee, setBridgeFee] = useState<number | undefined>();

  const [depositAmount, setDepositAmount] = useState<number | undefined>();
  const [selectedToken, setSelectedToken] = useState<string>("");

  // Contracts
  const [wrapper, setWrapper] = useState<Weth | undefined>(undefined);
  const [wrapTokenConfig, setWrapperConfig] = useState<TokenConfig | undefined>(
    undefined
  );

  useEffect(() => {
    if (network) {
      const chain = homeChains.find((chain) => chain.networkId === network);
      setNetworkId(network);
      if (chain) {
        handleSetHomeChain(chain.chainId);
      }
    }
  }, [handleSetHomeChain, homeChains, network, setNetworkId]);

  const [initialising, setInitialising] = useState(false);
  const [walletSelected, setWalletSelected] = useState(false);
  useEffect(() => {
    if (initialising || homeBridge || !onboard) return;
    console.log("starting init");
    setInitialising(true);
    if (!walletSelected) {
      onboard
        .walletSelect("metamask")
        .then((success) => {
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

  useEffect(() => {
    const getRelayerThreshold = async () => {
      if (homeBridge) {
        const threshold = BigNumber.from(
          await homeBridge._relayerThreshold()
        ).toNumber();
        setRelayerThreshold(threshold);
      }
    };
    const getBridgeFee = async () => {
      if (homeBridge) {
        const bridgeFee = Number(utils.formatEther(await homeBridge._fee()));
        setBridgeFee(bridgeFee);
      }
    };
    getRelayerThreshold();
    getBridgeFee();
  }, [homeBridge]);

  const handleConnect = useCallback(async () => {
    if (wallet && wallet.connect && network) {
      await onboard?.walletSelect("metamask");
      await wallet.connect();
    }
  }, [wallet, network, onboard]);

  const handleCheckSupplies = useCallback(
    async (
      amount: number,
      tokenAddress: string,
      destinationChainId: number
    ) => {
      if (homeChainConfig) {
        const destinationChain = chainbridgeConfig.chains.find(
          (c) => c.chainId === destinationChainId
        );
        const token = homeChainConfig.tokens.find(
          (token) => token.address === tokenAddress
        );

        if (destinationChain?.type === "Ethereum" && token) {
          const hasSupplies = await hasTokenSupplies(
            destinationChain,
            tokens,
            token,
            amount,
            tokenAddress
          );
          if (!hasSupplies) {
            return false;
          }
        }
        return true;
      }
    },
    [homeChainConfig, tokens]
  );

  const deposit = useCallback(
    async (
      amount: number,
      recipient: string,
      tokenAddress: string,
      destinationChainId: number
    ) => {
      if (!homeChainConfig || !homeBridge) {
        console.error("Home bridge contract is not instantiated");
        return;
      }
      const signer = provider?.getSigner();
      if (!address || !signer) {
        console.log("No signer");
        return;
      }

      const destinationChain = chainbridgeConfig.chains.find(
        (c) => c.chainId === destinationChainId
      );
      if (destinationChain?.type === "Substrate") {
        recipient = `0x${Buffer.from(decodeAddress(recipient)).toString(
          "hex"
        )}`;
      }
      const token = homeChainConfig.tokens.find(
        (token) => token.address === tokenAddress
      );

      if (!token) {
        console.log("Invalid token selected");
        return;
      }
      setTransactionStatus("Initializing Transfer");
      setDepositAmount(amount);
      setSelectedToken(tokenAddress);
      const erc20 = Erc20DetailedFactory.connect(tokenAddress, signer);
      const erc20Decimals = tokens[tokenAddress].decimals;

      const data =
        "0x" +
        utils
          .hexZeroPad(
            // TODO Wire up dynamic token decimals
            BigNumber.from(
              utils.parseUnits(amount.toString(), erc20Decimals)
            ).toHexString(),
            32
          )
          .substr(2) + // Deposit Amount (32 bytes)
        utils
          .hexZeroPad(utils.hexlify((recipient.length - 2) / 2), 32)
          .substr(2) + // len(recipientAddress) (32 bytes)
        recipient.substr(2); // recipientAddress (?? bytes)

      try {
        const gasPriceCompatibility = await getPriceCompatibility(
          provider,
          homeChainConfig,
          gasPrice
        );

        const currentAllowance = await erc20.allowance(
          address,
          (homeChainConfig as EvmBridgeConfig).erc20HandlerAddress
        );
        console.log(
          "🚀  currentAllowance",
          utils.formatUnits(currentAllowance, erc20Decimals)
        );
        if (
          Number(utils.formatUnits(currentAllowance, erc20Decimals)) < amount
        ) {
          if (
            Number(utils.formatUnits(currentAllowance, erc20Decimals)) > 0 &&
            token.isDoubleApproval
          ) {
            //We need to reset the user's allowance to 0 before we give them a new allowance
            //TODO Should we alert the user this is happening here?
            await (
              await erc20.approve(
                (homeChainConfig as EvmBridgeConfig).erc20HandlerAddress,
                BigNumber.from(utils.parseUnits("0", erc20Decimals)),
                {
                  gasPrice: gasPriceCompatibility,
                }
              )
            ).wait(1);
          }
          await (
            await erc20.approve(
              (homeChainConfig as EvmBridgeConfig).erc20HandlerAddress,
              BigNumber.from(
                utils.parseUnits(amount.toString(), erc20Decimals)
              ),
              {
                gasPrice: gasPriceCompatibility,
              }
            )
          ).wait(1);
        }
        homeBridge.once(
          homeBridge.filters.Deposit(null, null, null, address, null, null),
          (
            destinationDomainId: number,
            resourceId: string,
            depositNonce: number,
            user: string,
            data: string,
            tx: Event
          ) => {
            setDepositNonce(`${depositNonce.toString()}`);
            setTransactionStatus("In Transit");
            setHomeTransferTxHash(tx.transactionHash);
          }
        );

        await (
          await homeBridge.deposit(destinationChainId, token.resourceId, data, {
            gasPrice: gasPriceCompatibility,
            value: utils.parseUnits((bridgeFee || 0).toString(), 18),
          })
        ).wait();

        return Promise.resolve();
      } catch (error) {
        console.error(error);
        setTransactionStatus("Transfer Aborted");
        setSelectedToken(tokenAddress);
      }
    },
    [
      homeBridge,
      address,
      bridgeFee,
      homeChainConfig,
      gasPrice,
      provider,
      setDepositNonce,
      setTransactionStatus,
      tokens,
    ]
  );

  const wrapToken = async (value: number): Promise<string> => {
    if (!wrapTokenConfig || !wrapper?.deposit || !homeChainConfig)
      return "not ready";

    try {
      const gasPriceCompatibility = await getPriceCompatibility(
        provider,
        homeChainConfig,
        gasPrice
      );

      const tx = await wrapper.deposit({
        value: parseUnits(`${value}`, homeChainConfig.decimals),
        gasPrice: gasPriceCompatibility,
      });

      await tx?.wait();
      if (tx?.hash) {
        return tx?.hash;
      } else {
        return "";
      }
    } catch (error) {
      console.error(error);
      return "";
    }
  };

  const unwrapToken = async (value: number): Promise<string> => {
    if (!wrapTokenConfig || !wrapper?.withdraw || !homeChainConfig)
      return "not ready";

    try {
      const gasPriceCompatibility = await getPriceCompatibility(
        provider,
        homeChainConfig,
        gasPrice
      );

      const tx = await wrapper.deposit({
        value: parseUnits(`${value}`, homeChainConfig.decimals),
        gasPrice: gasPriceCompatibility,
      });

      await tx?.wait();
      if (tx?.hash) {
        return tx?.hash;
      } else {
        return "";
      }
    } catch (error) {
      console.error(error);
      return "";
    }
  };

  return (
    <HomeBridgeContext.Provider
      value={{
        connect: handleConnect,
        disconnect: async () => {
          await resetOnboard();
        },
        getNetworkName,
        bridgeFee,
        deposit,
        depositAmount,
        selectedToken,
        setDepositAmount,
        setSelectedToken,
        tokens,
        relayerThreshold,
        wrapTokenConfig,
        wrapper,
        wrapToken,
        unwrapToken,
        isReady,
        chainConfig: homeChainConfig,
        address,
        nativeTokenBalance: ethBalance,
        handleCheckSupplies,
      }}
    >
      {children}
    </HomeBridgeContext.Provider>
  );
};
