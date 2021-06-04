import { Tokens } from "@chainsafe/web3-context/dist/context/tokensReducer";
import { BridgeConfig, TokenConfig } from "../../chainbridgeConfig";
import { Weth } from "../../Contracts/Weth";

export interface IHomeBridgeProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

export interface IDestinationBridgeProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

export interface IWeb3ProviderWrapper {
  children: React.ReactNode | React.ReactNode[];
}

export interface HomeChainAdaptorContext {
  chainConfig: BridgeConfig | undefined;

  getNetworkName: (id: any) => string;

  connect: () => Promise<void>;
  disconnect: () => Promise<void>;

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

  wrapToken: (value: number) => Promise<string>;
  unwrapToken: (value: number) => Promise<string>;

  isReady: boolean;
  address: string | undefined;

  nativeTokenBalance: number | undefined;

  tokens: Tokens;
}

export interface DestinationChainContext {
  disconnect: () => Promise<void>;
}
