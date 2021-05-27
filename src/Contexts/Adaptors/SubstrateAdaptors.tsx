import { Bridge } from "@chainsafe/chainbridge-contracts";
import React, { useCallback, useEffect, useState } from "react";
import { DestinationBridgeContext } from "../DestinationBridgeContext";
import { HomeBridgeContext } from "../HomeBridgeContext";
import { useNetworkManager } from "../NetworkManagerContext";
import {
  IDestinationBridgeProviderProps,
  IHomeBridgeProviderProps,
} from "./interfaces";

import { ApiPromise, WsProvider } from "@polkadot/api";
import {
  web3Accounts,
  web3Enable,
  web3FromSource,
} from "@polkadot/extension-dapp";
import keyring from "@polkadot/ui-keyring";
import types from "../../bridgeTypes.json";
import { TypeRegistry } from "@polkadot/types";
import { Tokens } from "@chainsafe/web3-context/dist/context/tokensReducer";
import { BigNumber as BN } from "bignumber.js";
import { UnsubscribePromise } from "@polkadot/api/types";

type injectedAccountType = {
  address: string;
  meta: {
    name: string;
    source: string;
  };
};

export const SubstrateHomeAdaptorProvider = ({
  children,
}: IHomeBridgeProviderProps) => {
  const registry = new TypeRegistry();
  const [api, setApi] = useState<ApiPromise | undefined>();
  const [isReady, setIsReady] = useState(false);

  const [address, setAddress] = useState<string | undefined>(undefined);

  const {
    homeChainConfig,
    setTransactionStatus,
    setDepositNonce,
    handleSetHomeChain,
    homeChains,
  } = useNetworkManager();

  const [homeBridge, setHomeBridge] = useState<Bridge | undefined>(undefined);
  const [relayerThreshold, setRelayerThreshold] = useState<number | undefined>(
    undefined
  );
  const [bridgeFee, setBridgeFee] = useState<number>(0);

  const [depositAmount, setDepositAmount] = useState<number | undefined>();
  const [selectedToken, setSelectedToken] = useState<string>("CSS");

  const [tokens, setTokens] = useState<Tokens>({});

  useEffect(() => {
    // Attempt connect on load
    handleConnect();
  }, []);

  useEffect(() => {
    // Once the chain ID has been set in the network context, the homechain configuration will be automatically set thus triggering this
    if (!homeChainConfig) return;

    const provider = new WsProvider(homeChainConfig.rpcUrl);
    ApiPromise.create({ provider, types })
      .then((api) => {
        types && registry.register(types);
        setApi(api);
      })
      .catch(console.error);
  }, [homeChainConfig, address]);

  useEffect(() => {
    // For all constants & essential values like:
    // Relayer Threshold, resources IDs & Bridge Fees
    // It is recommended to collect state at this point
    if (api) {
      getRelayerThreshold();
      confirmChainID();
    }
  }, [api]);

  const getChainNonces = useCallback(
    async (chainId: number) => {
      if (api) {
        return await api.query.chainBridge.chainNonces(chainId);
      } else {
        throw "Api not connected";
      }
    },
    [api]
  );

  const getRelayerThreshold = useCallback(async () => {
    if (api) {
      const relayerThreshold = await api.query.chainBridge.relayerThreshold();
      setRelayerThreshold(Number(relayerThreshold.toHuman()));
    }
  }, [api]);

  const confirmChainID = useCallback(async () => {
    if (api) {
      const currentId = Number(api.consts.chainBridge.chainIdentity.toHuman());
      if (homeChainConfig?.chainId != currentId) {
        const correctConfig = homeChains.find(
          (item) => item.chainId === currentId
        );
        if (correctConfig) {
          handleSetHomeChain(currentId);
        }
      }
    }
  }, [api]);

  // const subscribeToBalance = useCallback(async () => {
  //   if (api) {
  //     api.query.system.account(address, (result) => {
  //       const { data: { free: balance }} = (result.toHuman()) as any
  //       setTokens({
  //         "CSS": {
  //           balance: balance,
  //           balanceBN: new BN(balance),
  //           decimals: 15,
  //           name: "Chainbridge",
  //           symbol: "CSS",
  //         }
  //       })
  //     });
  //   }
  // }, [api]);

  useEffect(() => {
    let subscription: UnsubscribePromise;
    if (api) {
      subscription = api.query.system.account(address, (result) => {
        const {
          data: { free: balance },
        } = result.toJSON() as any;
        setTokens({
          CSS: {
            balance: balance,
            balanceBN: new BN(balance),
            decimals: 15,
            name: "Chainbridge",
            symbol: "CSS",
          },
        });
      });
    }
    // TODO unsubscribe
    return () => {};
  }, [api]);

  const handleConnect = useCallback(async () => {
    // Requests permission to inject the wallet
    web3Enable("chainbridge-ui")
      .then(() => {
        // web3Account resolves with the injected accounts
        // or an empty array
        web3Accounts()
          .then((accounts) => {
            return accounts.map(({ address, meta }) => ({
              address,
              meta: {
                ...meta,
                name: `${meta.name} (${meta.source})`,
              },
            }));
          })
          .then((injectedAccounts) => {
            // This is where the correct chain configuration is set to the network context
            // Any operations before presenting the accounts to the UI or providing the config
            // to the rest of the dapp should be done here
            loadAccounts(injectedAccounts);
            handleSetHomeChain(
              homeChains.find((item) => item.type === "Substrate")?.chainId
            );
          })
          .catch(console.error);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    // This is a simple check
    // The reason for having a isReady is that the UI can lazy load data from this point
    api?.isReady.then(() => setIsReady(true));
  }, [api?.isReady, setIsReady]);

  const loadAccounts = (injectedAccounts: injectedAccountType[] = []) => {
    keyring.loadAll({ isDevelopment: true }, injectedAccounts);

    setAddress(injectedAccounts[0].address);
  };

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
          const transferExtrinsic = api.tx.example.transferNative(
            amount,
            recipient,
            destinationChainId
          );
          const injector = await web3FromSource(targetAccount.meta.source);
          setTransactionStatus("Initializing Transfer");
          setDepositAmount(amount);
          // setSelectedToken(tokenAddress);
          transferExtrinsic
            .signAndSend(address, { signer: injector.signer }, ({ status }) => {
              // Need to set the deposit nonce & Tx Status
              if (status.isInBlock) {
                console.log(
                  `Completed at block hash #${status.asInBlock.toString()}`
                );
                api.query.chainBridge
                  .chainNonces(destinationChainId)
                  .then((response) => {
                    setTransactionStatus("In Transit");
                    setDepositNonce(`${response.toJSON()}`);
                  })
                  .catch((error: any) => {});
              } else {
                console.log(`Current status: ${status.type}`);
              }
            })
            .catch((error: any) => {
              debugger;
              setTransactionStatus("Transfer Aborted");
              console.log(":( transaction failed", error);
            });
        }
      }
    },
    [api, homeChainConfig, setDepositNonce, setTransactionStatus]
  );

  // Required for adaptor however not needed for substrate
  const wrapToken = async (value: number): Promise<string> => {
    return "Not implemented";
  };

  // Required for adaptor however not needed for substrate
  const unwrapToken = async (value: number): Promise<string> => {
    return "Not implemented";
  };

  // useEffect(() => {
  //   if (api) {
  //     // Wire up event listeners
  //     // Subscribe to system events via storage
  //     api.query.system.events((events) => {
  //       console.log('----- Received ' + events.length + ' event(s): -----');
  //       // loop through the Vec<EventRecord>
  //       events.forEach((record) => {
  //       // extract the phase, event and the event types
  //         const { event, phase } = record;
  //         const types = event.typeDef;
  //         // show what we are busy with
  //         console.log(event.section + ':' + event.method + '::' + 'phase=' + phase.toString());
  //         console.log(event.meta.documentation.toString());
  //         // loop through each of the parameters, displaying the type and data
  //         event.data.forEach((data, index) => {
  //           console.log(types[index].type + ';' + data.toString());
  //         });
  //       });
  //     });
  //   }
  // }, [api]);

  return (
    <HomeBridgeContext.Provider
      value={{
        connect: handleConnect,
        getNetworkName: () => "substrate-example",
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
      }}
    >
      {children}
    </HomeBridgeContext.Provider>
  );
};

