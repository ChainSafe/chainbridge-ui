import React, { useCallback, useEffect, useState } from "react";
import { HomeBridgeContext } from "../../HomeBridgeContext";
import { useWeb3 } from "../../index";
import { createApi } from "../SubstrateApis/ChainBridgeAPI";
import { IHomeBridgeProviderProps, InjectedAccountType } from "../interfaces";

import { ApiPromise } from "@polkadot/api";
import { VoidFn } from "@polkadot/api/types";
import { TypeRegistry } from "@polkadot/types";
import { Tokens } from "@chainsafe/web3-context/dist/context/tokensReducer";
import {
  getRelayerThresholdFunc,
  confirmChainIdFunc,
  queryData,
  handleConnectFunc,
  makeDeposit,
} from "./";

export const SubstrateHomeAdaptorProvider = ({
  children,
}: IHomeBridgeProviderProps) => {
  const registry = new TypeRegistry();
  const [api, setApi] = useState<ApiPromise | undefined>();
  const [isReady, setIsReady] = useState(false);
  const [accounts, setAccounts] = useState<InjectedAccountType[]>([]);
  const [address, setAddress] = useState<string | undefined>(undefined);

  const {
    homeChainConfig,
    setTransactionStatus,
    setDepositNonce,
    handleSetHomeChain,
    homeChains,
  } = useWeb3();

  const [relayerThreshold, setRelayerThreshold] = useState<number | undefined>(
    undefined
  );
  const [bridgeFee] = useState<number>(0);

  const [depositAmount, setDepositAmount] = useState<number | undefined>();
  const [selectedToken, setSelectedToken] = useState<string>("CSS");

  const [tokens, setTokens] = useState<Tokens>({});

  useEffect(() => {
    // Attempt connect on load
    handleConnect();
  });

  const [initiaising, setInitialising] = useState(false);
  useEffect(() => {
    // Once the chain ID has been set in the network context, the homechain configuration will be automatically set thus triggering this
    if (!homeChainConfig || initiaising || api) return;
    setInitialising(true);
    createApi(homeChainConfig.rpcUrl)
      .then((api) => {
        setApi(api);
        setInitialising(false);
      })
      .catch(console.error);
  }, [homeChainConfig, registry, api, initiaising]);

  const getRelayerThreshold = useCallback(
    getRelayerThresholdFunc(api, homeChainConfig, setRelayerThreshold),
    [api, homeChainConfig]
  );

  const confirmChainID = useCallback(
    confirmChainIdFunc(api, homeChainConfig, homeChains, handleSetHomeChain),
    [api, handleSetHomeChain, homeChainConfig, homeChains]
  );

  useEffect(() => {
    // For all constants & essential values like:
    // Relayer Threshold, resources IDs & Bridge Fees
    // It is recommended to collect state at this point
    if (api) {
      if (api.isConnected && homeChainConfig) {
        getRelayerThreshold();
        confirmChainID();
      }
    }
  }, [api, getRelayerThreshold, confirmChainID, homeChainConfig]);

  useEffect(() => {
    // Comment for the moment
    // if (!homeChainConfig || !address) return;
    let unsubscribe: VoidFn | undefined;
    if (api) {
      unsubscribe = queryData(
        api,
        homeChainConfig!,
        unsubscribe,
        setTokens,
        address!
      );
    }
    return () => {
      unsubscribe && unsubscribe();
    };
  }, [api, address, homeChainConfig]);

  const selectAccount = useCallback(
    (index: number) => {
      setAddress(accounts[index].address);
    },
    [accounts]
  );

  const handleConnect = useCallback(
    handleConnectFunc(
      isReady,
      setAccounts,
      selectAccount,
      handleSetHomeChain,
      homeChains
    ),
    [isReady, handleSetHomeChain, homeChains]
  );

  useEffect(() => {
    // This is a simple check
    // The reason for having a isReady is that the UI can lazy load data from this point
    api?.isReady.then(() => setIsReady(true));
  }, [api, setIsReady]);

  const deposit = useCallback(
    makeDeposit(
      address,
      api,
      setTransactionStatus,
      setDepositAmount,
      homeChainConfig,
      setDepositNonce
    ),
    [api, setDepositNonce, setTransactionStatus, address, homeChainConfig]
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
          await api?.disconnect();
        },
        getNetworkName: () => homeChainConfig?.name || "undefined",
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
      }}
    >
      {children}
    </HomeBridgeContext.Provider>
  );
};

export default SubstrateHomeAdaptorProvider;
