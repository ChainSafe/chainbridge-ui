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

interface INetworkManagerProviderProps {
  children: React.ReactNode | React.ReactNode[];
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
  order?: number;
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

  networkId: number;
  setNetworkId: (id: number) => void;

  domainId?: number;

  homeChainConfig: BridgeConfig | undefined;
  destinationChainConfig: BridgeConfig | undefined;

  destinationChains: Array<{ domainId: number; name: string }>;
  homeChains: BridgeConfig[];
  handleSetHomeChain: (domainId: number | undefined) => void;
  setDestinationChain: (domainId: number | undefined) => void;

  transactionStatus?: TransactionStatus;
  setTransactionStatus: (message: TransactionStatus | undefined) => void;
  inTransitMessages: TransitState;

  setDepositVotes: (input: number) => void;
  depositVotes: number;

  setDepositNonce: (input: string | undefined) => void;
  depositNonce: string | undefined;

  tokensDispatch: Dispatch<AddMessageAction | ResetAction | TxIsDone>;

  setTransferTxHash: (input: string) => void;
  transferTxHash: string;

  setHomeTransferTxHash: (input: string) => void;
  homeTransferTxHash: string;
}

const NetworkManagerContext = React.createContext<
  NetworkManagerContext | undefined
>(undefined);

const NetworkManagerProvider = ({ children }: INetworkManagerProviderProps) => {
  const [walletType, setWalletType] = useState<WalletType>("unset");

  const [networkId, setNetworkId] = useState(0);

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

  const [transferTxHash, setTransferTxHash] = useState<string>("");
  const [homeTransferTxHash, setHomeTransferTxHash] = useState<string>("");
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
          chainbridgeConfig.chains.filter(
            (bridgeConfig: BridgeConfig) =>
              bridgeConfig.domainId !== chain.domainId
          )
        );
        if (chainbridgeConfig.chains.length === 2) {
          setDestinationChain(
            chainbridgeConfig.chains.find(
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
        setHomeChains(chainbridgeConfig.chains);
      } else {
        setHomeChains(
          chainbridgeConfig.chains.filter(
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

  const DestinationProvider = ({
    children,
  }: IDestinationBridgeProviderProps) => {
    if (destinationChainConfig?.type === "Ethereum") {
      return (
        <EVMDestinationAdaptorProvider>
          {children}
        </EVMDestinationAdaptorProvider>
      );
    } else if (destinationChainConfig?.type === "Substrate") {
      return (
        <SubstrateDestinationAdaptorProvider>
          {children}
        </SubstrateDestinationAdaptorProvider>
      );
    } else {
      return (
        <DestinationBridgeContext.Provider
          value={{
            disconnect: async () => {},
          }}
        >
          {children}
        </DestinationBridgeContext.Provider>
      );
    }
  };

  return (
    <NetworkManagerContext.Provider
      value={{
        domainId: homeChainConfig?.domainId,
        networkId,
        setNetworkId,
        homeChainConfig,
        setWalletType,
        walletType,
        homeChains: homeChains,
        destinationChains,
        inTransitMessages,
        handleSetHomeChain,
        setDestinationChain: handleSetDestination,
        destinationChainConfig,
        transactionStatus,
        setTransactionStatus,
        depositNonce,
        depositVotes,
        setDepositNonce,
        setDepositVotes,
        tokensDispatch,
        setTransferTxHash,
        transferTxHash,
        setHomeTransferTxHash,
        homeTransferTxHash,
      }}
    >
      {walletType === "Ethereum" ? (
        <EVMHomeAdaptorProvider>
          <DestinationProvider>{children}</DestinationProvider>
        </EVMHomeAdaptorProvider>
      ) : walletType === "Substrate" ? (
        <SubstrateHomeAdaptorProvider>
          <DestinationProvider>{children}</DestinationProvider>
        </SubstrateHomeAdaptorProvider>
      ) : (
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
          <DestinationProvider>{children}</DestinationProvider>
        </HomeBridgeContext.Provider>
      )}
    </NetworkManagerContext.Provider>
  );
};

const useNetworkManager = () => {
  const context = useContext(NetworkManagerContext);
  if (context === undefined) {
    throw new Error(
      "useNetworkManager must be called within a HomeNetworkProvider"
    );
  }
  return context;
};

export { NetworkManagerProvider, useNetworkManager };
