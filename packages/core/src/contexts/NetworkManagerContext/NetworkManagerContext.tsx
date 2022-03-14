import React, {
  Dispatch,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  BridgeConfig,
  chainbridgeConfig,
  ChainType,
} from "../../chainbridgeConfig";
import {
  EVMDestinationAdaptorProvider,
  EVMHomeAdaptorProvider,
} from "../Adaptors/EVMAdaptors";
import { IDestinationBridgeProviderProps } from "../Adaptors/interfaces";
import {
  SubstrateDestinationAdaptorProvider,
  SubstrateHomeAdaptorProvider,
} from "../Adaptors/SubstrateAdaptors";
import { HomeBridgeContext, DestinationBridgeContext } from "..";
import {
  AddMessageAction,
  ResetAction,
  TxIsDone,
  transitMessageReducer,
  TransitState,
} from "../../reducers/TransitMessageReducer";
import { useWeb3 } from "../localWeb3Context";

interface INetworkManagerProviderProps {
  children: React.ReactNode | React.ReactNode[];
  predefinedWalletType?: WalletType;
}

export type WalletType = ChainType | "select" | "unset";

export type Vote = {
  address: string;
  signed?: "Confirmed" | "Rejected";
  order?: string;
  message?: string;
  eventType?: "Vote";
};

export type TransitMessage = {
  address: string;
  message?: string;
  proposalStatus?: number;
  order: number;
  signed?: "Confirmed" | "Rejected";
  eventType?: "Proposal" | "Vote";
};

export type TransactionStatus =
  | "Initializing Transfer"
  | "In Transit"
  | "Transfer Completed"
  | "Transfer Aborted";

interface NetworkManagerContext {
  walletType: WalletType;
  setWalletType: (walletType: WalletType) => void;

  domainId?: number;

  homeChainConfig: BridgeConfig | undefined;
  destinationChainConfig: BridgeConfig | undefined;

  destinationChains: Array<{ domainId: number; name: string }>;
  homeChains: BridgeConfig[];
  handleSetHomeChain: (domainId: number | undefined) => void;
  setDestinationChain: (domainId: number | undefined) => void;

  transactionStatus?: TransactionStatus;
  setTransactionStatus: (message: TransactionStatus | undefined) => void;

  setDepositNonce: (input: string | undefined) => void;
  depositNonce: string | undefined;
}

const NetworkManagerContext = React.createContext<
  NetworkManagerContext | undefined
>(undefined);

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

export const NetworkManagerProvider = ({
  children,
  predefinedWalletType
}: INetworkManagerProviderProps) => {
  const [walletType, setWalletType] = useState<WalletType>(predefinedWalletType ?? "Ethereum");

  const [homeChainConfig, setHomeChainConfig] = useState<
    BridgeConfig | undefined
  >();
  const [homeChains, setHomeChains] = useState<BridgeConfig[]>([]);
  const [destinationChainConfig, setDestinationChain] = useState<
    BridgeConfig | undefined
  >();
  const [destinationChains, setDestinationChains] = useState<BridgeConfig[]>(
    []
  );

  const [transactionStatus, setTransactionStatus] = useState<
    TransactionStatus | undefined
  >(undefined);
  const [depositNonce, setDepositNonce] = useState<string | undefined>(
    undefined
  );
  const [depositVotes, setDepositVotes] = useState<number>(0);
  const [inTransitMessages, tokensDispatch] = useReducer(
    transitMessageReducer,
    { txIsDone: false, transitMessage: [] }
  );

  const { onboard, savedWallet, tokens } = useWeb3();

  // IF THERE IS NO WALLET BUT ONBOARD IS INITIALIZED
  // TRIGGER THIS TO OPEN ONBOARD MODAL
  useEffect(() => {
    if (savedWallet === "" && onboard !== undefined && tokens === undefined) {
      onboard.walletSelect()
    }

  }, [onboard, savedWallet, walletType]);

  const handleSetHomeChain = useCallback(
    (domainId: number | undefined) => {
      if (!domainId && domainId !== 0) {
        setHomeChainConfig(undefined);
        return;
      }
      const chain = homeChains.find((c) => c.domainId === domainId);

      if (chain) {
        setHomeChainConfig(chain);
        setDestinationChains(
          chainbridgeConfig().chains.filter(
            (bridgeConfig: BridgeConfig) =>
              bridgeConfig.domainId !== chain.domainId
          )
        );
        if (chainbridgeConfig().chains.length === 2) {
          setDestinationChain(
            chainbridgeConfig().chains.find(
              (bridgeConfig: BridgeConfig) =>
                bridgeConfig.domainId !== chain.domainId
            )
          );
        }
      }
    },
    [homeChains, setHomeChainConfig]
  );

  useEffect(() => {
    if (walletType !== "unset") {
      if (walletType === "select") {
        setHomeChains(chainbridgeConfig().chains);
      } else {
        setHomeChains(
          chainbridgeConfig().chains.filter(
            (bridgeConfig: BridgeConfig) => bridgeConfig.type === walletType
          )
        );
      }
    } else {
      setHomeChains([]);
    }
  }, [walletType]);

  const handleSetDestination = useCallback(
    (domainId: number | undefined) => {
      if (domainId === undefined) {
        setDestinationChain(undefined);
      } else if (homeChainConfig && !depositNonce) {
        const chain = destinationChains.find((c) => c.domainId === domainId);
        if (!chain) {
          throw new Error("Invalid destination chain selected");
        }
        setDestinationChain(chain);
      } else {
        throw new Error("Home chain not selected");
      }
    },
    [depositNonce, destinationChains, homeChainConfig]
  );

  const HomeProvider = useCallback(
    (props: INetworkManagerProviderProps) => {
      return selectProvider(walletType, "home", props);
    },
    [walletType]
  );

  const DestinationProvider = useCallback(
    (props: INetworkManagerProviderProps) => {
      return selectProvider(destinationChainConfig?.type, "destination", props);
    },
    [destinationChainConfig?.type]
  );

  return (
    <NetworkManagerContext.Provider
      value={{
        domainId: homeChainConfig?.domainId,
        homeChainConfig,
        setWalletType,
        walletType,
        homeChains: homeChains,
        destinationChains,
        handleSetHomeChain,
        setDestinationChain: handleSetDestination,
        destinationChainConfig,
        transactionStatus,
        setTransactionStatus,
        depositNonce,
        setDepositNonce,
      }}
    >
      <HomeProvider>
        <DestinationProvider>{children}</DestinationProvider>
      </HomeProvider>
    </NetworkManagerContext.Provider>
  );
};

export const useNetworkManager = () => {
  const context = useContext(NetworkManagerContext);
  if (context === undefined) {
    throw new Error(
      "useNetworkManager must be called within a HomeNetworkProvider"
    );
  }
  return context;
};

// export { NetworkManagerProvider, useNetworkManager };
