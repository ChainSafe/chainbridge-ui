import { BigNumber } from "@ethersproject/bignumber";
import { EvmBridgeConfig, SubstrateBridgeConfig } from "../chainbridgeConfig";
import { computeTransferDetails } from "../utils/Helpers";

export enum ProposalStatus {
  Inactive,
  Active,
  Passed,
  Executed,
  Cancelled,
}

type Vote = {
  voteStatus: boolean;
  voteTransactionHash?: string;
  voteBlockNumber: number;
  timestamp: number;
  dataHash: string;
  by: string;
};

type Proposal = {
  proposalStatus: ProposalStatus;
  dataHash?: string;
  proposalEventTransactionHash?: string;
  proposalEventBlockNumber: number;
  timestamp: number;
  by: string;
};

export type DepositRecord = {
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

export type AddTransferPayload = {
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

export type AddProposalPayload = {
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

export type AddVotePayload = {
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

export type TransferResponse = {
  transfers: Array<DepositRecord>;
};

type TokenForDetailsView = {
  fromChain: EvmBridgeConfig | SubstrateBridgeConfig;
  toChain: EvmBridgeConfig | SubstrateBridgeConfig;
};

type MyAddressPayload = {
  address?: string;
  switchValue: string;
};

export type Action =
  | { type: "setMyAddress"; payload: string }
  | { type: "setDepositTransactionHash"; payload: string }
  | { type: "selectFromDomainId"; payload: number }
  | { type: "selectToDomainId"; payload: number }
  | { type: "setTransferDetails"; payload: DepositRecord }
  | { type: "cleanTransferDetails" }
  | { type: "setTokenIconsForDetailView"; payload: TokenForDetailsView }
  | { type: "timelineButtonClick" };

export type Transfers = {
  [depositNonce: number]: DepositRecord;
};

export type TransferDetails = {
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
  pillColorStatus: { borderColor: string; background: string };
};

export type ExplorerState = {
  isLoading: boolean;
  transfers: Array<DepositRecord>;
  pageInfo?: PageInfo;
  error: boolean;
  chains: Array<EvmBridgeConfig | SubstrateBridgeConfig>;
  transferDetails?: TransferDetails;
  pillColorStatus?: { borderColor: string; background: string };
};

export type PageInfo = {
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  startCursor: string;
  endCursor: string;
};

export type PaginationParams = {
  first?: string;
  last?: string;
  before?: string;
  after?: string;
};

export type ExplorerPageState = {
  fromDomainId?: number;
  toDomainId?: number;
  depositTransactionHash?: string;
  fromAddress?: string;
  toAddress?: string;

  transferDetails: TransferDetails;
  timelineButtonClicked: boolean;
  chains: Array<EvmBridgeConfig | SubstrateBridgeConfig>;
};

export function transfersReducer(
  explorerState: ExplorerPageState,
  action: Action
): ExplorerPageState {
  switch (action.type) {
    case "setMyAddress":
      return {
        ...explorerState,
        fromAddress: action.payload,
        toAddress: action.payload,
      };
    case "setDepositTransactionHash":
      return { ...explorerState, depositTransactionHash: action.payload };
    case "selectFromDomainId":
      const { domainId: fromDomainId } = explorerState.chains.find(
        ({ domainId }) => domainId === action.payload
      )!;
      return { ...explorerState, fromDomainId };
    case "selectToDomainId":
      const { domainId: toDomainId } = explorerState.chains.find(
        ({ domainId }) => domainId === action.payload
      )!;
      return { ...explorerState, toDomainId };
    case "setTransferDetails":
      const transferDetails = computeTransferDetails(
        action.payload,
        explorerState.chains
      );
      return { ...explorerState, transferDetails };
    case "cleanTransferDetails":
      const cleanedTransferDetails = {
        id: "",
        formatedTransferDate: "",
        fromAddress: "",
        proposalStatus: 0,
        formatedAmount: "",
        fromNetworkName: "",
        toNetworkName: "",
        depositTransactionHash: "",
        fromDomainId: 0,
        toDomainId: 0,
        voteEvents: [],
        proposalEvents: [],
        timelineMessages: [],
        fromChain: undefined,
        toChain: undefined,
        pillColorStatus: { borderColor: "", background: "" },
      };
      return {
        ...explorerState,
        transferDetails: cleanedTransferDetails,
        timelineButtonClicked: false,
      };
    case "setTokenIconsForDetailView":
      const {
        payload: { fromChain, toChain },
      } = action;
      return {
        ...explorerState,
        transferDetails: {
          ...explorerState.transferDetails,
          fromChain: fromChain,
          toChain,
        },
      };
    case "timelineButtonClick":
      return {
        ...explorerState,
        timelineButtonClicked: !explorerState.timelineButtonClicked,
      };
    default:
      return explorerState;
  }
}
