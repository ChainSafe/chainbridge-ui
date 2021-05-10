import React, {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  BigNumberish,
  ContractTransaction,
  Overrides,
  PayableOverrides,
} from "ethers";
import {
  BridgeConfig,
  chainbridgeConfig,
  ChainType,
  TokenConfig,
} from "../chainbridgeConfig";
import { transitMessageReducer } from "./Reducers/TransitMessageReducer";
import {
  DestinationChainAdaptor,
  HomeChainAdaptor,
} from "./Adaptors/interfaces";
import {
  EVMDestinationAdaptorFactory,
  EVMHomeAdaptorFactory,
} from "./Adaptors/EVMAdaptors";

interface IChainbridgeContextProps {
  children: React.ReactNode | React.ReactNode[];
}

export type Vote = {
  address: string;
  signed: "Confirmed" | "Rejected";
};

type ChainbridgeContext = {
  homeChain?: HomeChainAdaptor;
  handleSetHomeChain: (chainId: number) => void;
  destinationChain?: DestinationChainAdaptor;
  destinationChains: Array<{ chainId: number; name: string }>;
  setDestinationChain: (chainId: number) => void;
  deposit(
    amount: number,
    recipient: string,
    tokenAddress: string
  ): Promise<void>;
  resetDeposit(): void;
  transactionStatus?: TransactionStatus;
  depositVotes: number;
  relayerThreshold?: number;
  depositNonce?: string;
  inTransitMessages: Array<string | Vote>;
  depositAmount?: number;
  bridgeFee?: number;
  transferTxHash?: string;
  selectedToken?: string;
  setWalletType: (walletType: WalletType) => void;
  wrapToken:
    | ((
        overrides?: PayableOverrides | undefined
      ) => Promise<ContractTransaction>)
    | undefined;
  unwrapToken:
    | ((
        wad: BigNumberish,
        overrides?: Overrides | undefined
      ) => Promise<ContractTransaction>)
    | undefined;
  wrapTokenConfig: TokenConfig | undefined;
};

export type WalletType = ChainType | "unset";

export type TransactionStatus =
  | "Initializing Transfer"
  | "In Transit"
  | "Transfer Completed"
  | "Transfer Aborted";

const ChainbridgeContext = React.createContext<ChainbridgeContext | undefined>(
  undefined
);

const ChainbridgeProvider = ({ children }: IChainbridgeContextProps) => {
  const [walletType, setWalletType] = useState<WalletType>("unset");
  const [homeChain, setHomeChain] = useState<HomeChainAdaptor | undefined>();
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

  const resetDeposit = () => {
    chainbridgeConfig.chains.length > 2 && setDestinationChain(undefined);
    setTransactionStatus(undefined);
    setDepositNonce(undefined);
    setDepositVotes(0);
    homeChain?.setDepositAmount(undefined);
    tokensDispatch({
      type: "resetMessages",
    });
    homeChain?.setSelectedToken("");
  };

  const handleSetHomeChain = useCallback(
    (chainId: number) => {
      const chain = homeChains.find((c) => c.chainId === chainId);

      if (chain) {
        if (chain.type === "Ethereum") {
          setHomeChain(
            EVMHomeAdaptorFactory(
              chain,
              setTransactionStatus,
              setDepositNonce,
              setTransferTxHash
            )
          );
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
    (chainId: number) => {
      if (homeChain && depositNonce) {
        const chain = destinationChains.find((c) => c.chainId === chainId);
        if (!chain) {
          throw new Error("Invalid destination chain selected");
        }
        if (chain.type === "Ethereum") {
          const newDestinationChain = EVMDestinationAdaptorFactory(
            chain,
            homeChain.chainConfig.chainId,
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
    [depositNonce, depositVotes, destinationChains, homeChain]
  );

  const deposit = useCallback(
    async (amount: number, recipient: string, tokenAddress: string) => {
      if (homeChain && destinationChain) {
        return await homeChain?.deposit(
          amount,
          recipient,
          tokenAddress,
          destinationChain.chainConfig.chainId
        );
      }
    },
    [homeChain, destinationChain]
  );

  return (
    <ChainbridgeContext.Provider
      value={{
        setWalletType,
        handleSetHomeChain,
        homeChain: homeChain,
        destinationChain: destinationChain,
        destinationChains: destinationChains.map((c) => ({
          chainId: c.chainId,
          name: c.name,
        })),
        setDestinationChain: handleSetDestination,
        resetDeposit,
        deposit,
        depositVotes,
        relayerThreshold: homeChain?.relayerThreshold,
        depositNonce,
        bridgeFee: homeChain?.bridgeFee,
        transactionStatus,
        inTransitMessages,
        depositAmount: homeChain?.depositAmount,
        transferTxHash: transferTxHash,
        selectedToken: homeChain?.selectedToken,
        // TODO: Confirm if EVM specific
        wrapToken: homeChain?.wrapper?.deposit,
        wrapTokenConfig: homeChain?.wrapTokenConfig,
        unwrapToken: homeChain?.wrapper?.withdraw,
      }}
    >
      {children}
    </ChainbridgeContext.Provider>
  );
};

const useChainbridge = () => {
  const context = useContext(ChainbridgeContext);
  if (context === undefined) {
    throw new Error(
      "useChainbridge must be called within a ChainbridgeProvider"
    );
  }
  return context;
};

export { ChainbridgeProvider, useChainbridge };
