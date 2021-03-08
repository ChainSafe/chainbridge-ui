export enum ProposalStatus {
  Inactive,
  Active,
  Passed,
  Executed,
  Cancelled,
}

export enum VoteStatus {}

export function transferReducer(
  transfers: {
    [depositNonce: number]: {
      fromChainId?: number;
      fromNetworkName?: string;
      toChainId?: number;
      toNetworkName?: string;
      timestamp?: number;
      depositTransactionHash?: string;
      depositBlockNumber?: number;
      proposalEvents?: Array<{
        proposalStatus: ProposalStatus;
        dataHash?: string;
        proposalEventTransactionHash?: string;
        proposalEventBlockNumber: number;
        timestamp: number;
      }>;
      votes?: Array<{
        voteStatus: boolean;
        voteTransactionHash?: string;
        voteBlockNumber: number;
        timestamp: number;
        dataHash: string;
      }>;
    };
  },
  action:
    | {
        type: "addTransfer";
        payload: {
          depositNonce: number;
          transferDetails: {
            fromChainId: number;
            fromNetworkName: string;
            toChainId: number;
            toNetworkName: string;
            resourceId: string;
            timestamp: number;
            depositTransactionHash: string;
            depositBlockNumber: number;
          };
        };
      }
    | {
        type: "addProposalEvent";
        payload: {
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
      }
    | {
        type: "addVote";
        payload: {
          depositNonce: number;
          transferDetails: {
            fromChainId: number;
            fromNetworkName: string;
            toChainId: number;
            toNetworkName: string;
            resourceId: string;
          };
          voteDetails: {
            voteStatus: VoteStatus;
            voteTransactionHash: string;
            voteBlockNumber: number;
            timestamp: number;
            dataHash: string;
          };
        };
      }
) {
  console.log(action);
  switch (action.type) {
    case "addTransfer":
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
          ],
          proposalVotes: [],
        },
      };
    case "addProposalEvent": {
      const currentProposalEvents =
        transfers[action.payload.depositNonce]?.proposalEvents || [];
      return {
        ...transfers,
        [action.payload.depositNonce]: {
          ...transfers[action.payload.depositNonce],
          ...action.payload.transferDetails,
          proposalEvents: [
            ...currentProposalEvents,
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
