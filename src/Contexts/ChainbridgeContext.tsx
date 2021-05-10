import React, { useCallback, useContext } from "react";
import {
  BigNumberish,
  ContractTransaction,
  Overrides,
  PayableOverrides,
} from "ethers";
import { chainbridgeConfig, TokenConfig } from "../chainbridgeConfig";
import { Tokens } from "@chainsafe/web3-context/dist/context/tokensReducer";
import {
  TransactionStatus,
  useNetworkManager,
  Vote,
} from "./NetworkManagerContext";
import { useHomeBridge } from "./HomeBridgeContext";

interface IChainbridgeContextProps {
  children: React.ReactNode | React.ReactNode[];
}

type ChainbridgeContext = {
  handleSetHomeChain: (chainId: number) => void;
  setDestinationChain: (chainId: number | undefined) => void;
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
  inTransitMessages: Array<string | Vote>;
  transferTxHash?: string;
  selectedToken?: string;
  transactionStatus?: TransactionStatus;
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
  tokens: Tokens;
  nativeTokenBalance: number | undefined;
  isReady: boolean | undefined;
  address: string | undefined;
};

const ChainbridgeContext = React.createContext<ChainbridgeContext | undefined>(
  undefined
);

const ChainbridgeProvider = ({ children }: IChainbridgeContextProps) => {
  const {
    handleSetHomeChain,
    destinationChain,
    setTransactionStatus,
    setDestinationChain,
    setDepositNonce,
    setDepositVotes,
    transferTxHash,
    inTransitMessages,
    tokensDispatch,
    transactionStatus,
    depositNonce,
    depositVotes,
  } = useNetworkManager();

  const {
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
    wrapper,
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
      if (chainConfig && destinationChain) {
        return await deposit(
          amount,
          recipient,
          tokenAddress,
          destinationChain.chainConfig.chainId
        );
      }
    },
    [deposit, destinationChain]
  );

  return (
    <ChainbridgeContext.Provider
      value={{
        handleSetHomeChain,
        setDestinationChain,
        resetDeposit,
        deposit: handleDeposit,
        depositVotes,
        relayerThreshold,
        depositNonce,
        bridgeFee,
        transactionStatus,
        inTransitMessages,
        depositAmount: depositAmount,
        transferTxHash: transferTxHash,
        selectedToken: selectedToken,
        // TODO: Confirm if EVM specific
        wrapToken: wrapper?.deposit,
        wrapTokenConfig: wrapTokenConfig,
        unwrapToken: wrapper?.withdraw,
        isReady: isReady,
        nativeTokenBalance: nativeTokenBalance,
        tokens,
        address,
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
