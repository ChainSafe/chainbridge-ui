import { BigNumber } from "@ethersproject/bignumber";

export enum ProposalStatus {
  Inactive,
  Active,
  Passed,
  Executed,
  Cancelled,
}

export type DepositRecord = {
  fromAddress?: string;
  fromChainId?: number;
  fromNetworkName?: string;
  toAddress?: string;
  toChainId?: number;
  toNetworkName?: string;
  tokenAddress?: string;
  amount?: BigNumber;
  timestamp?: number;
  depositTransactionHash?: string;
  depositBlockNumber?: number;
  proposalEvents: Array<{
    proposalStatus: ProposalStatus;
    dataHash?: string;
    proposalEventTransactionHash?: string;
    proposalEventBlockNumber: number;
    timestamp: number;
  }>;
  votes: Array<{
    voteStatus: boolean;
    voteTransactionHash?: string;
    voteBlockNumber: number;
    timestamp: number;
    dataHash: string;
  }>;
};

export type AddTransferPayload = {
  depositNonce: number;
  transferDetails: {
    fromAddress: string;
    fromChainId: number;
    fromNetworkName: string;
    toAddress: string;
    toChainId: number;
    toNetworkName: string;
    tokenAddress?: string;
    amount?: BigNumber;
    resourceId: string;
    timestamp: number;
    depositTransactionHash: string;
    depositBlockNumber: number;
  };
};

export type AddProposalPayload = {
  depositNonce: number;
  transferDetails: {
    fromChainId: number;
    fromNetworkName: string;
    toChainId: number;
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

export type AddVotePayload = {
  depositNonce: number;
  transferDetails: {
    fromChainId: number;
    fromNetworkName: string;
    toChainId: number;
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

export type Transfers = {
  [depositNonce: number]: DepositRecord;
};

export function transfersReducer(
  transfers: Transfers,
  action:
    | {
        type: "addTransfer";
        payload: AddTransferPayload;
      }
    | {
        type: "addProposalEvent";
        payload: AddProposalPayload;
      }
    | {
        type: "addVote";
        payload: AddVotePayload;
      }
): Transfers {
  switch (action.type) {
    case "addTransfer": {
      const currentProposals =
        transfers[action.payload.depositNonce]?.proposalEvents || [];
      const currentVotes = transfers[action.payload.depositNonce]?.votes || [];

      return {
        ...transfers,
        [action.payload.depositNonce]: {
          ...transfers[action.payload.depositNonce],
          ...action.payload.transferDetails,
          proposalEvents: [
            {
              proposalStatus: ProposalStatus.Inactive,
              proposalEventBlockNumber:
                action.payload.transferDetails.depositBlockNumber,
              proposalEventTransactionHash:
                action.payload.transferDetails.depositTransactionHash,
              timestamp: action.payload.transferDetails.timestamp,
            },
            ...currentProposals,
          ],
          votes: [...currentVotes],
        },
      };
    }
    case "addProposalEvent": {
      const currentProposals =
        transfers[action.payload.depositNonce]?.proposalEvents || [];
      return {
        ...transfers,
        [action.payload.depositNonce]: {
          ...transfers[action.payload.depositNonce],
          ...action.payload.transferDetails,
          proposalEvents: [
            ...currentProposals,
            action.payload.proposalEventDetails,
          ],
        },
      };
    }
    case "addVote": {
      const currentVotes = transfers[action.payload.depositNonce]?.votes || [];
      return {
        ...transfers,
        [action.payload.depositNonce]: {
          ...transfers[action.payload.depositNonce],
          ...action.payload.transferDetails,
          votes: [...currentVotes, action.payload.voteDetails],
        },
      };
    }
    default:
      return transfers;
  }
}
