export declare const runtimeTestingConfig: {
    CHAINBRIDGE: {
        INDEXER_URL: string;
        chains: {
            domainId: number;
            name: string;
            tokens: {
                name: string;
                symbol: string;
                imageUri: string;
            }[];
        }[];
    };
};
export declare const testResponse: {
    pageInfo: {
        endCursor: string;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor: string;
    };
    transfers: {
        id: string;
        depositNonce: number;
        resourceId: string;
        fromDomainId: number;
        fromNetworkName: string;
        toDomainId: number;
        toNetworkName: string;
        fromAddress: string;
        toAddress: string;
        tokenAddress: string;
        amount: string;
        timestamp: number;
        depositTransactionHash: string;
        depositBlockNumber: number;
        status: number;
        sourceTokenAddress: string;
        destinationTokenAddress: string;
        proposalEvents: {
            id: string;
            proposalStatus: number;
            dataHash: string;
            proposalEventTransactionHash: string;
            proposalEventBlockNumber: number;
            timestamp: number;
            transferId: string;
            by: string;
        }[];
        voteEvents: {
            id: string;
            voteBlockNumber: number;
            voteTransactionHash: string;
            dataHash: null;
            timestamp: number;
            voteStatus: boolean;
            transferId: string;
            by: string;
        }[];
    }[];
};
export declare const canceledTransfer: {
    id: string;
    depositNonce: number;
    resourceId: string;
    fromDomainId: number;
    fromNetworkName: string;
    toDomainId: number;
    toNetworkName: string;
    fromAddress: string;
    toAddress: string;
    tokenAddress: string;
    amount: string;
    timestamp: number;
    depositTransactionHash: string;
    depositBlockNumber: number;
    status: number;
    sourceTokenAddress: string;
    destinationTokenAddress: string;
    proposalEvents: {
        id: string;
        proposalStatus: number;
        dataHash: string;
        proposalEventTransactionHash: string;
        proposalEventBlockNumber: number;
        timestamp: number;
        transferId: string;
        by: string;
    }[];
    voteEvents: never[];
};
//# sourceMappingURL=TestUtils.d.ts.map