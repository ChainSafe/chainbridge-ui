import { BridgeConfig, TokenConfig } from "../../chainbridgeConfig";
import { Weth } from "../../Contracts/Weth";

export interface HomeChainAdaptor {
  chainConfig: BridgeConfig;
  deposit(
    amount: number,
    recipient: string,
    tokenAddress: string,
    destinationChainId: number
  ): Promise<void>;

  relayerThreshold: number | undefined;

  setDepositAmount: (input: number | undefined) => void;
  depositAmount: number | undefined;

  setTransferTxHash: (txHash: string) => void;

  setSelectedToken: (tokenAddress: string) => void;
  selectedToken: string;

  bridgeFee: number | undefined;

  wrapTokenConfig: TokenConfig | undefined;
  wrapper: Weth | undefined;
}

export interface DestinationChainAdaptor {
  chainConfig: BridgeConfig;
}
