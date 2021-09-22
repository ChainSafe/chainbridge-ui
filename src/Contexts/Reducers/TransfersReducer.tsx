import { BigNumber } from "@ethersproject/bignumber";
import {
  EvmBridgeConfig,
  SubstrateBridgeConfig,
} from "../../chainbridgeConfig";
import { computeTransferDetails } from "../../Utils/Helpers";

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
};

export type DepositRecord = {
  id: string;
  fromAddress?: string;
  fromChainId?: number;
  fromNetworkName?: string;
  toAddress?: string;
  toChainId?: number;
  toNetworkName?: string;
  tokenAddress?: string;
  amount?: string;
  timestamp?: number;
  depositTransactionHash?: string;
  depositBlockNumber?: number;
  proposals: Array<Proposal>;
  votes: Array<Vote>;
  status: number;
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

export type TransferResponse = {
  transfers: Array<DepositRecord>;
};

type TokenForDetailsView = {
  fromIcon: EvmBridgeConfig | SubstrateBridgeConfig;
  toIcon: EvmBridgeConfig | SubstrateBridgeConfig;
};

export type Action =
  | { type: "fetchTransfers"; payload: Array<DepositRecord> }
  | { type: "error" }
  | { type: "selectNetwork"; payload: number }
  | { type: "setTransferDetails"; payload: DepositRecord }
  | { type: "cleanTransferDetails" }
  | { type: "setTokenIconsForDetailView"; payload: TokenForDetailsView };

export type Transfers = {
  [depositNonce: number]: DepositRecord;
};

type NetworkSelection = {
  name: string;
  chainId: number;
};

export type TransferDetails = {
  id: string;
  formatedTransferDate: string;
  addressShortened: string;
  formatedAmount: string;
  fromNetworkName?: string;
  toNetworkName?: string;
  depositTxHashShortened: string;
  fromChainId?: number;
  toChainId?: number;
  proposalStatus: number;
  votes: Array<Vote>;
  proposals: Array<Proposal>;
  timelineMessages: Array<any>;
  fromIcon: EvmBridgeConfig | SubstrateBridgeConfig | undefined;
  toIcon: EvmBridgeConfig | SubstrateBridgeConfig | undefined;
};

export type ExplorerState = {
  transfers: Array<DepositRecord>;
  error: boolean;
  network: NetworkSelection;
  chains: Array<EvmBridgeConfig | SubstrateBridgeConfig>;
  transferDetails: TransferDetails;
};

export function transfersReducer(
  explorerState: ExplorerState,
  action: Action
): ExplorerState {
  switch (action.type) {
    case "fetchTransfers":
      return { ...explorerState, transfers: action.payload };
    case "error":
      return { ...explorerState, error: true };
    case "selectNetwork":
      const { chains } = explorerState;
      const networkSelected = chains.find(
        ({ chainId }) => chainId === action.payload
      );
      const { name, chainId } = networkSelected!;
      return { ...explorerState, network: { name, chainId } };
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
        addressShortened: "",
        proposalStatus: 0,
        formatedAmount: "",
        fromNetworkName: "",
        toNetworkName: "",
        depositTxHashShortened: "",
        fromChainId: 0,
        toChainId: 0,
        votes: [],
        proposals: [],
        timelineMessages: [],
        fromIcon: undefined,
        toIcon: undefined,
      };
      return { ...explorerState, transferDetails: cleanedTransferDetails };
    case "setTokenIconsForDetailView":
      const {
        payload: { fromIcon, toIcon },
      } = action;
      return {
        ...explorerState,
        transferDetails: {
          ...explorerState.transferDetails,
          fromIcon,
          toIcon,
        },
      };
    default:
      return explorerState;
  }
}
