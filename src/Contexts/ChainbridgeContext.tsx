import React, { useCallback, useContext } from "react";
import {
  BridgeConfig,
  chainbridgeConfig,
  EvmBridgeConfig,
  SubstrateBridgeConfig,
  TokenConfig,
} from "../chainbridgeConfig";
import { Tokens } from "@chainsafe/web3-context/dist/context/tokensReducer";
import { TransactionStatus, useNetworkManager } from "./NetworkManagerContext";
import { useHomeBridge } from "./HomeBridgeContext";
import NetworkSelectModal from "../Modules/NetworkSelectModal";
import { TransitState } from "./Reducers/TransitMessageReducer";

interface IChainbridgeContextProps {
  children: React.ReactNode | React.ReactNode[];
  chains?: Array<EvmBridgeConfig | SubstrateBridgeConfig>;
}

type ChainbridgeContext = {
  homeConfig: BridgeConfig | undefined;
  connect: () => Promise<void>;
  handleSetHomeChain: (domainId: number) => void;
  setDestinationChain: (domainId: number | undefined) => void;
  destinationChains: Array<{ domainId: number; name: string }>;
  destinationChainConfig?: BridgeConfig;
  deposit(
    amount: number,
    recipient: string,
    tokenAddress: string
  ): Promise<void>;
  resetDeposit(): void;
  depositVotes: number;
  relayerThreshold?: number;
  depositNonce?: string;
  depositAmount?: number;
  bridgeFee?: number;
  inTransitMessages: TransitState;
  transferTxHash?: string;
  setHomeTransferTxHash: (input: string) => void;
  homeTransferTxHash?: string;
  selectedToken?: string;
  transactionStatus?: TransactionStatus;
  wrapToken: (value: number) => Promise<string>;
  unwrapToken: (value: number) => Promise<string>;
  wrapTokenConfig: TokenConfig | undefined;
  tokens: Tokens;
  nativeTokenBalance: number | undefined;
  isReady: boolean | undefined;
  address: string | undefined;
  domainId?: number;
  checkSupplies?: (
    amount: number,
    tokenAddress: string,
    destinationChainId: number
  ) => Promise<boolean | undefined>;
  chains?: Array<EvmBridgeConfig | SubstrateBridgeConfig>;
};

const ChainbridgeContext = React.createContext<ChainbridgeContext | undefined>(
  undefined
);

const ChainbridgeProvider = ({
  children,
  chains,
}: IChainbridgeContextProps) => {
  const {
    handleSetHomeChain,
    destinationChainConfig,
    setTransactionStatus,
    setDestinationChain,
    setDepositNonce,
    setDepositVotes,
    transferTxHash,
    setHomeTransferTxHash,
    homeTransferTxHash,
    inTransitMessages,
    tokensDispatch,
    transactionStatus,
    depositNonce,
    depositVotes,
    homeChainConfig,
    destinationChains,
    domainId,
  } = useNetworkManager();

  const {
    connect,
    setDepositAmount,
    setSelectedToken,
    chainConfig,
    deposit,
    relayerThreshold,
    nativeTokenBalance,
    address,
    selectedToken,
    bridgeFee,
    depositAmount,
    isReady,
    wrapTokenConfig,
    tokens,
    wrapToken,
    unwrapToken,
    handleCheckSupplies,
  } = useHomeBridge();

  const resetDeposit = () => {
    chainbridgeConfig.chains.length > 2 && setDestinationChain(undefined);
    setTransactionStatus(undefined);
    setDepositNonce(undefined);
    setDepositVotes(0);
    setDepositAmount(undefined);
    tokensDispatch({
      type: "resetMessages",
    });
    setSelectedToken("");
  };

  const handleDeposit = useCallback(
    async (amount: number, recipient: string, tokenAddress: string) => {
      if (chainConfig && destinationChainConfig) {
        return await deposit(
          amount,
          recipient,
          tokenAddress,
          destinationChainConfig.domainId
        );
      }
    },
    [deposit, destinationChainConfig, chainConfig]
  );

  const checkSupplies = async (
    amount: number,
    tokenAddress: string,
    destinationChainId: number
  ) => {
    if (handleCheckSupplies && chainConfig && destinationChainConfig) {
      return await handleCheckSupplies(
        amount,
        tokenAddress,
        destinationChainId
      );
    }
  };

  return (
    <ChainbridgeContext.Provider
      value={{
        homeConfig: homeChainConfig,
        connect,
        destinationChains,
        handleSetHomeChain,
        setDestinationChain,
        resetDeposit,
        deposit: handleDeposit,
        destinationChainConfig,
        depositVotes,
        relayerThreshold,
        depositNonce,
        bridgeFee,
        transactionStatus,
        inTransitMessages,
        depositAmount: depositAmount,
        transferTxHash: transferTxHash,
        homeTransferTxHash: homeTransferTxHash,
        setHomeTransferTxHash,
        selectedToken: selectedToken,
        // TODO: Confirm if EVM specific
        wrapToken,
        wrapTokenConfig: wrapTokenConfig,
        unwrapToken,
        isReady: isReady,
        nativeTokenBalance: nativeTokenBalance,
        tokens,
        address,
        domainId,
        checkSupplies,
        chains,
      }}
    >
      {/*TODO: we should remove this on refactor task. Context provider single responsibility is to provide share state */}
      <NetworkSelectModal />
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
