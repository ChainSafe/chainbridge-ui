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
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import keyring from "@polkadot/ui-keyring";
import types from "../../bridgeTypes.json";
import { TypeRegistry } from "@polkadot/types";

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

  // Need different logic
  const getNetworkName = (id: any) => {
    switch (Number(id)) {
      case 1:
        return "Mainnet";
      case 0:
        return "Localhost";
      default:
        return "Other";
    }
  };

  const {
    homeChainConfig,
    setTransactionStatus,
    setDepositNonce,
    handleSetHomeChain,
    homeChains,
    setNetworkId,
  } = useNetworkManager();

  const [homeBridge, setHomeBridge] = useState<Bridge | undefined>(undefined);
  const [relayerThreshold, setRelayerThreshold] = useState<number | undefined>(
    undefined
  );
  const [bridgeFee, setBridgeFee] = useState<number | undefined>();

  const [depositAmount, setDepositAmount] = useState<number | undefined>();
  const [selectedToken, setSelectedToken] = useState<string>("");

  useEffect(() => {
    // Set up provider & api
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
    // Get thresholds & bridge fee
    if (api) {
      const chainInfo = api.registry?.getChainProperties();
      console.log(chainInfo);
      debugger;
    }
  }, [api]);

  const handleConnect = useCallback(async () => {
    // Connect wallet
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
    api?.isReady.then(() => setIsReady(true));
  }, [api?.isReady, setIsReady]);

  const loadAccounts = (injectedAccounts: injectedAccountType[] = []) => {
    keyring.loadAll({ isDevelopment: true }, injectedAccounts);
    debugger;

    setAddress(injectedAccounts[0].address);
  };

  useEffect(() => {
    handleConnect();
  }, []);

  const deposit = useCallback(
    async (
      amount: number,
      recipient: string,
      tokenAddress: string,
      destinationChainId: number
    ) => {},
    [
      homeBridge,
      bridgeFee,
      homeChainConfig,
      setDepositNonce,
      setTransactionStatus,
    ]
  );

  const wrapToken = async (value: number): Promise<string> => {
    return "Not implemented";
  };

  const unwrapToken = async (value: number): Promise<string> => {
    return "Not implemented";
  };

  return (
    <HomeBridgeContext.Provider
      value={{
        connect: handleConnect,
        getNetworkName,
        bridgeFee,
        deposit,
        depositAmount,
        selectedToken,
        setDepositAmount,
        setSelectedToken,
        tokens: {},
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

  const [destinationBridge, setDestinationBridge] = useState<
    Bridge | undefined
  >(undefined);

  useEffect(() => {
    // Set up adaptor
  }, [destinationChainConfig]);

  useEffect(() => {
    // Wire up event listeners
  }, []);

  return (
    <DestinationBridgeContext.Provider value={{}}>
      {children}
    </DestinationBridgeContext.Provider>
  );
};
