import { BridgeConfig, ChainType } from '../chainbridgeConfig'

export type WalletType = ChainType | "select" | "unset";

export type Vote = {
  address: string;
  signed?: "Confirmed" | "Rejected";
  order?: string;
  message?: string;
  eventType?: "Vote";
};

export type TransitMessage = {
  address: string;
  message?: string;
  proposalStatus?: number;
  order: number;
  signed?: "Confirmed" | "Rejected";
  eventType?: "Proposal" | "Vote";
};

export type TransactionStatus =
  | "Initializing Transfer"
  | "In Transit"
  | "Transfer Completed"
  | "Transfer Aborted";

export type NetworkManagerState = {
  walletType: WalletType
  homeChainConfig?: BridgeConfig
  homeChains: Array<BridgeConfig>
  destinationChainConfig?: BridgeConfig
  destinationChains: Array<BridgeConfig>
  transactionStatus?: TransactionStatus
  depositNonce?: string
  depositVotes: number // WE ARE NO REALLY USING THIS ON THE CONTEXT PROVIDER
  txIsDone: boolean
  transitMessage: Array<TransitMessage>
}

export type Actions =
  | { type: "setWalletType", payload: WalletType }
  | { type: "setHomeChainConfig", payload: BridgeConfig | undefined }
  | { type: "setHomeChains", payload: Array<BridgeConfig> | []}
  | { type: "setDestinationChain", payload: BridgeConfig | undefined } // TODO: CHANGE THIS FOR SETDESTINATIONCHAINCONFIG
  | { type: "setDestinationChains", payload: Array<BridgeConfig> | [] }
  | { type: "setTransactionStatus", payload: TransactionStatus | undefined }
  | { type: "addMessage", payload: TransitMessage }
  | { type: "resetMessages" }
  | { type: "setTransactionIsDone" }
  | { type: "setAll", payload: { walletType: WalletType} }
