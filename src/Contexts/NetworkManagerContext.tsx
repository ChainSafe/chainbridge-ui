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
import NetworkSelectModal from "../Modules/NetworkSelectModal";
import {
  EVMDestinationAdaptorFactory,
  EVMHomeAdaptorProvider,
} from "./Adaptors/EVMAdaptors";
import { DestinationChainAdaptor } from "./Adaptors/interfaces";
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

  destinationChain?: DestinationChainAdaptor;
  destinationChains: Array<{ chainId: number; name: string }>;
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
  const [destinationChain, setDestinationChain] = useState<
    DestinationChainAdaptor | undefined
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
        if (chain.type === "Ethereum") {
          setDestinationChains(
            chainbridgeConfig.chains.filter(
              (bridgeConfig: BridgeConfig) =>
                bridgeConfig.chainId === chain.chainId
            )
          );
        }
      }
    },
    [homeChains]
  );

  useEffect(() => {
    if (walletType !== "unset") {
      setHomeChains(
        chainbridgeConfig.chains.filter(
          (bridgeConfig: BridgeConfig) => bridgeConfig.type === walletType
        )
      );
    } else {
      setHomeChains([]);
    }
  }, [walletType]);

  const handleSetDestination = useCallback(
    (chainId: number | undefined) => {
      if (!chainId) {
        setDestinationChain(undefined);
      } else if (homeChainConfig && depositNonce) {
        const chain = destinationChains.find((c) => c.chainId === chainId);
        if (!chain) {
          throw new Error("Invalid destination chain selected");
        }
        if (chain.type === "Ethereum") {
          const newDestinationChain = EVMDestinationAdaptorFactory(
            chain,
            homeChainConfig.chainId,
            depositNonce,
            depositVotes,
            setDepositVotes,
            tokensDispatch,
            setTransactionStatus,
            setTransferTxHash
          );
          setDestinationChain(newDestinationChain);
        }
      } else {
        throw new Error("Home chain not selected");
      }
    },
    [depositNonce, depositVotes, destinationChains, homeChainConfig]
  );

  return (
    <NetworkManagerContext.Provider
      value={{
        chainId: homeChainConfig?.chainId,
        homeChainConfig,
        setWalletType,
        walletType,
        destinationChains,
        inTransitMessages,
        handleSetHomeChain,
        setDestinationChain: handleSetDestination,
        destinationChain,
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
        <EVMHomeAdaptorProvider>{children}</EVMHomeAdaptorProvider>
      ) : walletType === "Substrate" ? (
        <EVMHomeAdaptorProvider>{children}</EVMHomeAdaptorProvider>
      ) : (
        <HomeBridgeContext.Provider value={undefined}>
          {children}
        </HomeBridgeContext.Provider>
      )}
      <NetworkSelectModal />
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
