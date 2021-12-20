import { providers } from "ethers";
import { BridgeConfig, TokenConfig } from "../../../chainbridgeConfig";
import { API as OnboardAPI } from "bnc-onboard/dist/src/interfaces";
import { Weth } from "../../../Contracts/Weth";
import { Actions } from "../../localWeb3Context/types";
export declare function useConnectWallet(isReady: boolean, checkIsReady: (onboard: OnboardAPI, dispatcher: (action: Actions) => void) => Promise<boolean>, dispatcher: (action: Actions) => void, onboard?: OnboardAPI, homeChainConfig?: BridgeConfig, provider?: providers.Web3Provider, network?: number): {
    homeBridge: any;
    wrapper: Weth | undefined;
    wrapTokenConfig: TokenConfig | undefined;
};
//# sourceMappingURL=useConnectWallet.d.ts.map