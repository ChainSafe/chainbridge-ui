import { providers } from "ethers";
import { BridgeConfig, TokenConfig } from "../../../chainbridgeConfig";
import { Weth } from "../../../Contracts/Weth";
declare const makeWrappedToken: (gasPrice: number, homeChainConfig?: BridgeConfig | undefined, wrapTokenConfig?: TokenConfig | undefined, wrapper?: Weth | undefined, provider?: providers.Web3Provider | undefined) => (value: number) => Promise<string>;
export default makeWrappedToken;
//# sourceMappingURL=makeWrappedToken.d.ts.map