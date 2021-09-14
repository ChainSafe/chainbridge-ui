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

export type DepositRecord = {
  id?: string;
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
  proposals: Array<{
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

export type TransferResponse = {
  transfers: Array<DepositRecord>;
};

export type Action =
  | { type: "fetchTransfers"; payload: Array<DepositRecord> }
  | { type: "error" }
  | { type: "selectNetwork"; payload: number }
  | { type: "setTransferDetails"; payload: DepositRecord }
  | { type: "cleanTransferDetails" };

export type Transfers = {
  [depositNonce: number]: DepositRecord;
};

type NetworkSelection = {
  name: string;
  chainId: number;
};

export type TransferDetails = {
  formatedTransferDate: string;
  addressShortened: string;
  proposalStatus: string;
  formatedAmount: string;
  fromNetworkName?: string;
  toNetworkName?: string;
  depositTxHashShortened: string;
  fromChainId?: number;
  toChainId?: number;
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
      const transferDetails = computeTransferDetails(action.payload);
      return { ...explorerState, transferDetails };
    case "cleanTransferDetails":
      const cleanedTransferDetails = {
        formatedTransferDate: "",
        addressShortened: "",
        proposalStatus: "",
        formatedAmount: "",
        fromNetworkName: "",
        toNetworkName: "",
        depositTxHashShortened: "",
        fromChainId: 0,
        toChainId: 0,
      };
      return { ...explorerState, transferDetails: cleanedTransferDetails };
    default:
      return explorerState;
  }
}
