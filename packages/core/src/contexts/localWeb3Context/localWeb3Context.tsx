import React, { useEffect, useReducer, useCallback } from "react";
import {
  BridgeConfig,
  chainbridgeConfig,
  ChainType,
} from "../../chainbridgeConfig";
import {
  EVMDestinationAdaptorProvider,
  EVMHomeAdaptorProvider,
} from "../Adaptors/EVMAdaptors";
import {
  SubstrateDestinationAdaptorProvider,
  SubstrateHomeAdaptorProvider,
} from "../Adaptors/SubstrateAdaptors";
import { HomeBridgeContext, DestinationBridgeContext } from "..";
import {
  getTokenData,
  getTokenDataDirect,
  resetOnboard,
  refreshGasPrice,
  signMessage,
  checkIsReady,
  getNetworkInfo
} from "../../utils/localNetworksHelpers";
import { Erc20Detailed } from "../../Contracts/Erc20Detailed";
import { localWeb3ContextReducer, networkManagerReducer } from "../../reducers/web3Reducers";
import {
  LocalWeb3Context,
  LocalWeb3ContextProps,
  LocalWeb3State,
} from "../../types";
import {NetworkManagerState, WalletType} from "../../types"
import combineReducers from 'react-combine-reducers';
import { useOnboard } from "./customHook";

const LocalProviderContext = React.createContext<LocalWeb3Context | undefined>(
  undefined
);

const initialNetworkManager: NetworkManagerState =  {
  walletType: "unset",
  homeChainConfig: undefined,
  homeChains: [],
  destinationChainConfig: undefined,
  destinationChains: [],
  transactionStatus: undefined,
  depositNonce: undefined,
  depositVotes: 0,
  txIsDone: false,
  transitMessage:[]
}

interface INetworkManagerProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

type CombinedState = {
  localWeb3: LocalWeb3State;
  networkManager: NetworkManagerState;
};

type Action = {
  type: string;
  payload?: any;
};

type CombinedReducer = (state: CombinedState, action: Action) => CombinedState;

const [comibenedReducer, initialCombinedReducers] = combineReducers<CombinedReducer>({
  localWeb3: [localWeb3ContextReducer, {
    savedWallet: "",
    isReady: false,
  }],
  networkManager: [networkManagerReducer, initialNetworkManager]
});

function selectProvider(
  type: string | undefined,
  direction: string,
  props: INetworkManagerProviderProps
) {
  const noWalletHasChosenStates = [undefined, "unset", "select"];
  const typeKey = noWalletHasChosenStates.includes(type)
    ? "unset"
    : String(type).toLocaleLowerCase();
  const providers: { [key: string]: any } = {
    ethereum: {
      home: <EVMHomeAdaptorProvider>{props.children}</EVMHomeAdaptorProvider>,
      destination: (
        <EVMDestinationAdaptorProvider>
          {props.children}
        </EVMDestinationAdaptorProvider>
      ),
    },
    substrate: {
      home: (
        <SubstrateHomeAdaptorProvider>
          {props.children}
        </SubstrateHomeAdaptorProvider>
      ),
      destination: (
        <SubstrateDestinationAdaptorProvider>
          {props.children}
        </SubstrateDestinationAdaptorProvider>
      ),
    },
    unset: {
      home: (
        <HomeBridgeContext.Provider
          value={{
            connect: async () => undefined,
            disconnect: async () => {},
            getNetworkName: (id: any) => "",
            isReady: false,
            selectedToken: "",
            deposit: async (
              amount: number,
              recipient: string,
              tokenAddress: string,
              destinationChainId: number
            ) => undefined,
            setDepositAmount: () => undefined,
            tokens: {},
            setSelectedToken: (input: string) => undefined,
            address: undefined,
            bridgeFee: undefined,
            chainConfig: undefined,
            depositAmount: undefined,
            nativeTokenBalance: undefined,
            relayerThreshold: undefined,
            wrapTokenConfig: undefined,
            wrapper: undefined,
            wrapToken: async (value: number) => "",
            unwrapToken: async (value: number) => "",
          }}
        >
          {props.children}
        </HomeBridgeContext.Provider>
      ),
      destination: (
        <DestinationBridgeContext.Provider
          value={{
            tokensDispatch: () => "",
            depositVotes: 0,
            setDepositVotes: (input: number) => "",
            disconnect: async () => {},
          }}
        >
          {props.children}
        </DestinationBridgeContext.Provider>
      ),
    },
  };

  return providers[typeKey][direction];
}


