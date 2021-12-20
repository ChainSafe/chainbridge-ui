import { providers } from "ethers";
import { BridgeConfig, TokenConfig } from "../../../chainbridgeConfig";
import { Weth } from "../../../Contracts/Weth";
declare const makeUnwrappedToken: (gasPrice: number, homeChainConfig?: BridgeConfig | undefined, wrapTokenConfig?: TokenConfig | undefined, wrapper?: Weth | undefined, provider?: providers.Web3Provider | undefined) => (value: number) => Promise<string>;
export default makeUnwrappedToken;
//# sourceMappingURL=makeUnwrappedToken.d.ts.map