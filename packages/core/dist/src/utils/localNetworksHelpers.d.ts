import { providers } from "ethers";
import { Actions, LocalWeb3State } from "../contexts/localWeb3Context/types";
import { API as OnboardAPI } from "bnc-onboard/dist/src/interfaces";
import { Erc20Detailed } from "../Contracts/Erc20Detailed";
export declare const refreshGasPrice: (dispatcher: (action: Actions) => void, ethGasStationApiKey: string, gasPriceSetting: any) => Promise<void>;
export declare const checkIsReady: (onboard: OnboardAPI, dispatcher: (action: Actions) => void) => Promise<boolean>;
export declare const resetOnboard: (dispatcher: (action: Actions) => void, onboard: OnboardAPI) => void;
export declare const checkBalanceAndAllowance: (token: Erc20Detailed, decimals: number, dispatcher: (action: Actions) => void, address: string, spenderAddress: string | undefined) => Promise<void>;
export declare const getTokenData: (networkTokens: any, dispatcher: (action: Actions) => void, state: LocalWeb3State, spenderAddress: string | undefined) => Promise<void>;
export declare const signMessage: (message: string, provider: providers.Web3Provider) => Promise<any>;
//# sourceMappingURL=localNetworksHelpers.d.ts.map