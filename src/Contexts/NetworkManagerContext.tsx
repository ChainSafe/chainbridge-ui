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
} from "../chainbridgeConfig";
import {
  EVMDestinationAdaptorProvider,
  EVMHomeAdaptorProvider,
} from "./Adaptors/EVMAdaptors";
import { IDestinationBridgeProviderProps } from "./Adaptors/interfaces";
import { DestinationBridgeContext } from "./DestinationBridgeContext";
import { HomeBridgeContext } from "./HomeBridgeContext";
import {
  AddMessageAction,
  ResetAction,
  transitMessageReducer,
} from "./Reducers/TransitMessageReducer";

interface INetworkManagerProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

export type WalletType = ChainType | "select" | "unset";

export type Vote = {
  address: string;
  signed: "Confirmed" | "Rejected";
};

export type TransactionStatus =
  | "Initializing Transfer"
  | "In Transit"
  | "Transfer Completed"
  | "Transfer Aborted";

interface NetworkManagerContext {
  walletType: WalletType;
  setWalletType: (walletType: WalletType) => void;

  chainId?: number;

  homeChainConfig: BridgeConfig | undefined;
  destinationChainConfig: BridgeConfig | undefined;

  destinationChains: Array<{ chainId: number; name: string }>;
  homeChains: BridgeConfig[];
  handleSetHomeChain: (chainId: number | undefined) => void;
  setDestinationChain: (chainId: number | undefined) => void;

  transactionStatus?: TransactionStatus;
  setTransactionStatus: (message: TransactionStatus | undefined) => void;
  inTransitMessages: Array<string | Vote>;

  setDepositVotes: (input: number) => void;
  depositVotes: number;

  setDepositNonce: (input: string | undefined) => void;
  depositNonce: string | undefined;

  tokensDispatch: Dispatch<AddMessageAction | ResetAction>;

  setTransferTxHash: (input: string) => void;
  transferTxHash: string;
}

const NetworkManagerContext = React.createContext<
  NetworkManagerContext | undefined
>(undefined);

const NetworkManagerProvider = ({ children }: INetworkManagerProviderProps) => {
  const [walletType, setWalletType] = useState<WalletType>("unset");

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
  const [transactionStatus, setTransactionStatus] = useState<
    TransactionStatus | undefined
  >(undefined);
  const [depositNonce, setDepositNonce] = useState<string | undefined>(
    undefined
  );
  const [depositVotes, setDepositVotes] = useState<number>(0);
  const [inTransitMessages, tokensDispatch] = useReducer(
    transitMessageReducer,
    []
  );

  const handleSetHomeChain = useCallback(
    (chainId: number | undefined) => {
      if (!chainId) {
        setHomeChainConfig(undefined);
        return;
      }
      const chain = homeChains.find((c) => c.chainId === chainId);

      if (chain) {
        setHomeChainConfig(chain);
        setDestinationChains(
          chainbridgeConfig.chains.filter(
            (bridgeConfig: BridgeConfig) =>
              bridgeConfig.chainId === chain.chainId
          )
        );
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
    (chainId: number | undefined) => {
      debugger;
      if (!chainId) {
        setDestinationChain(undefined);
      } else if (homeChainConfig && !depositNonce) {
        const chain = destinationChains.find((c) => c.chainId === chainId);
        if (!chain) {
          throw new Error("Invalid destination chain selected");
        }
        setDestinationChain(chain);
      } else {
        throw new Error("Home chain not selected");
      }
    },
    [depositNonce, depositVotes, destinationChains, homeChainConfig]
  );

  const DestinationProvider = ({
    children,
  }: IDestinationBridgeProviderProps) => {
    if (destinationChainConfig && destinationChainConfig.type === "Ethereum") {
      return (
        <EVMDestinationAdaptorProvider>
          {children}
        </EVMDestinationAdaptorProvider>
      );
    } else {
      return (
        <DestinationBridgeContext.Provider value={{}}>
          {children}
        </DestinationBridgeContext.Provider>
      );
    }
  };

  return (
    <NetworkManagerContext.Provider
      value={{
        chainId: homeChainConfig?.chainId,
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
      }}
    >
      {walletType === "Ethereum" ? (
        <EVMHomeAdaptorProvider>
          <DestinationProvider>{children}</DestinationProvider>
        </EVMHomeAdaptorProvider>
      ) : walletType === "Substrate" ? (
        <EVMHomeAdaptorProvider>
          <DestinationProvider>{children}</DestinationProvider>
        </EVMHomeAdaptorProvider>
      ) : (
        <HomeBridgeContext.Provider
          value={{
            connect: async () => undefined,
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
