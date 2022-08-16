import React, { useCallback, useContext } from "react";
import {
  BridgeConfig,
  chainbridgeConfig,
  EvmBridgeConfig,
  TokenConfig,
} from "../../chainbridgeConfig";
import { Tokens } from "@chainsafe/web3-context/dist/context/tokensReducer";
import { TransitState } from "../../reducers/TransitMessageReducer";
import { TransactionStatus, useWeb3 } from "../../index";
import { useHomeBridge } from "../HomeBridgeContext";
import { useDestinationBridge } from "../DestinationBridgeContext";
import { Directions, FeeDataResult } from "@chainsafe/sygma-sdk-core";
import { useBridge } from "../Bridge";
import { computeDirections } from "../../utils/Helpers";

interface IChainbridgeContextProps {
  children: React.ReactNode | React.ReactNode[];
  chains?: Array<EvmBridgeConfig>;
}

type ChainbridgeContext = {
  homeConfig: BridgeConfig | undefined;
  connect: () => Promise<void>;
  handleSetHomeChain: (domainId: number) => void;
  setDestinationChain: (domainId: number | undefined) => void;
  destinationChains: Array<{ domainId: number; name: string }>;
  destinationChainConfig?: BridgeConfig;
  deposit(params: {
    amount: string;
    recipient: string;
    from: Directions;
    to: Directions;
    feeData: FeeDataResult;
  }): Promise<void>;
  resetDeposit(): void;
  // depositVotes: number;
  relayerThreshold?: number;
  depositNonce?: string;
  depositAmount?: number;
  bridgeFee?: number;
  // inTransitMessages: TransitState;
  // transferTxHash?: string;
  // setHomeTransferTxHash: (input: string) => void;
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
  chains?: Array<EvmBridgeConfig>;
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
    transactionStatus,
    depositNonce,
    homeChainConfig,
    destinationChains,
    domainId,
  } = useWeb3();

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

  const { chainbridgeInstance, bridgeSetup } = useBridge();

  const { setDepositVotes, tokensDispatch } = useDestinationBridge();

  const resetDeposit = () => {
    chainbridgeConfig().chains.length > 2 && setDestinationChain(undefined);
    setDepositNonce(undefined);
    setDepositVotes(0);
    setDepositAmount(undefined);
    tokensDispatch({
      type: "resetMessages",
    });
    tokensDispatch({
      type: "setTransactionIsDone",
    });
    setSelectedToken("");
    setTransactionStatus(undefined);
  };

  const handleDeposit = useCallback(
    async (paramsForDeposit: {
      amount: string;
      recipient: string;
      from: Directions;
      to: Directions;
      feeData: FeeDataResult;
    }) => {
      if (chainConfig && destinationChainConfig) {
        return await deposit(paramsForDeposit);
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
        relayerThreshold,
        depositNonce,
        bridgeFee,
        transactionStatus,
        depositAmount: depositAmount,
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
