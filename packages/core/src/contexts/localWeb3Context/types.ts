import {
  Wallet,
  API as OnboardAPI,
  Initialization,
} from "bnc-onboard/dist/src/interfaces";
import {
  providers,
  BigNumberish,
  BigNumber,
  CallOverrides,
  ContractTransaction,
  Overrides,
} from "ethers";
import { BigNumber as BN } from "bignumber.js";
import { TokenConfig } from "../../chainbridgeConfig";

export type TokenInfo = {
  name?: string;
  symbol?: string;
  decimals: number;
  balance: number;
  balanceBN: BN;
  imageUri?: string;
  spenderAllowance?: number;
  approve?: (
    spender: string,
    amount: BigNumberish,
    overrides?: Overrides
  ) => Promise<ContractTransaction>;

  transfer?: (
    recipient: string,
    amount: BigNumberish,
    overrides?: Overrides
  ) => Promise<ContractTransaction>;

  allowance?: (
    owner: string,
    spender: string,
    overrides?: CallOverrides
  ) => Promise<BigNumber>;
};

export type Tokens = {
  [address: string]: TokenInfo;
};

export type LocalWeb3Context = {
  externalProvider?: any;
  useExternalProvider?: any;
  address?: string;
  ethBalance?: number;
  gasPrice: number;
  isReady: boolean;
  isMobile: boolean;
  network?: number;
  onboard?: OnboardAPI;
  provider?: providers.Web3Provider;
  wallet?: Wallet;
  tokens: Tokens;
  resetOnboard(
    dispatcher: (action: Actions) => void,
    onboard: OnboardAPI,
  ): void;
  signMessage(
    message: string,
    provider: providers.Web3Provider
  ): Promise<string>;
  dispatcher: (action: Actions) => void;
  walletConnectReady: boolean;
  savedWallet: string;
};

type EthGasStationSettings = "fast" | "fastest" | "safeLow" | "average";
type EtherchainGasSettings = "safeLow" | "standard" | "fast" | "fastest";

type OnboardConfig = Partial<Omit<Initialization, "networkId">>;

export type TokensToWatch = {
  [networkId: number]: TokenConfig[];
};

export type LocalWeb3ContextProps = {
  useExternalProvider?: any;
  externalProvider?: any;
  cacheWalletSelection?: boolean;
  checkNetwork?: boolean;
  children: React.ReactNode;
  ethGasStationApiKey?: string;
  gasPricePollingInterval?: number; //Seconds between gas price polls. Defaults to 0 - Disabled
  gasPriceSetting?: EthGasStationSettings | EtherchainGasSettings;
  networkIds?: number[];
  onboardConfig?: OnboardConfig;
  spenderAddress?: string;
  tokensToWatch?: TokensToWatch; // Network-keyed collection of token addresses to watch
  config?: any;
};

export type LocalWeb3State = {
  tokens: Tokens;
  address: string;
  ethBalance: number;
  gasPrice: number;
  isReady: boolean;
  network: number;
  onboard: OnboardAPI;
  provider: providers.Web3Provider;
  wallet: Wallet;
  walletConnectReady: boolean;
  checkWallet: boolean;
  savedWallet: string;
}

export type Actions =
  | { type: "addToken"; payload: { id: string; token: TokenInfo } }
  | { type: "resetTokens" }
  | {
      type: "updateTokenBalanceAllowance";
      payload: {
        id: string;
        balance: number;
        balanceBN: BN;
        spenderAllowance: number;
      };
    }
  | { type: "setAddress"; payload: string }
  | { type: "setBalance"; payload: number }
  | { type: "setIsReady"; payload: boolean }
  | {
      type: "setWallet";
      payload: {
        wallet: Wallet | undefined;
        provider: providers.Web3Provider | undefined;
      };
    }
  | { type: "setProvider"; payload: providers.Web3Provider }
  | {
      type: "setNetworkAndProvider";
      payload: {
        network: number;
        provider: providers.Web3Provider | undefined;
      };
    }
  | { type: "setNetwork"; payload: number }
  | { type: "setOnBoard"; payload: OnboardAPI }
  | { type: "resetWalletConnect" }
  | {
      type: "setWalletConnect";
      payload: {
        wallet: Wallet | undefined;
        provider: providers.Web3Provider;
      };
    }
  | { type: "checkWallet"; payload: boolean }
  | { type: "setSavedWallet"; payload: string }
  | {
      type: "setAll";
      payload: {
        provider: providers.Web3Provider;
        isActive: boolean;
        chainId: number;
        accounts: any;
        address: string,
      };
    };
