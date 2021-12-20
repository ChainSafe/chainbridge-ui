/// <reference types="react" />
import { Wallet, API as OnboardAPI, Initialization } from "bnc-onboard/dist/src/interfaces";
import { providers, BigNumberish, BigNumber, CallOverrides, ContractTransaction, Overrides } from "ethers";
import { BigNumber as BN } from "bignumber.js";
import { TokenConfig } from "../../chainbridgeConfig";
export declare type TokenInfo = {
    name?: string;
    symbol?: string;
    decimals: number;
    balance: number;
    balanceBN: BN;
    imageUri?: string;
    spenderAllowance?: number;
    approve?: (spender: string, amount: BigNumberish, overrides?: Overrides) => Promise<ContractTransaction>;
    transfer?: (recipient: string, amount: BigNumberish, overrides?: Overrides) => Promise<ContractTransaction>;
    allowance?: (owner: string, spender: string, overrides?: CallOverrides) => Promise<BigNumber>;
};
export declare type Tokens = {
    [address: string]: TokenInfo;
};
export declare type LocalWeb3Context = {
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
    checkIsReady(onboard: OnboardAPI, dispatcher: (action: Actions) => void): Promise<boolean>;
    refreshGasPrice(dispatcher: (action: Actions) => void, ethGasStationApiKey: string, gasPriceSetting: any): Promise<void>;
    resetOnboard(dispatcher: (action: Actions) => void, onboard: OnboardAPI): void;
    signMessage(message: string, provider: providers.Web3Provider): Promise<string>;
    dispatcher: (action: Actions) => void;
};
declare type EthGasStationSettings = "fast" | "fastest" | "safeLow" | "average";
declare type EtherchainGasSettings = "safeLow" | "standard" | "fast" | "fastest";
declare type OnboardConfig = Partial<Omit<Initialization, "networkId">>;
export declare type TokensToWatch = {
    [networkId: number]: TokenConfig[];
};
export declare type LocalWeb3ContextProps = {
    cacheWalletSelection?: boolean;
    checkNetwork?: boolean;
    children: React.ReactNode;
    ethGasStationApiKey?: string;
    gasPricePollingInterval?: number;
    gasPriceSetting?: EthGasStationSettings | EtherchainGasSettings;
    networkIds?: number[];
    onboardConfig?: OnboardConfig;
    spenderAddress?: string;
    tokensToWatch?: TokensToWatch;
    config?: any;
};
export declare type LocalWeb3State = {
    tokens: Tokens;
    address: string;
    ethBalance: number;
    gasPrice: number;
    isReady: boolean;
    network: number;
    onboard: OnboardAPI;
    provider: providers.Web3Provider;
    wallet: Wallet;
};
export declare type Actions = {
    type: "addToken";
    payload: {
        id: string;
        token: TokenInfo;
    };
} | {
    type: "resetTokens";
} | {
    type: "updateTokenBalanceAllowance";
    payload: {
        id: string;
        balance: number;
        balanceBN: BN;
        spenderAllowance: number;
    };
} | {
    type: "setAddress";
    payload: string;
} | {
    type: "setBalance";
    payload: number;
} | {
    type: "setIsReady";
    payload: boolean;
} | {
    type: "setWallet";
    payload: Wallet | undefined;
} | {
    type: "setProvider";
    payload: providers.Web3Provider;
} | {
    type: "setNetwork";
    payload: number;
} | {
    type: "setOnBoard";
    payload: OnboardAPI;
};
export {};
//# sourceMappingURL=types.d.ts.map