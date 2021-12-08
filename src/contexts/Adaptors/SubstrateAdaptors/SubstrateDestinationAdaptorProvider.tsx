import React, { useEffect, useState } from "react";
import { DestinationBridgeContext } from "../../DestinationBridgeContext";
import { useNetworkManager } from "../../NetworkManagerContext";
import { createApi } from "../SubstrateApis/ChainBridgeAPI";
import { IDestinationBridgeProviderProps } from "../interfaces";
import { ApiPromise } from "@polkadot/api";
import { UnsubscribePromise } from "@polkadot/api/types";
import { unsubscribeFunc } from "./";

const SubstrateDestinationAdaptorProvider = ({
  children,
}: IDestinationBridgeProviderProps) => {
  const {
    depositNonce,
    destinationChainConfig,
    setDepositVotes,
    depositVotes,
    tokensDispatch,
    setTransactionStatus,
  } = useNetworkManager();

  const [api, setApi] = useState<ApiPromise | undefined>();

  const [initiaising, setInitialising] = useState(false);
  useEffect(() => {
    // Once the chain ID has been set in the network context, the destination configuration will be automatically
    // set thus triggering this
    if (!destinationChainConfig || initiaising || api) return;
    setInitialising(true);
    createApi(destinationChainConfig.rpcUrl)
      .then((api) => {
        setApi(api);
        setInitialising(false);
      })
      .catch(console.error);
  }, [destinationChainConfig, api, initiaising]);

  const [listenerActive, setListenerActive] = useState<
    UnsubscribePromise | undefined
  >(undefined);

  useEffect(() => {
    if (api && !listenerActive && depositNonce) {
      // Wire up event listeners
      // Subscribe to system events via storage
      const unsubscribe = unsubscribeFunc(
        api,
        tokensDispatch,
        setDepositVotes,
        setTransactionStatus,
        destinationChainConfig,
        depositVotes
      );
      setListenerActive(unsubscribe);
    } else if (listenerActive && !depositNonce) {
      const unsubscribeCall = async () => {
        setListenerActive(undefined);
      };
      unsubscribeCall();
    }
  }, [
    api,
    depositNonce,
    depositVotes,
    destinationChainConfig,
    listenerActive,
    setDepositVotes,
    setTransactionStatus,
    tokensDispatch,
  ]);

  return (
    <DestinationBridgeContext.Provider
      value={{
        disconnect: async () => {
          await api?.disconnect();
        },
      }}
    >
      {children}
    </DestinationBridgeContext.Provider>
  );
};

export default SubstrateDestinationAdaptorProvider;
