import React from "react";
import { BridgeConfig, ChainType } from "../../chainbridgeConfig";
interface INetworkManagerProviderProps {
    children: React.ReactNode | React.ReactNode[];
}
export declare type WalletType = ChainType | "select" | "unset";
export declare type Vote = {
    address: string;
    signed?: "Confirmed" | "Rejected";
    order?: string;
    message?: string;
    eventType?: "Vote";
};
export declare type TransitMessage = {
    address: string;
    message?: string;
    proposalStatus?: number;
    order: number;
    signed?: "Confirmed" | "Rejected";
    eventType?: "Proposal" | "Vote";
};
export declare type TransactionStatus = "Initializing Transfer" | "In Transit" | "Transfer Completed" | "Transfer Aborted";
interface NetworkManagerContext {
    walletType: WalletType;
    setWalletType: (walletType: WalletType) => void;
    domainId?: number;
    homeChainConfig: BridgeConfig | undefined;
    destinationChainConfig: BridgeConfig | undefined;
    destinationChains: Array<{
        domainId: number;
        name: string;
    }>;
    homeChains: BridgeConfig[];
    handleSetHomeChain: (domainId: number | undefined) => void;
    setDestinationChain: (domainId: number | undefined) => void;
    transactionStatus?: TransactionStatus;
    setTransactionStatus: (message: TransactionStatus | undefined) => void;
    setDepositNonce: (input: string | undefined) => void;
    depositNonce: string | undefined;
}
declare const NetworkManagerContext: React.Context<NetworkManagerContext | undefined>;
export declare const NetworkManagerProvider: ({ children, }: INetworkManagerProviderProps) => JSX.Element;
export declare const useNetworkManager: () => NetworkManagerContext;
export {};
//# sourceMappingURL=NetworkManagerContext.d.ts.map