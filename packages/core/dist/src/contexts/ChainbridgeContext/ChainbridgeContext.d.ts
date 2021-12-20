import React from "react";
import { BridgeConfig, EvmBridgeConfig, SubstrateBridgeConfig, TokenConfig } from "../../chainbridgeConfig";
import { Tokens } from "@chainsafe/web3-context/dist/context/tokensReducer";
import { TransactionStatus } from "../NetworkManagerContext/NetworkManagerContext";
interface IChainbridgeContextProps {
    children: React.ReactNode | React.ReactNode[];
    chains?: Array<EvmBridgeConfig | SubstrateBridgeConfig>;
}
declare type ChainbridgeContext = {
    homeConfig: BridgeConfig | undefined;
    connect: () => Promise<void>;
    handleSetHomeChain: (domainId: number) => void;
    setDestinationChain: (domainId: number | undefined) => void;
    destinationChains: Array<{
        domainId: number;
        name: string;
    }>;
    destinationChainConfig?: BridgeConfig;
    deposit(amount: number, recipient: string, tokenAddress: string): Promise<void>;
    resetDeposit(): void;
    relayerThreshold?: number;
    depositNonce?: string;
    depositAmount?: number;
    bridgeFee?: number;
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
    checkSupplies?: (amount: number, tokenAddress: string, destinationChainId: number) => Promise<boolean | undefined>;
    chains?: Array<EvmBridgeConfig | SubstrateBridgeConfig>;
};
declare const ChainbridgeContext: React.Context<ChainbridgeContext | undefined>;
declare const ChainbridgeProvider: ({ children, chains, }: IChainbridgeContextProps) => JSX.Element;
declare const useChainbridge: () => ChainbridgeContext;
export { ChainbridgeProvider, useChainbridge };
//# sourceMappingURL=ChainbridgeContext.d.ts.map