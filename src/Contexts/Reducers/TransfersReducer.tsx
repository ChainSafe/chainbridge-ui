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
  by: string;
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
  fromChain: EvmBridgeConfig | SubstrateBridgeConfig;
  toChain: EvmBridgeConfig | SubstrateBridgeConfig;
};

export type Action =
  | { type: "selectNetwork"; payload: number }
  | { type: "setTransferDetails"; payload: DepositRecord }
  | { type: "cleanTransferDetails" }
  | { type: "setTokenIconsForDetailView"; payload: TokenForDetailsView }
  | { type: "timelineButtonClick" };

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
  voteEvents: Array<Vote>;
  proposalEvents: Array<Proposal>;
  timelineMessages: Array<any>;
  fromChain: EvmBridgeConfig | SubstrateBridgeConfig | undefined;
  toChain: EvmBridgeConfig | SubstrateBridgeConfig | undefined;
};

export type ExplorerState = {
  transfers: Array<DepositRecord>;
  error: boolean;
  chains: Array<EvmBridgeConfig | SubstrateBridgeConfig>;
};

export type ExplorerPageState = {
  network: NetworkSelection;
  transferDetails: TransferDetails;
  timelineButtonClicked: boolean;
  chains: Array<EvmBridgeConfig | SubstrateBridgeConfig>;
};

export function transfersReducer(
  explorerState: ExplorerPageState,
  action: Action
): ExplorerPageState {
  switch (action.type) {
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
        voteEvents: [],
        proposalEvents: [],
        timelineMessages: [],
        fromChain: undefined,
        toChain: undefined,
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
