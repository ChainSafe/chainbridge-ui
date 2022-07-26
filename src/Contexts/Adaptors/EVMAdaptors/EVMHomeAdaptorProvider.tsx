import React from "react";
import { Bridge, BridgeFactory } from "@chainsafe/chainbridge-contracts";
import { useWeb3 } from "@chainsafe/web3-context";
import { BigNumber, utils } from "ethers";
import { useCallback, useEffect, useState } from "react";
import {
  chainbridgeConfig,
  EvmBridgeConfig,
  SubstrateBridgeConfig,
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
import { getPriceCompatibility } from "./helpers";
import { hasTokenSupplies } from "../SubstrateApis/ChainBridgeAPI";
import { ApiPromise } from "@polkadot/api";

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

  const getNetworkName = (id: any) => {
    switch (Number(id)) {
      case 1:
        return "Ethereum Mainnet";
      case 2:
        return "Cere Mainnet (Testnet)";
      case 3:
        return "Ethereum Ropsten";
      case 4:
        return "Ethereum Rinkeby";
      case 5:
        return "Ethereum Goerli";
      case 6:
        return "Kotti";
      case 42:
        return "Ethereum Kovan";
      case 61:
        return "Ethereum Classic - Mainnet";
      case 42220:
        return "CELO - Mainnet";
      case 44787:
        return "CELO - Alfajores Testnet";
      case 62320:
        return "CELO - Baklava Testnet";
      case 1749641142:
        return "Besu";
      case 137:
        return "Polygon Mainnet";
      case 80001:
        return "Polygon Mumbai";
      default:
        return "Other";
    }
  };

  const {
    homeChainConfig,
    destinationChainConfig,
    setTransactionStatus,
    setDepositNonce,
    handleSetHomeChain,
    homeChains,
    setNetworkId,
    setWalletType,
    depositAmount,
    setDepositAmount,
    setDepositRecipient,
    fallback,
    analytics,
    setAddress,
    setHomeTransferTxHash,
    api,
  } = useNetworkManager();

  const [homeBridge, setHomeBridge] = useState<Bridge | undefined>(undefined);
  const [relayerThreshold, setRelayerThreshold] = useState<number | undefined>(
    undefined
  );
  const [bridgeFee, setBridgeFee] = useState<number | undefined>();

  const [selectedToken, setSelectedToken] = useState<string>("");

  // Contracts
  const [wrapper, setWrapper] = useState<Weth | undefined>(undefined);
  const [wrapTokenConfig, setWrapperConfig] = useState<TokenConfig | undefined>(
    undefined
  );
  const [initialising, setInitialising] = useState(false);
  const [walletSelected, setWalletSelected] = useState(false);

  useEffect(() => {
    if (network) {
      const chain = homeChains.find((chain) => chain.networkId === network);
      setNetworkId(network);
      if (chain) {
        handleSetHomeChain(chain.chainId);
      }
    }
  }, [handleSetHomeChain, homeChains, network, setNetworkId]);

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
            window.ethereum.on("accountsChanged", (accounts: any) => {
              setWalletType("unset");
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

  useEffect(() => {
    const getRelayerThreshold = async () => {
      if (homeBridge) {
        //TODO: https://cerenetwork.atlassian.net/browse/CBI-1124
        // const threshold = BigNumber.from(
        //   await homeBridge._relayerThreshold()
        // ).toNumber();
        const threshold = 2;
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
    async (amount: number) => {
      if (destinationChainConfig?.type === "Substrate") {
        return await hasTokenSupplies(
          api as ApiPromise,
          (destinationChainConfig as SubstrateBridgeConfig).bridgeAccountId,
          amount,
          destinationChainConfig.decimals
        );
      } else {
        console.warn(
          `Liquidity check is skipping. The destination chain type ${destinationChainConfig?.type} is unknown. Please check it.`
        );
        return true;
      }
    },
    [destinationChainConfig, api]
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
      setAddress(address);
      setTransactionStatus("Initializing Transfer");
      setDepositRecipient(recipient);
      setDepositAmount(amount);
      setSelectedToken(tokenAddress);
      analytics.trackTransferInitializingEvent({
        address,
        recipient,
        amount: depositAmount as number,
      });

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
            setTransactionStatus("Transfer from Source");
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
          homeBridge.filters.Deposit(
            destinationChainId,
            token.resourceId,
            null
          ),
          (destChainId, resourceId, depositNonce, tx) => {
            setHomeTransferTxHash(tx.transactionHash);
            setDepositNonce(`${depositNonce.toString()}`);
            setTransactionStatus("Transfer to Destination");
            analytics.trackTransferToDestinationEvent({
              address,
              recipient,
              nonce: parseInt(depositNonce),
              amount: depositAmount as number,
            });
          }
        );

        await (
          await homeBridge.deposit(destinationChainId, token.resourceId, data, {
            gasPrice: gasPriceCompatibility,
            value: utils.parseUnits((bridgeFee || 0).toString(), 18),
          })
        ).wait();

        analytics.trackTransferFromSourceEvent({
          address,
          recipient,
          amount: depositAmount as number,
        });

        return Promise.resolve();
      } catch (error) {
        console.error(error);
        setTransactionStatus("Transfer Aborted");
        setSelectedToken(tokenAddress);
        fallback?.stop();
        analytics.trackTransferAbortedEvent({
          address,
          recipient,
          amount: depositAmount as number,
        });
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
