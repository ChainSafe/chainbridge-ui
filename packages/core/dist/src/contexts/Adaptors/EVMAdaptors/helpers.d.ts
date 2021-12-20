import { ethers } from "ethers";
import { EvmBridgeConfig, TokenConfig } from "../../../chainbridgeConfig";
export declare const isCelo: (networkId?: number | undefined) => boolean;
export declare function getProvider(destinationChainConfig?: any): any;
export declare function hasTokenSupplies(destinationChain: EvmBridgeConfig, token: TokenConfig, amount: number): Promise<boolean | undefined>;
export declare function detectEIP1559MaxFeePerGas(provider: ethers.providers.Web3Provider): Promise<boolean>;
export declare function getPriceCompatibility(provider: ethers.providers.Web3Provider | undefined, homeChainConfig: any, gasPrice: number): Promise<string | undefined>;
//# sourceMappingURL=helpers.d.ts.map