import { Tokens } from "@chainsafe/web3-context/dist/context/tokensReducer";
import { BridgeConfig, TokenConfig } from "../../chainbridgeConfig";
import { Weth } from "../../Contracts/Weth";

export interface IHomeBridgeProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

export interface HomeChainAdaptorContext {
  chainConfig: BridgeConfig | undefined;
  deposit(
    amount: number,
    recipient: string,
    tokenAddress: string,
    destinationChainId: number
  ): Promise<void>;

  relayerThreshold: number | undefined;

  setDepositAmount: (input: number | undefined) => void;
  depositAmount: number | undefined;

  setSelectedToken: (tokenAddress: string) => void;
  selectedToken: string;

  bridgeFee: number | undefined;

  wrapTokenConfig: TokenConfig | undefined;
  wrapper: Weth | undefined;

  isReady: boolean;
  address: string | undefined;

  nativeTokenBalance: number | undefined;

  tokens: Tokens;
}

export interface DestinationChainAdaptor {
  chainConfig: BridgeConfig;
}