const LocalProvider = ({
  children,
  externalProvider,
  useExternalProvider,
  tokensToWatch,
  onboardConfig,
  cacheWalletSelection = true,
  networkIds,
  checkNetwork = (networkIds && networkIds.length > 0) || false,
  spenderAddress,
}: LocalWeb3ContextProps) => {
  const [state, dispatcher] = useReducer(comibenedReducer, initialCombinedReducers);
  const { localWeb3, networkManager } = state;

  const [balance, setBalance] = useState<number>()

    // get state from reducer
    const {
      address,
      provider,
      network,
      wallet,
      onboard,
      ethBalance,
      tokens,
      isReady,
      gasPrice,
      walletConnectReady,
      savedWallet
    }: LocalWeb3State = state;

  useEffect(() => {
    const networkTokens =
      (tokensToWatch && localWeb3.network && tokensToWatch[localWeb3.network]) || [];

    let tokenContracts: Array<Erc20Detailed> = [];
    if (localWeb3.provider && localWeb3.address && networkTokens.length > 0) {
      getTokenData(networkTokens, dispatcher, localWeb3, spenderAddress);
    }
    return () => {
      if (tokenContracts.length > 0) {
        tokenContracts.forEach((tc) => {
          tc.removeAllListeners();
        });
        tokenContracts = [];
        dispatcher({ type: "resetTokens" });
      }
    };
  }, [localWeb3.network, localWeb3.provider, localWeb3.address]);

  const {
    address,
    provider,
    network,
    wallet,
    onboard,
    ethBalance,
    tokens,
    isReady,
    gasPrice,
    walletConnectReady,
    savedWallet
  }: LocalWeb3State = localWeb3;

  // CUSTOM HOOK FOR INITIALIZING ONBOARD
  useOnboard(
    networkIds,
    checkNetwork,
    dispatcher,
    onboardConfig,
    cacheWalletSelection,
    checkIsReady,
  );

  let onboardState;
  if (onboard !== undefined && "getState" in onboard) {
    onboardState = onboard?.getState();
  }

  useEffect(() => {
    if (savedWallet === "" && onboard !== undefined && tokens === undefined) {
      onboard.walletSelect()
    }

  }, [localWeb3.onboard, localWeb3.savedWallet, networkManager.walletType]);

  const handleSetHomeChain = useCallback(
    (domainId: number | undefined) => {
      if (!domainId && domainId !== 0) {
        dispatcher({ type: "setHomeChainConfig", payload: undefined });
        return;
      }
      const chain = networkManager.homeChains.find(
        (c) => c.domainId === domainId
      );

      if (chain) {
        dispatcher({ type: "setHomeChainConfig", payload: chain });
        dispatcher({
          type: "setDestinationChains",
          payload: chainbridgeConfig().chains.filter(
            (bridgeConfig: BridgeConfig) =>
              bridgeConfig.domainId !== chain.domainId
          ),
        });

        if (chainbridgeConfig().chains.length === 2) {
          dispatcher({
            type: "setDestinationChains",
            payload: chainbridgeConfig().chains.find(
              (bridgeConfig: BridgeConfig) =>
                bridgeConfig.domainId !== chain.domainId
            ),
          });
        }
      }
    },
    [networkManager.homeChains]
  );

  useEffect(() => {
    if (networkManager.walletType !== "unset") {
      if (networkManager.walletType === "select") {
        dispatcher({ type: "setHomeChains", payload: chainbridgeConfig().chains });
      } else {
        dispatcher({
          type: "setHomeChains",
          payload: chainbridgeConfig().chains.filter(
            (bridgeConfig: BridgeConfig) =>
              bridgeConfig.type === networkManager.walletType
          ),
        });
      }
    } else {
      dispatcher({
        type: "setHomeChains",
        payload: []
      });
    }
  }, [networkManager.walletType]);

    const handleSetDestination = useCallback(
    (domainId: number | undefined) => {
      if (domainId === undefined) {
        dispatcher({
          type: "setDestinationChain",
          payload: undefined
        });
      } else if (networkManager.homeChainConfig && !networkManager.depositNonce) {
        const chain = networkManager.destinationChains.find((c) => c.domainId === domainId);
        if (!chain) {
          throw new Error("Invalid destination chain selected");
        }
        dispatcher({
          type: "setDestinationChain",
          payload: chain
        });
      } else {
        throw new Error("Home chain not selected");
      }
    },
    [networkManager.depositNonce, networkManager.destinationChains, networkManager.homeChainConfig]
  );

  const HomeProvider = useCallback(
    (props: INetworkManagerProviderProps) => {
      return selectProvider(networkManager.walletType, "home", props);
    },
    [networkManager.walletType]
  );

  const DestinationProvider = useCallback(
    (props: INetworkManagerProviderProps) => {
      return selectProvider(networkManager.destinationChainConfig?.type, "destination", props);
    },
    [networkManager.destinationChainConfig?.type]
  );

  return (
    <LocalProviderContext.Provider
      value={{
        address,
        provider,
        network,
        wallet,
        onboard,
        ethBalance,
        tokens: tokens ?? {},
        resetOnboard,
        isReady,
        checkIsReady,
        gasPrice: gasPrice ?? 0,
        isMobile: !!onboardState?.mobileDevice,
        signMessage,
        refreshGasPrice,
        signMessage,
        checkIsReady,
        dispatcher,
        walletConnectReady: walletConnectReady ?? false,
        savedWallet: savedWallet ?? ''
      }}
    >
      {children}
    </LocalProviderContext.Provider>
  );
}

const useWeb3 = () => {
  const context = React.useContext(LocalProviderContext);
  if (context === undefined) {
    throw new Error("useOnboard must be used within a OnboardProvider");
  }
  return context;
};

export { LocalProvider, useWeb3 };