export const SubstrateDestinationAdaptorProvider = ({
  children,
}: IDestinationBridgeProviderProps) => {
  const {
    depositNonce,
    destinationChainConfig,
    homeChainConfig,
    tokensDispatch,
    setTransactionStatus,
    setTransferTxHash,
    setDepositVotes,
    depositVotes,
  } = useNetworkManager();

  const registry = new TypeRegistry();
  const [api, setApi] = useState<ApiPromise | undefined>();

  useEffect(() => {
    // Once the chain ID has been set in the network context, the homechain configuration will be automatically set thus triggering this
    if (!destinationChainConfig) return;

    const provider = new WsProvider(destinationChainConfig.rpcUrl);
    ApiPromise.create({ provider, types })
      .then((api) => {
        types && registry.register(types);
        setApi(api);
      })
      .catch(console.error);
  }, [destinationChainConfig]);
  const [destinationBridge, setDestinationBridge] = useState<
    Bridge | undefined
  >(undefined);

  useEffect(() => {
    if (api) {
      // Wire up event listeners
      // Subscribe to system events via storage
      api.query.system.events((events) => {
        console.log("----- Received " + events.length + " event(s): -----");
        // loop through the Vec<EventRecord>
        events.forEach((record) => {
          // extract the phase, event and the event types
          const { event, phase } = record;
          const types = event.typeDef;
          // show what we are busy with
          console.log(
            event.section +
              ":" +
              event.method +
              "::" +
              "phase=" +
              phase.toString()
          );
          console.log(event.meta.documentation.toString());
          // loop through each of the parameters, displaying the type and data
          event.data.forEach((data, index) => {
            console.log(types[index].type + ";" + data.toString());
          });
        });
      });
    }
  }, [api]);

  return (
    <DestinationBridgeContext.Provider value={{}}>
      {children}
    </DestinationBridgeContext.Provider>
  );
};
