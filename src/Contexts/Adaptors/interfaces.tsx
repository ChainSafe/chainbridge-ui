import { BridgeConfig } from "../../chainbridgeConfig";

export interface HomeChainAdaptor {
  chainConfig: BridgeConfig;
  deposit(
    amount: number,
    recipient: string,
    tokenAddress: string
  ): Promise<void>;
  connect: () => void;
  nonce: number;
  setNonce: (nextNonce: number) => void;
  getRelayerThreshold: () => Promise<number>;
  getFee: () => Promise<number>;
}

export interface DestinationChainAdaptor {
  chain: BridgeConfig;
  awaitDepositNonce: (nonce: string) => Promise<void>;
  depositNonce: string;
  setDepositNonce: (nonce: string) => void;
}
