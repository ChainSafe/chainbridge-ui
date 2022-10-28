import React, { useCallback, useEffect, useState } from "react";
import { HomeBridgeContext } from "../HomeBridgeContext";
import { useNetworkManager } from "../NetworkManagerContext";
import { createApi, submitDeposit } from "./SubstrateApis/ChainBridgeAPI";
import { IHomeBridgeProviderProps, InjectedAccountType } from "./interfaces";

import {
  web3Accounts,
  web3Enable,
  web3FromSource,
} from "@polkadot/extension-dapp";
import { Tokens } from "@chainsafe/web3-context/dist/context/tokensReducer";
import { BigNumber as BN } from "bignumber.js";
import { VoidFn } from "@polkadot/api/types";
import { utils } from "ethers";
import { SubstrateBridgeConfig, getСhainConfig } from "../../chainbridgeConfig";
import { toFixedWithoutRounding } from "../../Utils/Helpers";
import { hasTokenSupplies } from "./EVMAdaptors/helpers";

export const SubstrateHomeAdaptorProvider = ({
  children,
}: IHomeBridgeProviderProps) => {
  const [isReady, setIsReady] = useState(false);
  const [accounts, setAccounts] = useState<InjectedAccountType[]>([]);

  const {
    homeChainConfig,
    setTransactionStatus,
    setDepositNonce,
    handleSetHomeChain,
    homeChains,
    depositAmount,
    setDepositAmount,
    setDepositRecipient,
    fallback,
    address,
    setAddress,
    analytics,
    setHomeTransferTxHash,
    api,
    setApi,
  } = useNetworkManager();

  const [relayerThreshold, setRelayerThreshold] = useState<number | undefined>(
    undefined
  );
  const [bridgeFee, setBridgeFee] = useState<number | undefined>(undefined);

  const [selectedToken, setSelectedToken] = useState<string>("CSS");

  const [tokens, setTokens] = useState<Tokens>({});

  useEffect(() => {
    // Attempt connect on load
    handleConnect();
  });

  const [initialising, setInitialising] = useState(false);
  useEffect(() => {
    // Once the chain ID has been set in the network context, the homechain configuration will be automatically set thus triggering this
    if (!homeChainConfig || initialising || api) return;
    setInitialising(true);
    createApi(homeChainConfig.rpcUrl, homeChainConfig.rpcFallbackUrls)
      .then(async (api) => {
        await api.isReady;
        setApi(api);
        setIsReady(true);
        setInitialising(false);
      })
      .catch(console.error);
  }, [homeChainConfig, initialising]);

  const getRelayerThreshold = useCallback(async () => {
    if (api) {
      const relayerThreshold = await api.query[
        (homeChainConfig as SubstrateBridgeConfig).chainbridgePalletName
      ].relayerThreshold();
      setRelayerThreshold(Number(relayerThreshold.toHuman()));
    }
  }, [api, homeChainConfig]);

  const getBridgeFee = useCallback(async () => {
    if (api) {
      const config = homeChainConfig as SubstrateBridgeConfig;

      const fee = config.bridgeFeeFunctionName
        ? new BN(
            Number(
              await api.query[config.transferPalletName][
                config.bridgeFeeFunctionName
              ]()
            )
          )
            .shiftedBy(-config.decimals)
            .toNumber()
        : config.bridgeFeeValue
        ? config.bridgeFeeValue
        : 0;

      setBridgeFee(fee);
    }
  }, [api, homeChainConfig]);

  const confirmChainID = useCallback(async () => {
    if (api) {
      const currentId = Number(
        api.consts[
          (homeChainConfig as SubstrateBridgeConfig).chainbridgePalletName
        ].chainIdentity.toHuman()
      );
      if (homeChainConfig?.chainId !== currentId) {
        const correctConfig = homeChains.find(
          (item) => item.chainId === currentId
        );
        if (correctConfig) {
          handleSetHomeChain(currentId);
        }
      }
    }
  }, [api, handleSetHomeChain, homeChainConfig, homeChains]);

  useEffect(() => {
    // For all constants & essential values like:
    // Relayer Threshold, resources IDs & Bridge Fees
    // It is recommended to collect state at this point
    if (api) {
      if (api.isConnected && homeChainConfig) {
        getRelayerThreshold();
        confirmChainID();
        getBridgeFee();
      }
    }
  }, [api, getRelayerThreshold, getBridgeFee, confirmChainID, homeChainConfig]);

  useEffect(() => {
    if (!homeChainConfig || !address) return;
    let unsubscribe: VoidFn | undefined;
    if (api) {
      api.derive.balances
        .all(address, (result) => {
          const balance = result.availableBalance.toString();
          const transferableBalance = Math.max(
            0,
            parseFloat(
              toFixedWithoutRounding(
                parseFloat(
                  utils.formatUnits(balance, homeChainConfig.decimals)
                ) -
                  (homeChainConfig as SubstrateBridgeConfig)
                    .existentialDepositPlusNetworkFee,
                homeChainConfig.decimals
              )
            )
          );
          setTokens({
            [homeChainConfig.tokens[0].address || "TOKEN"]: {
              decimals:
                homeChainConfig.tokens[0].decimals ?? homeChainConfig.decimals,
              balance: transferableBalance,
              balanceBN: new BN(transferableBalance),
              name: homeChainConfig.tokens[0].name,
              symbol: homeChainConfig.tokens[0].symbol,
            },
          });
        })
        .then((unsub) => {
          unsubscribe = unsub;
        })
        .catch(console.error);
    }
    return () => {
      unsubscribe && unsubscribe();
    };
  }, [api, address, homeChainConfig]);

  const handleConnect = useCallback(async () => {
    // Requests permission to inject the wallet
    if (!isReady) {
      web3Enable("Cere Bridge")
        .then(() => {
          // web3Account resolves with the injected accounts
          // or an empty array
          web3Accounts()
            .then((accounts) => {
              return accounts.map(({ address, meta }) => ({
                address,
                meta: {
                  ...meta,
                  name: meta.name || address,
                },
              }));
            })
            .then((injectedAccounts) => {
              // This is where the correct chain configuration is set to the network context
              // Any operations before presenting the accounts to the UI or providing the config
              // to the rest of the dapp should be done here
              setAccounts(injectedAccounts);
              if (injectedAccounts.length === 1) {
                setAddress(injectedAccounts[0].address);
              }
              handleSetHomeChain(
                homeChains.find((item) => item.type === "Substrate")?.chainId
              );
            })
            .catch(console.error);
        })
        .catch(console.error);
    }
  }, [isReady, handleSetHomeChain, homeChains]);

  const selectAccount = useCallback(
    (index: number) => {
      setAddress(accounts[index].address);
    },
    [accounts]
  );

  const deposit = useCallback(
    async (
      amount: number,
      recipient: string,
      tokenAddress: string,
      destinationChainId: number
    ) => {
      if (api && address) {
        const allAccounts = await web3Accounts();
        const targetAccount = allAccounts.find(
          (item) => item.address === address
        );
        if (targetAccount) {
          const transferExtrinsic = submitDeposit(
            api,
            amount,
            recipient,
            (homeChainConfig as SubstrateBridgeConfig).chainId,
            destinationChainId
          );

          const injector = await web3FromSource(targetAccount.meta.source);
          setDepositAmount(amount);
          setDepositRecipient(recipient);
          setSelectedToken(tokenAddress);
          setTransactionStatus("Initializing Transfer");
          analytics.trackTransferInitializingEvent({
            address,
            recipient,
            amount: depositAmount as number,
          });

          transferExtrinsic
            .signAndSend(
              address,
              { signer: injector.signer },
              ({ status, events }) => {
                if (status.isReady) {
                  setTransactionStatus("Transfer from Source");
                  analytics.trackTransferFromSourceEvent({
                    address,
                    recipient,
                    amount: depositAmount as number,
                  });
                }

                if (status.isInBlock) {
                  console.log(
                    `Completed at block hash #${status.isInBlock.toString()}`
                  );
                }

                if (status.isFinalized) {
                  events.filter(({ event }) => {
                    return api.events[
                      (homeChainConfig as SubstrateBridgeConfig)
                        .chainbridgePalletName
                    ].FungibleTransfer.is(event);
                  });
                  api.query[
                    (homeChainConfig as SubstrateBridgeConfig)
                      .chainbridgePalletName
                  ]
                    .chainNonces(destinationChainId)
                    .then((response) => {
                      const depositNonce = response.toString() || undefined
                      setDepositNonce(depositNonce);
                      setHomeTransferTxHash(status.asFinalized.toHex());
                      setTransactionStatus("Transfer to Destination");
                      analytics.trackTransferToDestinationEvent({
                        address,
                        recipient,
                        nonce: depositNonce? parseInt(depositNonce) : undefined,
                        amount: depositAmount as number,
                      });
                    })
                    .catch((error) => {
                      console.error(error);
                    });
                } else {
                  console.log(`Current status: ${status.type}`);
                }
              }
            )
            .catch((error: any) => {
              console.log(":( transaction failed", error);
              setTransactionStatus("Transfer Aborted");
              fallback?.stop();
            });
        }
      }
    },
    [api, setDepositNonce, setTransactionStatus, address, homeChainConfig]
  );

  const handleCheckSupplies = useCallback(
    async (
      amount: number,
      tokenAddress: string,
      destinationChainId: number
    ) => {
      if (homeChainConfig) {
        const destinationChainConfig = getСhainConfig(destinationChainId);
        const token = homeChainConfig.tokens.find(
          (token) => token.address === tokenAddress
        );

        if (destinationChainConfig?.type === "Ethereum" && token) {
          return await hasTokenSupplies(
            destinationChainConfig,
            tokens,
            token,
            amount,
            tokenAddress
          );
        } else {
          console.warn(
            `Liquidity check is skipping. The destination chain type ${destinationChainConfig?.type} is unknown. Please check it.`
          );
          return true;
        }
      }
    },
    [homeChainConfig, tokens]
  );

  // Required for adaptor however not needed for substrate
  const wrapToken = async (value: number): Promise<string> => {
    return "Not implemented";
  };

  // Required for adaptor however not needed for substrate
  const unwrapToken = async (value: number): Promise<string> => {
    return "Not implemented";
  };

  return (
    <HomeBridgeContext.Provider
      value={{
        connect: handleConnect,
        disconnect: async () => {
          if (api?.isConnected) await api?.disconnect();
          setApi(undefined);
          setIsReady(false);
        },
        bridgeFee,
        deposit,
        depositAmount,
        selectedToken,
        setDepositAmount,
        setSelectedToken,
        tokens: tokens,
        relayerThreshold,
        wrapTokenConfig: undefined, // Not implemented
        wrapper: undefined, // Not implemented
        wrapToken, // Not implemented
        unwrapToken, // Not implemented
        isReady: isReady,
        chainConfig: homeChainConfig,
        address: address,
        nativeTokenBalance: 0,
        accounts: accounts,
        selectAccount: selectAccount,
        handleCheckSupplies,
      }}
    >
      {children}
    </HomeBridgeContext.Provider>
  );
};
