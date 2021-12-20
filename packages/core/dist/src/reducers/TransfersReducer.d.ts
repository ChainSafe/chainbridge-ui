import { BigNumber } from "@ethersproject/bignumber";
import { EvmBridgeConfig, SubstrateBridgeConfig } from "../chainbridgeConfig";
export declare enum ProposalStatus {
    Inactive = 0,
    Active = 1,
    Passed = 2,
    Executed = 3,
    Cancelled = 4
}
declare type Vote = {
    voteStatus: boolean;
    voteTransactionHash?: string;
    voteBlockNumber: number;
    timestamp: number;
    dataHash: string;
    by: string;
};
declare type Proposal = {
    proposalStatus: ProposalStatus;
    dataHash?: string;
    proposalEventTransactionHash?: string;
    proposalEventBlockNumber: number;
    timestamp: number;
    by: string;
};
export declare type DepositRecord = {
    id: string;
    fromAddress?: string;
    fromDomainId?: number;
    fromNetworkName?: string;
    toAddress?: string;
    toDomainId?: number;
    toNetworkName?: string;
    tokenAddress?: string;
    amount?: string;
    timestamp?: number;
    depositTransactionHash?: string;
    depositBlockNumber?: number;
    proposalEvents: Array<Proposal>;
    voteEvents: Array<Vote>;
    status: number;
    sourceTokenAddress: string;
    destinationTokenAddress: string;
};
export declare type AddTransferPayload = {
    depositNonce: number;
    transferDetails: {
        fromAddress: string;
        fromDomainId: number;
        fromNetworkName: string;
        toAddress: string;
        toDomainId: number;
        toNetworkName: string;
        tokenAddress?: string;
        amount?: BigNumber;
        resourceId: string;
        timestamp: number;
        depositTransactionHash: string;
        depositBlockNumber: number;
    };
};
export declare type AddProposalPayload = {
    depositNonce: number;
    transferDetails: {
        fromDomainId: number;
        fromNetworkName: string;
        toDomainId: number;
        toNetworkName: string;
        resourceId: string;
    };
    proposalEventDetails: {
        proposalStatus: ProposalStatus;
        dataHash: string;
        proposalEventTransactionHash: string;
        proposalEventBlockNumber: number;
        timestamp: number;
    };
};
export declare type AddVotePayload = {
    depositNonce: number;
    transferDetails: {
        fromDomainId: number;
        fromNetworkName: string;
        toDomainId: number;
        toNetworkName: string;
        resourceId: string;
    };
    voteDetails: {
        voteStatus: boolean;
        voteTransactionHash: string;
        voteBlockNumber: number;
        timestamp: number;
        dataHash: string;
    };
};
export declare type TransferResponse = {
    transfers: Array<DepositRecord>;
};
declare type TokenForDetailsView = {
    fromChain: EvmBridgeConfig | SubstrateBridgeConfig;
    toChain: EvmBridgeConfig | SubstrateBridgeConfig;
};
export declare type Action = {
    type: "selectNetwork";
    payload: number;
} | {
    type: "setTransferDetails";
    payload: DepositRecord;
} | {
    type: "cleanTransferDetails";
} | {
    type: "setTokenIconsForDetailView";
    payload: TokenForDetailsView;
} | {
    type: "timelineButtonClick";
};
export declare type Transfers = {
    [depositNonce: number]: DepositRecord;
};
declare type NetworkSelection = {
    name: string;
    domainId: number;
};
export declare type TransferDetails = {
    id: string;
    formatedTransferDate: string;
    fromAddress?: string;
    formatedAmount: string;
    fromNetworkName?: string;
    toNetworkName?: string;
    depositTransactionHash?: string;
    fromDomainId?: number;
    toDomainId?: number;
    proposalStatus: number;
    voteEvents: Array<Vote>;
    proposalEvents: Array<Proposal>;
    timelineMessages: Array<any>;
    fromChain: EvmBridgeConfig | SubstrateBridgeConfig | undefined;
    toChain: EvmBridgeConfig | SubstrateBridgeConfig | undefined;
    pillColorStatus: {
        borderColor: string;
        background: string;
    };
};
export declare type ExplorerState = {
    isLoading: boolean;
    transfers: Array<DepositRecord>;
    pageInfo?: PageInfo;
    error: boolean;
    chains: Array<EvmBridgeConfig | SubstrateBridgeConfig>;
    transferDetails?: TransferDetails;
    pillColorStatus?: {
        borderColor: string;
        background: string;
    };
};
export declare type PageInfo = {
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    startCursor: string;
    endCursor: string;
};
export declare type PaginationParams = {
    first?: string;
    last?: string;
    before?: string;
    after?: string;
};
export declare type ExplorerPageState = {
    network: NetworkSelection;
    transferDetails: TransferDetails;
    timelineButtonClicked: boolean;
    chains: Array<EvmBridgeConfig | SubstrateBridgeConfig>;
};
export declare function transfersReducer(explorerState: ExplorerPageState, action: Action): ExplorerPageState;
export {};
//# sourceMappingURL=TransfersReducer.d.ts.map